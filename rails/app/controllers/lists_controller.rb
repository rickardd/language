class ListsController < ApplicationController
  # before_filter :authorize

  def global
    @translations = Translation.all.limit( params[:limit] ).offset( params[:count_from] )
    # @private_translations = current_user.private_list.translations
    # Use the json jbuilder to combine the private and global list in an object
    render json: @translations.to_json
  end

  def private
    @translations = current_user.lists.first.translations.limit( params[:limit] ).offset( params[:count_from] )
    # render 'lists/global'
    render json: @translations
  end
end
