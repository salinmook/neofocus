class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    redirect_to menu_path if user_signed_in?
  end

  def menu
  end

  def instructions
  end

  def profile
  end
end
