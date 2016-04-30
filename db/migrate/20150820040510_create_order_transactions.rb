class CreateOrderTransactions < ActiveRecord::Migration
  def change
    create_table :order_transactions do |t|
      t.references :order_product, index: true, foreign_key: true, null: false
      t.date :process_start_date, null: false
      t.date :process_end_date, null: false
      t.references :order_delivery_plan_process, index: true, foreign_key: true, null: false
	  t.references :order_delivery_plan, index: true, foreign_key: true, null: false
      t.references :order, index: true, foreign_key: true, null: false
      t.references :master_product, index: true, foreign_key: true, null: false
      t.integer :quantity_recieved, null: false, dafault: 0
      t.integer :quantity_forwarded, null: false, default: 0
      t.integer :quantity_transfered, null: false, default: 0
      t.integer :quantity_waste, null: false, default: 0
      t.string :status, null: false
	  t.string :lName, null: false

      t.timestamps null: false
    end
  end
end
