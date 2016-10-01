class Score < ActiveRecord::Base
  belongs_to :translation
  belongs_to :verb
  belongs_to :user

  # Move to public place
  BUCKETS = Bucket.config

  validates :bucket, :numericality => {
                                        :greater_than_or_equal_to => 0,
                                        :less_than_or_equal_to => Bucket.top_bucket
                                      }
  validates :step, :numericality => { :greater_than_or_equal_to => 0 }

  # ToDo: Score: bucket, step seems to allow nil values. Shout be not null field

  def move_up
    self.touch

    puts no_of_succeeded = self.no_of_succeeded + 1
    puts no_of_attempts = self.no_of_attempts + 1

    self.update( no_of_succeeded: no_of_succeeded, no_of_attempts: no_of_attempts )

    maximum_steps = BUCKETS[self.bucket]["steps"]

    if self.step < maximum_steps
      return step_up
    else
      return bucket_up
    end
  end

  def move_down
    self.touch

    puts no_of_failed = self.no_of_failed + 1
    puts no_of_attempts = self.no_of_attempts + 1

    self.update( no_of_failed: no_of_failed, no_of_attempts: no_of_attempts )

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
