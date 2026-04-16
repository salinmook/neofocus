class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :scores

  def high_score_for(level)
    return 0 unless level
    scores.where(level: level).maximum(:score) || 0
  end

  def total_high_score
    Level.all.sum { |level| high_score_for(level) }
  end

  def level_unlocked?(level)
    case level.level_number
    when 1
      true

    when 2
      level1 = Level.find_by(level_number: 1)
      return false unless level1

      high_score_for(level1) >= 400

    when 3
      level2 = Level.find_by(level_number: 2)
      return false unless level2

      high_score_for(level2) >= 450

    else
      false
    end
  end

  def level_trophy?(level)
    case level.level_number
    when 1
      high_score_for(level) >= 400
    when 2
      high_score_for(level) >= 450
    when 3
      high_score_for(level) >= 450
    else
      false
    end
  end
end
