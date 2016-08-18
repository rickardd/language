class CreateTranslations < ActiveRecord::Migration
  def change
    create_table :translations do |t|
      t.string :spanish
      t.string :english

      t.timestamps null: false
    end
  end
end
