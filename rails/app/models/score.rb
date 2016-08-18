class Score < ActiveRecord::Base
  belongs_to :translation

  BUCKETS = [
              {
                bucket: 0,
                steps: 1
              },
              {
                bucket: 1,
                steps: 2
              },
              {
                bucket: 2,
                steps: 3
              },
              {
                bucket: 3,
                steps: 4
              }
            ]

  def total
    counts = []
    BUCKETS.each do |bucket|
      counts.push( Score.where( bucket: bucket[:bucket] ).count )
    end
    counts
  end

  # returns: true if updated
  # returns: false if in the last bucket and can't move up
  def move_up
    maximum_steps = BUCKETS[self.bucket][:steps]
    if self.step < maximum_steps
      return step_up
    end
    if self.step >= maximum_steps
      return bucket_up
    end
  end

  def move_down
    if self.step > 0
      return step_down
    end
    if self.step <= 0
      return bucket_down
    end
  end


  private

    def step_up
      puts '-- Step Up --'
      next_step = self.step + 1
      self.update( step: next_step )
      return "step_up"
    end

    def bucket_up
      puts '-- Bucket Up --'
      next_bucket = self.bucket + 1
      if( !BUCKETS[next_bucket] )
        puts '-- return self--'
        return "bucket_no_change"
      else
        puts '-- updating bucket --'
        self.update( bucket: next_bucket, step: 0 )
        return "bucket_up"
      end
    end

    def step_down
      puts '-- Step Down --'
      previous_step = self.step - 1
      self.update( step: previous_step )
      return "step_down"
    end

    def bucket_down
      puts '-- Bucket Down --'
      if( self.bucket <= 0 )
        puts '-- return self--'
        return "bucket_no_change"
      else
        puts '-- updating bucket --'
        previous_bucket = self.bucket - 1
        steps_in_previous_bucket = BUCKETS[previous_bucket][:steps]
        self.update( bucket: previous_bucket, step: steps_in_previous_bucket )
        return "bucket_down"
      end
    end

end
