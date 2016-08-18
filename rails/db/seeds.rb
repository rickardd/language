Dir.glob('dictionaries/*.txt').each do |word_file_path|
  File.open(word_file_path).each_line do | line |
    line.gsub!(";",'')
    line.downcase!
    next unless line.include?(":")

    spanish_word = line.split(':')[0].strip
    english_words = line.split(':')[1].split(",").map(&:strip)

    Translation.find_or_create_by( spanish: spanish_word ) do |word|
      word.english = english_words.join(',')
    end

  end
end