class TranslationsController < ApplicationController
  # before_filter :authorize

  before_action :set_translation, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  # before_filter :set_header, only: [:show]

  def index
    list = current_user.lists.find_by( name: :private )

    translation_mix = []

    if list.translations.present?
      translation_mix.push( list.translations )
    end
    if list.verbs.present?
      translation_mix.push( list.verbs )
    end
    if list.conjugations.present?
      translation_mix.push( list.conjugations )
    end

    if translation_mix.empty?
      render json: "no_data".to_json
      return
    end

    @translation = translation_mix.flatten.shuffle.first
    render "_translation.json.jbuilder"
  end

  def show
    @translation = Translation.find(params[:id])
  end

  def new
    @translation = Translation.new
  end

  def edit
  end

  def create

    # sets the request body as a json which can be accesible with [:symbols]
    params_body = JSON.parse(request.raw_post).with_indifferent_access
    translation = Translation.new(params_body)
    translation.user_id = current_user.id
      if translation.save
        current_user.lists.find_by( name: :my_list ).translations << translation
        render json: translation.to_json
      else
        throw "coulnd't save translation"
      end

    # respond_to do |format|
    #   if @translation.save
    #     format.html { redirect_to @translation, notice: 'Translation was successfully created.' }
    #     format.json { render :show, status: :created, location: @translation }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @translation.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /translations/1
  # PATCH/PUT /translations/1.json
  def update
    params_body = JSON.parse(request.raw_post).with_indifferent_access
    translation = Translation.find(params[:id])
    if current_user.lists.find_by( name: :my_list ).translations.include?(translation)
      Translation.update( params[:id], spanish: params_body[:spanish], english: params_body[:english], category: params_body[:category], context: params_body[:context] )
      render json: translation.to_json
    end
    # else
    #   current_user.private_list.translations << Translation.find(params[:id])
    #   current_user.scores.create( translation_id: params[:id])
    #   render json: "{ \"private_match\": true, \"action\": \"added\", \"id\": \"#{params[:id]}\"}"
    # end
  end

  # DELETE /translations/1
  # DELETE /translations/1.json
  def destroy

    # ToDo: If user tries to remove a translation the user didn't create an error arises.
    # Bad error handling.

    translation = Translation.where( id: params[:id], user_id: current_user.id ).first
    # ToDO: remove first.destroy
    if translation.destroy

      score = Score.find_by( user: current_user, translation_id: params[:id] )
      if !!score
        score.delete
      end

      # translation = currentTranslation.all.where( user_id: current_user.id )

      translations = current_user.lists.find_by( name: :my_list ).translations.order("created_at DESC")

      render json: translations.to_json
    else
      throw "coulnd't destroy translation #{params[:id]}"
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_translation
      @translation = Translation.find(params[:id])
    end


    # Allows cross origin requests.
    # ToDo: remove once angular2 works on the same server as rails
    # def set_header
    #   headers['Access-Control-Allow-Origin'] = '*'
    #   headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    #   headers['Access-Control-Request-Method'] = '*'
    #   headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    # end

    # Never trust parameters from the scary internet, only allow the white list through.
    def translation_params
      params.require(:translation).permit(:spanish, :english)
    end
end
