class OrderTransaction < ActiveRecord::Base
  belongs_to :order_product
  belongs_to :order_delivery_plan_process
  belongs_to :order
  belongs_to :master_product
end
