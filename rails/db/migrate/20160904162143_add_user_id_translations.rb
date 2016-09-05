class AddUserIdTranslations < ActiveRecord::Migration[5.0]
  def change
    add_column :translations, :user_id, :integer, :default => -1
  end
end
