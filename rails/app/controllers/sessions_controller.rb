class SessionsController < ApplicationController

  # before_action :authenticate

  # def index
  #   episodes = Episode.all
  #   render json: episodes, status: 200
  # end



  def login_user_1
    user = User.find(1)
    if user && user.authenticate("pass")
      session[:user_id] = user.id
      render json: user.email.to_json, status: 200
      puts user.email.to_json
    else
      render json: {message: "user couldn't be found or wrong pass"}
    end
  end

  def show_user_1
    if( current_user )
      render json: { user: current_user.email }
    else
      render json: { message: "no user is logged in" }
    end
  end

  def destroy_user_1
    session[:user_id] = nil
    render json: { message: "User 1 session is destroyed and logged out"}.to_json
  end


  protected
    def authenticate
      authenticate_token || render_unauthorized
    end

    def authenticate_token
      # authenticate_with_http_token do |token, options|
      authenticate_or_request_with_http_token('Premium')  do |token, options|
        # User.find_by(auth_token: token)
        User.find(1)
      end
    end

    def render_unauthorized
      self.headers['WWW-Authenticate'] = 'Token realm="Application"'
      render json: 'Bad credentials', status: 401
    end

end