# frozen_string_literal: true

# rubocop:disable Rails/Output
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

Password.destroy_all
Hint.destroy_all
Game.destroy_all
Guess.destroy_all

# Password Ready (enough hint)
puts 'Setting up Passwords and Hints'
puts 'Pass 1'
pass1 = Password.create!(word: 'test')
(1..5).each do |i|
  pass1.hints.create!(message: "Hint #{i} for test")
end
raise 'Pass 1 should be ready' unless pass1.ready?

puts 'Pass 2'
# Not ready (Not enough hints)
pass2 = Password.create!(word: 'cat')
pass2.hints.create!(message: 'Meow')
raise 'Pass 2 should not be ready' if pass2.ready?

puts 'Pass 3'
pass3 = Password.create!(word: 'glove')
pass3.hints.create!(message: 'It is used as in cold weather, in sports and protection')
pass3.hints.create!(message: 'It is a clothing item.')
pass3.hints.create!(message: 'It is also common to find in hopitals.')
pass3.hints.create!(message: 'Word starts with a G')
pass3.hints.create!(message: 'It covers the hands')
raise 'Pass 3 should be ready' unless pass3.ready?

puts 'Pass 4'
pass4 = Password.create!(word: 'ruby')
pass4.hints.create!(message: 'Name of a Gem')
pass4.hints.create!(message: 'Also name of a programming language')
pass4.hints.create!(message: 'Word starts with a r')
pass4.hints.create!(message: 'July Birth Stone')
pass4.hints.create!(message: 'The Gem is red')
raise 'Pass 4 should be ready' unless pass4.ready?

puts 'Pass 5'
pass5 = Password.create!(word: 'python')
pass5.hints.create!(message: 'Kind of Lizard')
pass5.hints.create!(message: 'Kind of snake')
pass5.hints.create!(message: 'Kill by wrapping around their prey and crushing the victim')
pass5.hints.create!(message: 'Also name of a programming language')
pass5.hints.create!(message: 'Monty ____ and the Flying circus.')
raise 'Pass 5 should be ready' unless pass5.ready?

puts 'Make Games'
puts 'Fresh Game'
Game.new_game
puts 'Lost game (Lost)'
game = Game.new_game
('a'..'e').each do |i|
  game.make_guess("aaa#{i}")
end
puts 'Active Game'
game2 = Game.new_game
('a'..'c').each do |i|
  game2.make_guess("aaa#{i}")
end

# rubocop:enable Rails/Output
