Rails.application.routes.draw do
  root 'dashboard#index'
  match 'classes', to: 'classes#index', via: [:get]

end
