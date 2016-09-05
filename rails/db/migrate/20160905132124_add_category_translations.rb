class AddCategoryTranslations < ActiveRecord::Migration[5.0]
  def change
    add_column :translations, :category, :string
  end
end
