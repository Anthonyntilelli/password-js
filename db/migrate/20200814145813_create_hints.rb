# frozen_string_literal: true

# Password hints for game.
class CreateHints < ActiveRecord::Migration[6.0]
  def change
    create_table :hints do |t|
      t.references :password, null: false
      t.text :message, null: false

      t.timestamps
    end
  end
end
