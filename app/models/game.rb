# frozen_string_literal: true

# Game Model
class Game < ApplicationRecord
  has_many :guesses, dependent: :destroy

  validates :password_id, numericality: { only_integer: true }
  validates :game_state,
            inclusion: { in: %w[active won lost], message: 'game_state must be either active, won or lost.' }

  # Loose connection to password
  def password
    Password.find(password_id)
  end

  def password=(password)
    raise 'Password is incorrect type.' if password.class != Password

    self.password_id = password.id
  end

  # Only gives password when game if over
  def restricted_password
    return nil if game_state == 'active'

    password.word
  end

  # Return true or false and increments turn.
  def make_guess(word)
    raise_if_complete

    correct = word.downcase == password.word
    guesses.create!(word: word, correct: correct)
    self.game_state = 'lost' if lives_left.zero?
    self.game_state = 'won' if correct
    save!
    correct
  end

  def current_hint
    return 'None: Game completed' unless game_state == 'active'

    password.hints[guesses.count].message
  end

  def lives_left
    return 0 unless game_state == 'active'

    5 - guesses.count
  end

  # Create a readable pairing
  def history
    # ... Go up to latest not include
    (0...guesses.count).map do |i|
      { guess: guesses[i].word, hint: password.hints[i].message, correct: guesses[i].correct }
    end
  end

  def surrender
    raise_if_complete

    self.game_state = 'lost'
    save!
  end

  # Create and return a new  game
  def self.new_game
    game = Game.new
    password = Password.random_ready
    game.password = password
    game.game_state = 'active'
    game.save!
    game
  end

  private

  def raise_if_complete
    raise 'Game Already completed' unless game_state == 'active'
  end
end
