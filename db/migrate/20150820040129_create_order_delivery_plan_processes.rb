class CreateOrderDeliveryPlanProcesses < ActiveRecord::Migration
  def change
    create_table :order_delivery_plan_processes do |t|
      t.references :order, index: true, foreign_key: true, null: false
      t.references :order_delivery_plan, index: true, foreign_key: true, null: false
      t.references :order_product, index: true, foreign_key: true, null: false
      t.references :master_process, index: true, foreign_key: true, null: false
      t.string :master_process_name
      t.integer :sequence_number, null: false
      t.boolean :is_first_step, null: false, default: false
      t.boolean :is_last_step, null: false, default: false
	  t.string :vendor_name
      t.timestamps null: false
    end
  end
end
