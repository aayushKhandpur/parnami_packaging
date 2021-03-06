Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/auth'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#index'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
    resources :customers, :locations, :master_products, :master_processes, :orders, :order_products,
        :order_transactions, :order_delivery_plans, :order_delivery_plan_processes, :vendors

	get 'order_delivery_plans_custom/:orderId', :to => 'order_delivery_plans#showByOrderId'
	get 'order_products_custom/:orderId', :to => 'order_products#showProductByOrderId'
	get 'order_delivery_plan_byproductid/:order_product_id' , :to => 'order_delivery_plans#showPlanByProductId'
	get 'addRolesToUsers/:userId/:userRole' , :to => 'customs#addRoleToUser'
  get 'getUserRole/:userId' , :to => 'customs#getUserRole'
  get 'show_order_delivery_plan_process/:id' , :to => 'order_delivery_plans#show_order_delivery_plan_processes'
  put 'move_transaction/:id', :to => 'order_transactions#move_transaction'
  get 'close_order/:id', :to => 'orders#close_order'

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
