class AppController < ApplicationController
  def index
    render :file => "/app/angular2/index.html"
  end

  # , :layout => true, :status => 404
end
