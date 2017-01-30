json.array! @combined do |c|

  if c[:translation]
    json.type :translation
    json.spanish c[:translation].spanish
    json.english c[:translation].english
    json.category c[:translation].category
    json.context c[:translation].context
    json.id c[:translation].id
  elsif c[:verb]
    json.type :verb
    json.id c[:verb].id
    json.english c[:verb].infinitve_english
    json.spanish c[:verb].infinitve_spanish
    json.created_at c[:verb].created_at
    json.updated_at c[:verb].updated_at
  elsif c[:conjugation]
    json.type :conjugation
    json.id c[:conjugation].id
    json.english c[:conjugation].english
    json.spanish c[:conjugation].spanish
    json.category c[:conjugation].section
    json.context c[:conjugation].spanish_pron
    json.person c[:conjugation].person
    json.created_at c[:conjugation].created_at
    json.updated_at c[:conjugation].updated_at
  end

  if c[:score]
    json.no_of_succeeded c[:score].no_of_succeeded
    json.no_of_failed c[:score].no_of_failed
    json.no_of_attempts c[:score].no_of_attempts
    json.bucket c[:score].bucket
    json.step c[:score].step
    json.days_ago (Time.zone.now.beginning_of_day - c[:score].updated_at.beginning_of_day).to_i / 1.day
  else
    json.no_of_succeeded 0
    json.no_of_failed 0
    json.no_of_attempts 0
    json.bucket -1
    json.step -1
    json.days_ago 0
  end

end
