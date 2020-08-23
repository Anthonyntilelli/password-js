# frozen_string_literal: true

#  User game.
class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :password_id, null: false
      t.integer :turn, null: false
      t.boolean :completed, null: false

      t.timestamps
    end
  end
end
