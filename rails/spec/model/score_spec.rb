require 'rails_helper'

RSpec.describe Score,  :type => :model do

  describe "#scores_hash" do
    let(:user){ User.create email: "test@test.com", password: "password", password_confirmation: "password" }

    before do
      @time_freeze = Timecop.freeze(Time.now)
      ("a".."d").each do |letter|
        translation = Translation.create english: "en-" + letter, spanish: "sp-" + letter
      end
    end

    it "Get the bucket for the first translation" do
      score = Score.find_or_create_by(user: user, translation: Translation.first)
      expect(score.bucket).to eq(0)
    end

    it "Get priority 1 for one score" do
      score = Score.find_or_create_by(user: user, translation: Translation.first)
      expect(user.scores_hash).to eq([{priority: -1.0, score: score}])
    end

    it "Get priority for 2 scores, without 2 other scores" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 0)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 0)
      Timecop.freeze(@time_freeze + 4.seconds)

      # Only expect the first two scores, because they are in the bucket 0, the other two are in
      # bucket 1 which shouldn't be played yet.
      expect(user.prioritized_scores).to contain_exactly(s1, s2)
    end

    it "After 10000 seconds should get all scores" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 0)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 1)
      s3 = Score.create(user: user, translation: Translation.all[2], bucket: 2)
      s4 = Score.create(user: user, translation: Translation.all[3], bucket: 3)
      Timecop.freeze(@time_freeze + 10000.seconds)

      expect(user.prioritized_scores).to eq([s1, s2, s3, s4])
    end

    it "mixed different buckets" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 2)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 1)
      s3 = Score.create(user: user, translation: Translation.all[2], bucket: 3)
      s4 = Score.create(user: user, translation: Translation.all[3], bucket: 4)
      Timecop.freeze(@time_freeze + 1000.seconds)

      expect(user.prioritized_scores).to eq([s2, s1, s3, s4])
    end

    it "mixed different buckets" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 0, updated_at: @time_freeze - 40.seconds)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 0, updated_at: @time_freeze - 30.seconds)
      s3 = Score.create(user: user, translation: Translation.all[2], bucket: 0, updated_at: @time_freeze - 20.seconds)
      s4 = Score.create(user: user, translation: Translation.all[3], bucket: 0, updated_at: @time_freeze - 10.seconds)
      Timecop.freeze(@time_freeze + 100.seconds)

      expect(user.prioritized_scores).to eq([s1, s2, s3, s4])
    end

    it "All scores on same priority, return all" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 0)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 0)
      s3 = Score.create(user: user, translation: Translation.all[2], bucket: 0)
      s4 = Score.create(user: user, translation: Translation.all[3], bucket: 0)
      Timecop.freeze(@time_freeze + 100.seconds)

      expect(user.prioritized_scores).to contain_exactly(s1, s2, s3, s4)
    end

    it "Failing every score, should never get same word twice" do
      s1 = Score.create(user: user, translation: Translation.all[0], bucket: 0)
      Timecop.freeze(@time_freeze + 1.seconds)
      s2 = Score.create(user: user, translation: Translation.all[1], bucket: 0)
      Timecop.freeze(@time_freeze + 2.seconds)
      s3 = Score.create(user: user, translation: Translation.all[2], bucket: 0)
      Timecop.freeze(@time_freeze + 3.seconds)
      s4 = Score.create(user: user, translation: Translation.all[3], bucket: 0)
      expect(user.prioritized_scores.first.id).to eq( s1.id )

      Timecop.freeze(@time_freeze + 4.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s2.id )

      Timecop.freeze(@time_freeze + 5.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s3.id )

      Timecop.freeze(@time_freeze + 6.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s4.id )

      Timecop.freeze(@time_freeze + 7.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s1.id )

      Timecop.freeze(@time_freeze + 8.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s2.id )

      Timecop.freeze(@time_freeze + 9.seconds)
      user.prioritized_scores.first.move_down
      expect(user.prioritized_scores.first.id).to eq( s3.id )
    end

    it "outside of bucket" do
      s1 = Score.create(user: user, translation: Translation.all[0]).move_up

      Timecop.freeze(@time_freeze + 0.5.seconds)
      expect(user.prioritized_scores).to_not include(s1)
    end

    it "priority with infinity includes" do
      s1 = Score.create(user: user, translation: Translation.all[0]).move_up

      Timecop.freeze(@time_freeze + 1.seconds)
      expect(user.prioritized_scores).to include(s1)
    end

    it "priority just outside time for bucket inncudes" do
      s1 = Score.create(user: user, translation: Translation.all[0]).move_up

      Timecop.freeze(@time_freeze + 1.5.seconds)
      expect(user.prioritized_scores).to include(s1)
    end

  end
end
