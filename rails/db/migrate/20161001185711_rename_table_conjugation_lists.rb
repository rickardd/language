class RenameTableConjugationLists < ActiveRecord::Migration[5.0]
  def change
    rename_table :lists_conjugations, :conjugations_lists
  end
end
