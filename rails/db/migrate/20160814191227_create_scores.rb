class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :bucket, :default => 0
      t.integer :step, :default => 0
      t.references :translation, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
