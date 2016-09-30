class CreateTableListsTranslations < ActiveRecord::Migration[5.0]
  def change
    create_table :lists_verbs do |t|
      t.integer :list_id
      t.integer :verb_id
    end
  end
end
