Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
    }, defaults: { format: :json }

  resources :spreadsheets, defaults: { format: :json }
  resources :data, defaults: { format: :json }

  root to: 'home#index'
  match "*path", to: "home#index", format: false, via: :get
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
