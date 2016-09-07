json.array! @translations do |translation|
  json.spanish translation.spanish
  json.english translation.english
  json.id translation.id
  if @private_translations
    json.private_match @private_translations.include?( translation )
  end

  if @user_scores
    json.no_of_succeeded @user_scores.include?( translation.id )
    json.no_of_failed 0
    json.no_of_attempts 0
  end


end




  tp User.first.scores( :translations )
