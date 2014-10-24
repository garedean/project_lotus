Rails.application.routes.draw do

  root 'dashboard#index'
  match 'dashboard',    to: 'dashboard#index',    via: [:get]
  match 'appointments', to: 'appointments#index', via: [:get]
  match 'classes',      to: 'classes#index',      via: [:get]
  match 'workshops',    to: 'workshops#index',    via: [:get]
  match 'clients',      to: 'clients#index',      via: [:get]
  match 'products',     to: 'products#index',     via: [:get]
  match 'services',     to: 'services#index',     via: [:get]
  match 'staff',        to: 'staff#index',        via: [:get]
  match 'business',     to: 'business#index',     via: [:get]
  match 'admin',        to: 'admin#index',        via: [:get]

end
