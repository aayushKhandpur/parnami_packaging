class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :customer, index: true, foreign_key: true, null: false
      t.date :order_date, null: false, index: true
      t.date :delivery_date, null: false, index: true
      t.text :delivery_address, null: false
      t.text :order_details
      t.decimal :order_price, null: false

      t.timestamps null: false
    end
  end
end
