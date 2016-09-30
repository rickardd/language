class Verb < ApplicationRecord
  has_and_belongs_to_many :lists
  has_many :conjugations
end
