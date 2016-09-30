class CreateVerbs < ActiveRecord::Migration[5.0]
  def change
    create_table :verbs do |t|
      t.string   :infinitve_english
      t.string   :infinitve_spanish
      t.string   :past_participle_spanish
      t.string   :past_participle_english
      t.string   :gerund_spanish
      t.string   :gerund_english

      t.timestamps
    end
  end
end
