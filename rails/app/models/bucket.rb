class Bucket
  def self.config
    JSON.parse File.read("#{Rails.root}/app/views/scores/buckets.json")
  end

  def self.on_last_step_of_bucket?(bucket, step)
    config[bucket]["step"] == step
  end

  def self.top_step_of_bucket(bucket)
    config[bucket]["step"]
  end

  def self.delay_of(bucket)
    config[bucket]["delay"]
  end

  def self.top_bucket
    config.count - 1
  end
end