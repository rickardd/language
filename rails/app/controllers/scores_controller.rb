class ScoresController < ApplicationController

  # before_action :set_header

  def show
    @score = Translation.find( params[:id] ).score
  end

  def update
      @translation = Translation.find( params[:id] )

    # sets the request body as a json which can be accesible with [:symbols]
    params_body = JSON.parse(request.raw_post).with_indifferent_access
    attempt = params_body["attempt"]

    if attempt == @translation.spanish
      @score = @translation.score.move_up
      render json: @score.to_json
    else
      @score = @translation.score.move_down
      render json: @score.to_json
      # @translation.score.move_down
      # render json: { message: "Attemtp invalid", attempt: params[:attempt]}.to_json
    end



    # 2. Return new translation.
    #

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
    # Todo: bind to user and not to translation
    render json: Translation.first.score.total.to_json
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



