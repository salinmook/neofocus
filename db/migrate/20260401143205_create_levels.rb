class CreateLevels < ActiveRecord::Migration[7.1]
  def change
    create_table :levels do |t|
      t.integer :level_number
      t.integer :passing_hit
      t.integer :time_limit

      t.timestamps
    end
  end
end
