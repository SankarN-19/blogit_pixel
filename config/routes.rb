# frozen_string_literal: true

Rails.application.routes.draw do
  get "categories/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, param: :slug, except: [:new, :edit]
    resources :categories, only: [:index, :create]
    resources :users, only: [:index, :create]
    resources :organizations, only: [:index]
    resource :session, only: [:create, :destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
