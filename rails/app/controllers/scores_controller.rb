class ScoresController < ApplicationController

  # before_filter :authorize

  # before_action :set_header

  def show
    @score = Translation.find( params[:id] ).score
  end

  def update
    params_body = JSON.parse(request.raw_post).with_indifferent_access

    # Exit if invalid id
    return unless params_body["id"].to_i > -1

    case params_body["type"].downcase
    when "verb"
      translation = Verb.find(params_body["id"])
      score = Score.find_or_create_by(user: current_user, verb: translation)
      trimmed_db_word = translation.infinitve_spanish.downcase.strip.tr('?!:;.,', '')
    when "conjugation"
      translation = Conjugation.find(params_body["id"])
      score = Score.find_or_create_by(user: current_user, conjugation: translation)
      trimmed_db_word = translation.spanish.downcase.strip.tr('?!:;.,', '')
    when "translation"
      translation = Translation.find(params_body["id"])
      score = Score.find_or_create_by(user: current_user, translation: translation)
      trimmed_db_word = translation.spanish.downcase.strip.tr('?!:;.,', '')
    end

    trimmed_attempt = params_body["attempt"].downcase.strip.tr('?!:;.,', '')

      if trimmed_attempt == trimmed_db_word
        score.move_up
      else
        score.move_down
      end

    render json: translation.to_json


    # # 2. Return new translation.

    # # All words in private list with positive priority in prioritized order.
    # pscores_tids = prioritized_scores.map(&:translation_id)
    # locked_session_tids = session[:scored_translation_ids] - pscores_tids
    # unlocked_session_tids = session[:scored_translation_ids] - locked_session_tids
    # new_tids_for_session = (pscores_tids - unlocked_session_tids)[0...locked_session_tids.count]

    # # unless the_score
    # # If no new translation id's added return last translation in session array
    # if score.bucket === 0
    #   # retrives the values from first array that includes in the second array.
    #   # the past in id is not included.
    #   priority_sorted_sesson_ids = pscores_tids & session[:scored_translation_ids]
    #   # to_do_1: return id with lowest priority from a sorted sesson variabel. So find a way to sort session[:scored_translation_ids]
    #   @translations = Translation.where(id: priority_sorted_sesson_ids.first )
    #   render 'lists/global'
    # elsif new_tids_for_session.count <= 0
    #   @translations = Translation.where(id: session[:scored_translation_ids].last )
    #   render 'lists/global'
    # else # else return the new translations for the new id's
    #   # to_do_2 This line should not add up if word is in bucket 0
    #   session[:scored_translation_ids] += new_tids_for_session
    #   @translations = Translation.where(id: new_tids_for_session )
    #   render 'lists/global'
    # end


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
    scores = current_user.scores
    array = []

    # if scores.any?
      Bucket.config.each_index do |i|
        score = scores.where(bucket: i)
        translations = 0
        percentage = 0
        if score.count != nil && score.count != 0
          translations = score.count
          percentage = ( (score.count.to_f / scores.count.to_f) * 1000 ).round / 1000.0 * 100
        end
        array.push({ translations: translations, percentage: percentage  })
      end
    # end
    render json: array.to_json

  end

  def stats
    scores = current_user.scores
    knowing = scores.where( bucket: Bucket.top_bucket ).count
    playing = scores.count - knowing
    waiting = current_user.lists.find_by( name: :private).translations.count - scores.count
    # today_played_old_translation = current_user.scores.where( updated_at: 1.day.ago..Date.today ).count
    today_played_old_translation = current_user.scores.where( updated_at: 1.day.ago..0.day.ago ).count
    render json: {
                    knowing: knowing,
                    playing: playing,
                    waiting: waiting,
                    today: {
                      played: today_played_old_translation
                    }
                  }.to_json
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



