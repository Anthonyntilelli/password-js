# frozen_string_literal: true

# Password Module
class Password < ApplicationRecord
  has_many :hints, dependent: :destroy

  before_validation :normalize_word, on: %i[create update]

  validates :word,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: { with: /\A[a-z]{3,}\Z/ }

  def ready?
    hints.all.count >= 5
  end

  # Return Random ready password
  def self.random_ready
    all.shuffle.find(&:ready?)
  end

  private

  def normalize_word
    self.word = word.strip.downcase
  end
end
