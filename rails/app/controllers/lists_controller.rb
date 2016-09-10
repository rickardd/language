class ListsController < ApplicationController
  # before_filter :authorize

  def global
    translations = Translation.where(user_id: -1).limit( params[:limit] ).offset( params[:count_from] )
    private_translations = current_user.lists.find_by( name: :my_list).translations
    user_scores = current_user.scores

    @combined = []

    translations.each do |t|
      score = user_scores.where( translation_id: t.id)[0]
      @combined.push( { translation: t, score: score } )
    end

    render 'lists/translation_score.json.jbuilder'
  end

  def private
    translations = current_user.lists.find_by(name: :private).translations.limit( params[:limit] ).offset( params[:count_from] )
    user_scores = current_user.scores

    @combined = []

    translations.each do |t|
      score = user_scores.where( translation_id: t.id)[0]
      @combined.push( { translation: t, score: score } )
    end

    render 'lists/translation_score.json.jbuilder'
  end

  def custom
    # @translations = current_user.lists.find_by(name: :custom).translations.limit( params[:limit] ).offset( params[:count_from] )
    # render 'lists/global'
    #
    # translations = Translation.all.where( user_id: current_user.id )
    translations = current_user.lists.find_by(name: :my_list).translations.order("created_at DESC")
    user_scores = current_user.scores

    @combined = []

    translations.each do |t|
      score = user_scores.where( translation_id: t.id)[0]
      @combined.push( { translation: t, score: score } )
    end

    render 'lists/translation_score.json.jbuilder'
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
