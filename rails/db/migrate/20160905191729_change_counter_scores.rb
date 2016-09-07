class ChangeCounterScores < ActiveRecord::Migration[5.0]
  def change
    remove_column :scores, :no_of_succeeded, :sting
    remove_column :scores, :no_of_failed, :sting
    remove_column :scores, :no_of_attempts, :sting

    add_column :scores, :no_of_succeeded, :integer, :default => 0
    add_column :scores, :no_of_failed, :integer, :default => 0
    add_column :scores, :no_of_attempts, :integer, :default => 0
  end
end
