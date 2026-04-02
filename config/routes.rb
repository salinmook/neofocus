Rails.application.routes.draw do


  devise_for :users
  root to: "pages#home"
  get "menu", to: "pages#menu"
  get "instructions", to: "pages#instructions"
  get "profile", to: "pages#profile"

resources :levels, only: [:index, :show] do
  member do
    get :won
    get :lost
  end

  resources :scores, only: [:create]

end


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check


end
