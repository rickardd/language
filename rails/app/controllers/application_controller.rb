class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # protect_from_forgery unless: -> { request.format.json? }

  def current_user
    # @current_user ||= User.find(session[:user_id]) if session[:user_id]
    @current_user ||= User.find(1)
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

end
