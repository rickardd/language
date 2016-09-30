class CreateConjugations < ActiveRecord::Migration[5.0]
  def change
    create_table :conjugations do |t|
      t.string   :person
      t.string   :spanish_pron
      t.string   :spanish
      t.string   :english
      t.boolean  :is_regular
      t.integer  :verb_id
      t.string   :section
      t.string   :helper_verb
      t.string   :tens

      t.timestamps
    end
  end
end
