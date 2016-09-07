class AddCounterScores < ActiveRecord::Migration[5.0]
  def change
    add_column :scores, :no_of_succeeded, :string
    add_column :scores, :no_of_failed, :string
    add_column :scores, :no_of_attempts, :string
  end
end
