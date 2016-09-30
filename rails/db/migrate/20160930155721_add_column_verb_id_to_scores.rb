class AddColumnVerbIdToScores < ActiveRecord::Migration[5.0]
  def change
    add_column :scores, :verb_id, :integer
  end
end
