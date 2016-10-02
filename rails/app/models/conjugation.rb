class Conjugation < ApplicationRecord
  has_and_belongs_to_many :lists
  belongs_to :verb
end
