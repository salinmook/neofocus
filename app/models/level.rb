class Level < ApplicationRecord
    has_many :scores,
    dependent: :destroy

    validates :level_number,
    presence: true, uniqueness: true
    validates :passing_hit, :time_limit,
    presence: true
end
