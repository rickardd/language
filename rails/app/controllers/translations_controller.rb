class TranslationsController < ApplicationController
  # before_filter :authorize

  before_action :set_translation, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token


  # before_filter :set_header, only: [:show]

  # GET /translations
  # GET /translations.json
  def index

    # Tempoorary random function
      render json: current_user.lists.find_by( name: :private ).translations.shuffle.first.to_json
      return
    # End temporary...

    # ToDo: The english word is needed to give the user feedback
    # But is it possible to decrypt it to prevent cheating
    # @translations = Translation.next
    # break if session[:translation_id].nil?
    if( !cookies[:translation_id].nil? && cookies[:translation_id] > "-1" )
      puts "--toggle"
      next_translation_id = cookies[:translation_id] == "1" ? "2" : "1"

      # @translations = Translation.find( next_translation_id )
      translation = current_user.lists.find_by( name: "private").translations.find( next_translation_id )

    else
      puts "--shuffle"
      translation = current_user.lists.find_by( name: "private").translations.shuffle[1..2][0]
    end
    cookies[:translation_id] = translation.id
    # system "clear"
    # puts '*****************'
    # puts 'next session id'
    # puts next_translation_id
    # puts "translation: "
    # puts translation.id
    # puts "session: "
    # puts session[:translation_id]
    # puts '*****************'

    system "clear"
    puts "--------**************---------------"
    puts "--------**************---------------"
    puts "--------******s********---------------"
    puts session[:test]
    puts "--------******c********---------------"
    puts cookies[:test_cookie]
    puts "--------**************---------------"
    puts "--------**************---------------"
    puts "--------**************---------------"
    puts "--------**************---------------"
    puts "--------**************---------------"

    session[:test] = "SESSION SESSION SESSION SESSION"
    cookies[:test_cookie] = "SESSION SESSION SESSION SESSION"

    render json: translation.to_json
  end

  # GET /translations/1
  # GET /translations/1.json
  def show
    @translation = Translation.find(params[:id])
  end

  # GET /translations/new
  def new
    @translation = Translation.new
  end

  # GET /translations/1/edit
  def edit
  end

  # POST /translations
  # POST /translations.json
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
