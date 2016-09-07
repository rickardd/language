class RecreatingScoresTable < ActiveRecord::Migration[5.0]
  def change
    create_table :scores do |t|
      t.integer :bucket, :default => 0
      t.integer :step, :default => 0
      t.integer :no_of_succeeded, :default => 0
      t.integer :no_of_failed, :default => 0
      t.integer :no_of_attempts, :default => 0
      t.references :translation, index: true, foreign_key: true
      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
