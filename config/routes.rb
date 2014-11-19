Rails.application.routes.draw do

  root  'login#index'
  match 'dashboard',      to: 'dashboard#index',          via: [:get]
  match 'appointments',   to: 'appointments#index',       via: [:get]
  match 'classes',        to: 'classes#index',            via: [:get]
  match 'workshops',      to: 'workshops#index',          via: [:get]
  match 'clients',        to: 'clients#index',            via: [:get]
  match 'products',       to: 'products#index',           via: [:get]
  match 'services',       to: 'services#index',           via: [:get]
  match 'staff',          to: 'staff#index',              via: [:get]
  
  match 'slo',            to: 'appointments#slo',         via: [:get]
  match 'atascadero',     to: 'appointments#atascadero',  via: [:get]
  match 'paso',           to: 'appointments#paso',        via: [:get]
    
  match 'business',       to: 'business#index',           via: [:get]
  match 'reports',        to: 'business#reports',         via: [:get]
  match 'sms',            to: 'business#auto_sms',        via: [:get]
  match 'email',          to: 'business#auto_email',      via: [:get]
  match 'settings',       to: 'business#settings',        via: [:get]
  
  match 'admin',          to: 'admin#index',              via: [:get]
  match 'admin/payment_processing',          to: 'payment_processing#index',              via: [:get]
  match 'admin/design_library',              to: 'design_library#index',                  via: [:get]

  match 'login',          to: 'login#index',               via: [:get]

end
