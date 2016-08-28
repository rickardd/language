json.array! @translations do |translation|
  json.from translation.from.word
  json.to translation.to.word
  json.id translation.id
  if @private_translations
    json.private_match @private_translations.include?( translation )
  end
end
