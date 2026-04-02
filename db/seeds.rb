# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts "Cleaning database..."
Level.destroy_all

puts "Creating Neofocus levels..."
Level.create!(
    level_number: 1,
    passing_hit: 10,
    time_limit: 50
)

Level.create!(
    level_number: 2,
    passing_hit: 9,
    time_limit: 50
)

Level.create!(
    level_number: 3,
    passing_hit: 9,
    time_limit: 50
)

puts "Finished! Created #{Level.count} levels"
