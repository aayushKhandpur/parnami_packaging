class CreateOrderProducts < ActiveRecord::Migration
  def change
    create_table :order_products do |t|
      t.references :master_product, index: true, foreign_key: true, null: false
      t.references :order, index: true, foreign_key: true, null: false
	  t.decimal :side
	  t.decimal :length
	  t.decimal :breadth
	  t.decimal :price
      t.string :color
	  t.string :price_type
	  t.string :lamination_type
      t.string :gsm
      t.string :font_pattern
      t.string :side_fabric_color
      t.boolean :lamination, null: false, default: false
      t.integer :quantity, null: false
	  t.string :master_process_name

      t.timestamps null: false
    end
  end
end
