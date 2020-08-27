# frozen_string_literal: true

# Hint Module
class Hint < ApplicationRecord
  belongs_to :password

  validates :message,
            presence: true,
            uniqueness: { case_sensitive: false, scope: :password, message: 'is already exists for that password.' },
            length: { maximum: 140, too_long: 'is to long.' }
end
