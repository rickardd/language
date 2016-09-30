class List < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :translations
  has_and_belongs_to_many :verbs
end
