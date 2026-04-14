class LevelsController < ApplicationController
  def index
    @levels = Level.all
  end

  def show
    @level = Level.find(params[:id])
  end

 def won
    @level = Level.find(params[:id])

    @score_record = current_user.scores
                                .where(level: @level)
                                .order(created_at: :desc)
                                .first

    @hits = @score_record&.hits || 0
    @score = @hits * 50


    if @score_record.nil?
      @score_record = Score.create!(
        user: current_user,
        level: @level,
        hits: @hits,
        score: @score
      )
    end

    @praises = [
      "Great job!",
      "Excellent Work!",
      "Amazing!",
      "You did it!",
      "Super Star!"
    ]

    @random_praise = @praises.sample
  end

  def lost
    @level = Level.find(params[:id])
  end

end
