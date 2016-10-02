
if @translation[:infinitve_spanish] # unique column name
  json.type :verb
  json.english @translation[:infinitve_english]
  json.spanish @translation[:infinitve_spanish]
  json.category :verb
  json.context "Infinitive..."
elsif @translation[:person] # unique column name
  json.type :conjugation
  json.spanish @translation[:spanish]
  json.english @translation[:english]
  json.category @translation[:is_regular] ? "Verb" : "Irregular Verb"
  json.context @translation[:spanish_pron]
else
  json.type :translation
  json.english @translation[:english]
  json.spanish @translation[:spanish]
  json.category @translation[:category]
  json.context @translation[:context]
end

json.id @translation.id
json.createdAt @translation[:created_at]
json.updatedAt @translation[:updated_at]
