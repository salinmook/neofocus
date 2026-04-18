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
                                .where(level_id: @level.id)
                                .order(created_at: :desc)
                                .first

    @hits = @score_record&.hits || 0
    @score = @score_record&.score || (@hits * 50)

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

    @encouragement_messages = [
      "Almost got it! Keep going",
      "So close! Try one more time",
      "Don't give up! You can do it.",
      "Nice try! Let's go again",
      "You're getting better! Try again"
    ]

    @message = @encouragement_messages.sample
  end

end
