class OrderDeliveryPlan < ActiveRecord::Base
  belongs_to :order
  belongs_to :customer
  belongs_to :order_product
end
