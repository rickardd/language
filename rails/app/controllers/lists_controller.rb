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
    private_list = current_user.lists.find_by(name: :private)
    translations = private_list.translations.limit( params[:limit] ).offset( params[:count_from] )
    verbs = private_list.verbs.limit( params[:limit] ).offset( params[:count_from] )
    conjugations = private_list.conjugations.limit( params[:limit] ).offset( params[:count_from] )
    user_scores = current_user.scores

    @combined = []

    translations.each do |t|
      score = user_scores.where( translation_id: t.id)[0]
      @combined.push( { translation: t, score: score } )
    end

    verbs.each do |t|
      score = user_scores.where( verb_id: t.id)[0]
      @combined.push( { verb: t, score: score } )
    end

    conjugations.each do |t|
      score = user_scores.where( conjugation_id: t.id)[0]
      @combined.push( { conjugation: t, score: score } )
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

  def add_translation_to_private
    translation = Translation.find( params[:translation_id] )
    if current_user.lists.find_by(name: :private).translations << translation
      render json: translation.to_json
    else
      throw "translation #{params[:translation_id]} coulnd't be found"
    end
  end

  def add_verb_to_private
    verb = Verb.find( params[:verb_id] )
    if current_user.lists.find_by(name: :private).verbs << verb
      render json: verb.to_json
    else
      throw "Verb #{params[:verb_id]} coulnd't be found"
    end
  end

  def add_conjugation_to_private
    conjugation = Conjugation.find( params[:conjugation_id] )
    if current_user.lists.find_by(name: :private).conjugations << conjugation
      render json: conjugation.to_json
    else
      throw "conjugation #{params[:conjugation_id]} coulnd't be found"
    end
  end


  def remove_translation_from_private
    list_translation = current_user.lists.find_by(name: :private).translations
    if list_translation.delete( params[:translation_id] )
      render json: "{message: 'translation #{params[:translation_id]} is removed'"
    else
      throw "translation #{params[:translation_id]} for user couldn't be found"
    end
  end

  def remove_verb_from_private
    list_verb = current_user.lists.find_by(name: :private).verbs
    if list_verb.delete( params[:verb_id] )
      render json: "{message: 'translation #{params[:verb_id]} is removed'"
    else
      throw "translation #{params[:verb_id]} for user couldn't be found"
    end
  end

  def remove_conjugation_from_private
    list_conjugation = current_user.lists.find_by(name: :private).conjugations
    if list_conjugation.delete( params[:conjugation_id] )
      render json: "{message: 'translation #{params[:conjugation_id]} is removed'"
    else
      throw "translation #{params[:conjugation_id]} for user couldn't be found"
    end
  end

end
