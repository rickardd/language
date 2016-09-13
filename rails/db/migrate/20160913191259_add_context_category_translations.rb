class AddContextCategoryTranslations < ActiveRecord::Migration[5.0]
  def change
    add_column :translations, :context, :string
  end
end
