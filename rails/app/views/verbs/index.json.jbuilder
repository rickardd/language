json.array! @verbs do |verb|
  json.id verb[:id]
  json.infinitive {
    json.spanish verb[:infinitve_spanish]
    json.english verb[:infinitve_english]
  }
  json.pastParticiple{
    json.spanish verb[:past_participle_spanish]
    json.english verb[:past_participle_english]
  }
  json.gerund{
    json.spanish verb[:gerund_spanish]
    json.english verb[:gerund_english]
  }
  json.createdAt verb[:created_at]
  json.updatedAt verb[:updated_at]

  if verb.conjugations
    json.collection{
        json.indicative {
          json.present  verb.conjugations.where( section: :Indicative, tens: :Present )
          json.future  verb.conjugations.where( section: :Indicative, tens: :Future )
          json.imperfect  verb.conjugations.where( section: :Indicative, tens: :Imperfect )
          json.preterite  verb.conjugations.where( section: :Indicative, tens: :Preterite )
          json.conditional  verb.conjugations.where( section: :Indicative, tens: :Conditional )
        }
        json.perfect{
          json.presentPerfect verb.conjugations.where( section: :Perfect, tens: "Present Perfect" )
          json.futurePerfect verb.conjugations.where( section: :Perfect, tens: "Future Perfect" )
          json.pluperfect  verb.conjugations.where( section: :Perfect, tens: :Pluperfect )
          json.conditionalPerfect verb.conjugations.where( section: :Perfect, tens: "Conditional Perfect" )
          json.pastAnterior verb.conjugations.where( section: :Perfect, tens: "Past Anterior" )
        }
        json.subjunctive{
          json.present  verb.conjugations.where( section: :Subjunctive, tens: :Present )
          json.imperfect  verb.conjugations.where( section: :Subjunctive, tens: :Imperfect )
          json.imperfect2 verb.conjugations.where( section: :Subjunctive, tens: "Imperfect 2" )
          json.future  verb.conjugations.where( section: :Subjunctive, tens: :Future )
        }
        json.subjunctivePerfect{
          json.presentPerfect verb.conjugations.where( section: "subjunctive Perfect", tens: "Present Perfect" )
          json.futurePerfect verb.conjugations.where( section: "subjunctive Perfect", tens: "Future Perfect" )
          json.pluperfect  verb.conjugations.where( section: "subjunctive Perfect", tens: :Pluperfect )
          json.pluperfect2 verb.conjugations.where( section: "subjunctive Perfect", tens: "Pluperfect 2" )
        }
        json.ImperativeCommands{
          json.affirmative  verb.conjugations.where( section: "Imperative (Commands)", tens: :Affirmative )
        }
    }
  end

end
