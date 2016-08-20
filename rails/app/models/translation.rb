class Translation < ActiveRecord::Base

  has_and_belongs_to_many :lists
  has_one :score

  def self.next
    self.all.limit(2)
    puts tp self.all.limit(2), "id", "english", "spanish", "score.id", "score.bucket", "score.step"
  end

end
