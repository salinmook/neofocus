class ScoresController < ApplicationController
skip_before_action :verify_authenticity_token, only: [:create]

    def create
        @score = Score.new(score_params)
        @score.user = current_user

        if @score.save
            render json: { status: 'success', score: @score },
            status: :created
        else
            render json: { status: 'error', message: @score.errors.full_messages },
            status: :unprocessable_entity
        end
    end


private

    def score_params
        params.require(:score).permit( :level_id, :hits, :score )
    end


end



