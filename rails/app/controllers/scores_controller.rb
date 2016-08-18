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


    # Allows cross origin requests.
    # ToDo: remove once angular2 works on the same server as rails
    # def set_header
    #   request.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'
    #   request.headers['Access-Control-Allow-Methods'] = 'POST, PUT, PATCH, DELETE, GET, OPTIONS'
    #   request.headers['Access-Control-Request-Method'] = '*'
    #   request.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    # end
end
