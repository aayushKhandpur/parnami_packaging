class OrderDeliveryPlanProcess < ActiveRecord::Base
  belongs_to :order
  belongs_to :order_delivery_plan
  belongs_to :order_product
  belongs_to :master_process
  belongs_to :location
  scope :include_location, -> { includes(:location) }
end
