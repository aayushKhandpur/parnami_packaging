class OrderDeliveryPlan < ActiveRecord::Base
  belongs_to :order
  belongs_to :customer
  belongs_to :order_product
  has_many :order_delivery_plan_processes
  has_many :order_transactions
end
