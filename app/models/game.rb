# frozen_string_literal: true

# Game Model
class Game < ApplicationRecord
  validates :password_id, numericality: { only_integer: true }
  validates :turn, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :completed, inclusion: { in: [true, false] }

  def password
    Password.find(password_id)
  end

  def password=(password)
    raise 'Password is incorrect type.' if password.class != Password

    self.password_id = password.id
  end

  # Return trun or false and increments turn.
  def guess(word)
    completed?

    if word.downcase == password.word
      self.completed = true
      correct = true
    else
      self.turn += 1
      correct = false
    end

    self.completed = true if self.turn >= 10

    save!
    correct
  end

  def current_hint
    completed?

    Game.first.password.hints[turn].message
  end

  def lives_left
    10 - self.turn
  end

  # Create and return a new  game
  def self.new_game
    game = Game.new
    password = Password.random_ready
    game.password = password
    game.turn = 0
    game.completed = false
    game.save!
    game
  end

  private

  def completed?
    raise 'Game Already completed' if completed
  end
end
