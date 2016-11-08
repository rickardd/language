# Dir.glob('dictionaries/spanish-english-verbs.txt').each do |word_file_path|
#   File.open(word_file_path).each_line do | line |
#     line.gsub!(";",'')
#     line.downcase!
#     next unless line.include?(":")

#     spanish_word = line.split(':')[0].strip
#     english_words = line.split(':')[1].split(",").map(&:strip)
#     category = "verb"

#     Translation.find_or_create_by( spanish: spanish_word ) do |word|
#       word.english = english_words.join(',')
#       word.category = category
#     end

#   end
# end

# ***********************
# IMPORTS
# VERBS AND
# RELATED conjugationS
# ***********************


require 'json'
file = File.read('dictionaries/spanish-english-verbs/verb-set-4.json')
data_hash = JSON.parse(file)

data_hash.each do |verb_item|
  arVerb = Verb.find_or_create_by( infinitve_spanish: verb_item['infinitve']['spanish'] ) do |verb|
    verb.infinitve_english = verb_item['infinitve']['english']
    verb.infinitve_spanish = verb_item['infinitve']['spanish']
    verb.past_participle_spanish = verb_item['pastParticiple']['spanish']
    verb.past_participle_english = verb_item['pastParticiple']['english']
    verb.gerund_spanish = verb_item['gerund']['spanish']
    verb.gerund_english = verb_item['gerund']['english']
  end
  verb_item["collection"].each do |collection_item|
    section_title = collection_item['section']['title']
    collection_item['section']['collection'].each do |tense|
      tens_title = tense['title']
      tense['conjugations'].each do |conjugation|
        person_term = ""
        case conjugation['pron']
          when "yo"
            person_term = "1ps"
          when "tú"
            person_term = "2ps"
          when "él"
            person_term = "3ps"
          when "nosotros"
            person_term = "1pp"
          when "vosotros"
            person_term = "2pp"
          when "ellos"
            person_term = "3pp"
          else
            person_term = "undef"
        end
        tens_title + "-" + section_title
        Conjugation.create(
          spanish: conjugation['spanish'].strip,
          english: conjugation['english'].strip,
          spanish_pron: conjugation['pron'].strip,
          verb_id: arVerb.id,
          person: person_term,
          is_regular: conjugation['isRegular'],
          helper_verb: conjugation['helperVerb'].strip,
          section: section_title.strip,
          tens: tens_title.strip
        )
      end
    end
  end
end



# tp Conjugation.all, :person, :spanish_pron, :spanish, :english, :is_regular, :verb_id, :section, :helper_verb, :tens


