class ListsController < ApplicationController
  # before_filter :authorize

  def global
    @translations = Translation.all.limit( params[:limit] ).offset( params[:count_from] )
    # @private_translations = Translation.where( user_id: current_user.id )
    @private_translations = current_user.lists.find_by( name: :my_list).translations

    @user_scores = current_user.scores
    # @private_translations = current_user.private_list.translations
    # Use the json jbuilder to combine the private and global list in an object
    # render json: @translations.to_json
    render 'lists/global.json.jbuilder'
  end

  def private
    @translations = current_user.lists.find_by(name: :private).translations.limit( params[:limit] ).offset( params[:count_from] )
    # render 'lists/global'
    render json: @translations
  end

  def custom
    # @translations = current_user.lists.find_by(name: :custom).translations.limit( params[:limit] ).offset( params[:count_from] )
    # render 'lists/global'
    #
    # translations = Translation.all.where( user_id: current_user.id )
    translations = current_user.lists.find_by(name: :my_list).translations.order("created_at DESC")
    render json: translations
  end

  def add_translation
    translation = Translation.find( params[:translation_id] )

    if current_user.lists.find_by(name: :private).translations << translation
      render json: translation.to_json
    else
      throw "translation #{params[:translation_id]} coulnd't be found"
    end
  end


  def remove_translation
    list_translation = current_user.lists.find_by(name: :private).translations

    if list_translation.delete( params[:translation_id] )
      render json: "{message: 'translation #{params[:translation_id]} is removed'"
    else
      throw "translation #{params[:translation_id]} for user couldn't be found"
    end
  end

end
