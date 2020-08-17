# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Password.destroy_all
Hint.destroy_all

# Password Ready (enough hint)
pass1 = Password.create!(word: 'test', win_count: 0, loss_count: 0)
(1..10).each do |i|
  pass1.hints.create!(message: "Hint #{i} for test", shown: 0)
end

raise 'Pass 1 should be ready' unless pass1.ready?

# Not ready (Not enough hints)
pass2 = Password.create!(word: 'cat', win_count: 0, loss_count: 0)
pass2.hints.create!(message: 'Meow', shown: 0)
raise 'Pass 2 should not be ready' if pass2.ready?
