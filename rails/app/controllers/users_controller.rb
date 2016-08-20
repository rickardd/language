class UsersController < ApplicationController
  def login_user_1

    user = User.find(1)
    if user && user.authenticate("pass")
      session[:user_id] = user.id
      render json: {message: "#{user.email} is logged in"}
    else
      render json: {message: "user couldn't be found or wrong pass"}
    end


  end
end