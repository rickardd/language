class User < ApplicationRecord

  has_secure_password

  validates :password, length: { minimum: 3 }
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  validates :email, uniqueness: true
  has_many :lists
  # has_many :scores
  # has_many :xps

  # def private_list
  #   lists.first
  # end

  # def current_language_from
  #   Language.find_by name: "spanish"
  # end

  # def current_language_to
  #   Language.find_by name: "english"
  # end

  def scores_hash
    scores.map do | score |
      #puts 'sid: ' + score.id.to_s + ' tid: ' + score.translation_id.to_s
      delay = Bucket.delay_of(score.bucket) #delay in seconds
      delta = (Time.now - score.updated_at).seconds
      time_from_break = delta - delay
      priority = delay.to_f / time_from_break.to_f
      {priority: priority, score: score}
    end
  end

  def prioritized_scores
    # returns all scores with positive or neutral priority.
    # In a sorted list. Low priority number = heigh priority
    # Highest priority on index 0
    scores_hash.select{|s| s[:priority] >= 0}.sort{|a,b| a[:priority] <=> b[:priority]}.map{|s| s[:score]}

  end

  # def streak_7_days
  #   xps.where( date: 7.day.ago..Date.today)
  # end

  # def number_of_strongest_words
  #     scores.select('bucket').where( bucket: 14 ).count();
  # end

  # def words_in_bucket_group_1
  #     scores.where(:bucket => 0..3).where("created_at != updated_at").count()
  # end

  # def words_in_bucket_group_2
  #     scores.where(:bucket => 4..6 ).where("created_at != updated_at").count()
  # end

  # def words_in_bucket_group_3
  #     scores.where(:bucket => 7..9 ).where("created_at != updated_at").count()
  # end

  # def words_in_bucket_group_4
  #     scores.where(:bucket => 10..14 ).where("created_at != updated_at").count()
  # end

  # def total_number_of_words_in_list
  #     private_list.translations.count
  # end

  # def number_of_played_words
  #     scores.all.where('updated_at != created_at').count
  # end

end
