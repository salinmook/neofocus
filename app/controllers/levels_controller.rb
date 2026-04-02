class LevelsController < ApplicationController
  def index
    @levels = Level.all
  end

  def show
    @level = Level.find(params[:id])
  end

  def won
    @level = Level.find(params[:id])
  end

  def lost 
    @level = Level.find(params[:id])
  end

end
