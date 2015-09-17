class CreateOrderDeliveryPlans < ActiveRecord::Migration
  def change
    create_table :order_delivery_plans do |t|
      t.references :order, index: true, foreign_key: true, null: false
      t.references :customer, index: true, foreign_key: true, null: false
      t.date :delivery_date, null: false, index: true
      t.references :order_product, index: true, foreign_key: true, null: false
      t.integer :quantity, null: false

      t.timestamps null: false
    end
  end
end
