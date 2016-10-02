class CreateTableListsConjugations < ActiveRecord::Migration[5.0]
  def change
    create_table :lists_conjugations do |t|
      t.integer :list_id, :null => false
      t.integer :conjugation_id, :null => false
    end
    add_index :lists_conjugations, :list_id
    add_index :lists_conjugations, :conjugation_id
  end
end