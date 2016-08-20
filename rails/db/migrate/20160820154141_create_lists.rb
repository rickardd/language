class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :name, :default => "private"
      t.integer :user_id

      t.timestamps
    end
  end
end
