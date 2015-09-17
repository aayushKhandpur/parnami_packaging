class AddLocationIdToOrderDeliveryPlanProcesses < ActiveRecord::Migration
  def change
    add_column :order_delivery_plan_processes, :location_id, :integer, null: false
  end
end
