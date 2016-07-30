class AddColumnToOrderDeliveryPlan < ActiveRecord::Migration
  def change
    add_column :order_delivery_plans, :is_transaction_initiated, :boolean, null: false, default: false
  end
end
