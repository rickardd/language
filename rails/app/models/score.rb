class Score < ActiveRecord::Base
  belongs_to :translation
  belongs_to :user


  BUCKETS = Bucket.config

  validates :bucket, :numericality => {
                                        :greater_than_or_equal_to => 0,
                                        :less_than_or_equal_to => Bucket.top_bucket
                                      }
  validates :step, :numericality => { :greater_than_or_equal_to => 0 }

  # ToDo: Score: bucket, step seems to allow nil values. Shout be not null field

  def total
    counts = []
    BUCKETS.each_with_index do |bucket, index|
      counts.push( Score.where( bucket: index ).count )
    end
    counts
  end

  def move_up
    self.touch
    maximum_steps = BUCKETS[self.bucket]["steps"]

    if self.step < maximum_steps
      return step_up
    else
      return bucket_up
    end
  end

  def move_down
    self.touch
    if self.step > 0
      return step_down
    else
      return bucket_down
    end
  end


  private

    def step_up
      next_step = self.step + 1
      self.update( step: next_step )
      self
    end

    def bucket_up
      next_bucket = self.bucket + 1
      return self if !BUCKETS[next_bucket]

      self.update( bucket: next_bucket, step: 0 )
      self
    end

    def step_down
      previous_step = self.step - 1
      self.update( step: previous_step )
      self
    end

    def bucket_down
      return self if self.bucket <= 0
      previous_bucket = self.bucket - 1
      steps_in_previous_bucket = BUCKETS[previous_bucket]["steps"]
      self.update( bucket: previous_bucket, step: steps_in_previous_bucket )
      self
    end

end
