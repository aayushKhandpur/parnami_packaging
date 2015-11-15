class AddVendorRefToOrderDeliveryPlanProcess < ActiveRecord::Migration
  def change
    add_reference :order_delivery_plan_processes, :vendor, index: true, foreign_key: true
  end
end
