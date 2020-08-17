# frozen_string_literal: true

# Password for game.
class CreatePasswords < ActiveRecord::Migration[6.0]
  def change
    create_table :passwords do |t|
      t.text :word, null: false
      t.integer :win_count, null: false
      t.integer :loss_count, null: false

      t.timestamps
    end
  end
end
