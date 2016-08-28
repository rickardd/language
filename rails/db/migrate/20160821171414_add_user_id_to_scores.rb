class AddUserIdToScores < ActiveRecord::Migration[5.0]
  def change
    add_reference :scores, :user, index: true
  end
end
