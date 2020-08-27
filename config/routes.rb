# frozen_string_literal: true

Rails.application.routes.draw do
  resources :games, only: %i[create update show destroy]
  resources :passwords, only: :create
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
