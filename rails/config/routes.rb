Rails.application.routes.draw do

  # get 'scrores/update'
  get 'scores/total'
  get 'scores/stats/:user_id' => 'scores#stats'

  get 'users/login_user_1' => "sessions#login_user_1"
  post 'users/login_user_1' => "sessions#login_user_1"
  get 'users/logout_user_1' => "sessions#destroy_user_1"
  get 'users/who_is_logged_in' => "sessions#show_user_1"

  resources :lists do
    collection do
      get 'global'
      get 'private'
      get 'custom'
      post 'private/translation/:translation_id' => 'lists#add_translation_to_private'
      delete 'private/translation/:translation_id' => 'lists#remove_translation_from_private'
      post 'private/verb/:verb_id' => 'lists#add_verb_to_private'
      delete 'private/verb/:verb_id' => 'lists#remove_verb_from_private'
    end
  end

  resources :translations

  resources :score, only: [] do
    collection do
      resources :translations, controller: :scores
    end
  end

  resources :verbs
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
