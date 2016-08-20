class CreateListsTranslations < ActiveRecord::Migration[5.0]
  def change
    create_table :lists_translations do |t|
      t.integer :list_id, :null => false
      t.integer :translation_id
    end
    add_index :lists_translations, :list_id
    add_index :lists_translations, :translation_id
  end
end
