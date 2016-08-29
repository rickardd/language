class ScoresController < ApplicationController

  # before_filter :authorize

  # before_action :set_header

  def show
    @score = Translation.find( params[:id] ).score
  end

  def update
    # @translation = Translation.find( params[:id] )

    # sets the request body as a json which can be accesible with [:symbols]
    params_body = JSON.parse(request.raw_post).with_indifferent_access
    # attempt = params_body["attempt"]

    # if attempt == @translation.spanish
    #   @score = @translation.score.move_up
    #   render json: @score.to_json
    # else
    #   @score = @translation.score.move_down
    #   render json: @score.to_json
    #   # @translation.score.move_down
    #   # render json: { message: "Attemtp invalid", attempt: params[:attempt]}.to_json
    # end


    # 1. Update score and saves to database
    if params_body["id"] != "-1"
      puts '--1'
      translation = Translation.find(params_body["id"])
      puts '--2'

      score = Score.find_or_create_by(user: current_user, translation: translation)
      puts '--3'

      # removes special characters before validation.
      trimmed_attempt = params_body["attempt"].downcase.strip.tr('?!:;.,', '')
      puts '--4'
      trimmed_db_word = translation.spanish.downcase.strip.tr('?!:;.,', '')
      puts '--5'

      if trimmed_attempt == trimmed_db_word
        score.move_up
      else
        score.move_down
      end
      # update xp
      # Xp.create_new_xp_for_user( current_user ).update
    end

    # Temporary lines
    temporary_next_id = params_body["id"] == 1 ? 2 : 1
    # render json: Translation.find( temporary_next_id ).to_json
    render json: translation.to_json
    return

    # 2. Return new translation.

    # All words in private list with positive priority in prioritized order.
    pscores_tids = prioritized_scores.map(&:translation_id)
    # puts 'session ids'
    # puts session[:scored_translation_ids]
    # puts 'all positive ids'
    # puts pscores_tids
    # puts 'locked session ids'
    locked_session_tids = session[:scored_translation_ids] - pscores_tids
    # puts 'unlocked sessoin ids'
    unlocked_session_tids = session[:scored_translation_ids] - locked_session_tids
    # puts 'new ids'
    new_tids_for_session = (pscores_tids - unlocked_session_tids)[0...locked_session_tids.count]



    # puts 'new session'
    # puts session[:scored_translation_ids]
    # puts 'score to return'
    # puts the_score = session[:scored_translation_ids].fetch( params["wordCount"].to_i, nil)
    # puts new_tids_for_session


    # unless the_score
    # If no new translation id's added return last translation in session array
    if score.bucket === 0
      # retrives the values from first array that includes in the second array.
      # the past in id is not included.
      priority_sorted_sesson_ids = pscores_tids & session[:scored_translation_ids]
      # to_do_1: return id with lowest priority from a sorted sesson variabel. So find a way to sort session[:scored_translation_ids]
      @translations = Translation.where(id: priority_sorted_sesson_ids.first )
      render 'lists/global'
    elsif new_tids_for_session.count <= 0
      @translations = Translation.where(id: session[:scored_translation_ids].last )
      render 'lists/global'
    else # else return the new translations for the new id's
      # to_do_2 This line should not add up if word is in bucket 0
      session[:scored_translation_ids] += new_tids_for_session
      @translations = Translation.where(id: new_tids_for_session )
      render 'lists/global'
    end


  end

  def create
    @score = Translation.find( params[:id] ).score

    render json: @score.to_json
    # respond_to do |format|
    #   if @score.update(score_params)
    #     format.html { redirect_to @score, notice: 'score was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @score }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @score.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def total
    array = []
    Bucket.config.each_index do |i|
      scores = current_user.scores
      score = scores.where(bucket: i)
      array.push({
        translations: score.count,
        percentage: ( (score.count.to_f / scores.count.to_f) * 1000 ).round / 1000.0 * 100
      })
    end
    render json: array.to_json
  end


  private
    def score_params
      # params.require(:score).permit(:english, :attempt)
    end

    def prioritized_scores
      current_user.prioritized_scores
    end

    def scores_hash_as_translation_ids
      current_user.scores_hash.map{|h| {translation_id: h[:score].translation_id, priority: h[:priority] } }
    end

end


  def prioritized_scores
    current_user.prioritized_scores
  end

  def scores_hash_as_translation_ids
    current_user.scores_hash.map{|h| {translation_id: h[:score].translation_id, priority: h[:priority] } }
  end



