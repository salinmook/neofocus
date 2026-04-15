class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]
  before_action :authenticate_user!

  def home
    redirect_to menu_path if user_signed_in?
  end

  def menu
  end

  def instructions
  end

  def profile
    @levels = Level.all
    @user = current_user
    @total_score = @user.total_high_score
  end

  def update_profile
    success = current_user.update(profile_params)

    Rails.logger.error("SUCCESS: #{success}")
    Rails.logger.error(current_user.errors.full_messages)

    redirect_to profile_path
  end

  def profile_params
    params.require(:user).permit(:name, :avatar)
  end
end
