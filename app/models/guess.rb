# frozen_string_literal: true

# Guess in a game
class Guess < ApplicationRecord
  belongs_to :game

  before_validation :normalize_word, on: %i[create update]

  validates :word,
            presence: true,
            uniqueness: { case_sensitive: false, scope: :game, message: 'was already made guessed.' },
            format: { with: /\A[a-z]{3,}\Z/ }
  validates :correct, inclusion: { in: [true, false] }

  private

  def normalize_word
    self.word = word.strip.downcase
  end
end
