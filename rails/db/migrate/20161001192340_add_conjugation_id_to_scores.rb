class AddConjugationIdToScores < ActiveRecord::Migration[5.0]
  def change
    add_column :scores, :conjugation_id, :integer
  end
end
