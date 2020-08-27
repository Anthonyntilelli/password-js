# frozen_string_literal: true

# Guesses for each game
class CreateGuesses < ActiveRecord::Migration[6.0]
  def change
    create_table :guesses do |t|
      t.references :game, null: false
      t.text :word, null: false
      t.boolean :correct, null: false

      t.timestamps
    end
  end
end
