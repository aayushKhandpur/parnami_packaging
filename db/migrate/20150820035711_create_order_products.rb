class CreateOrderProducts < ActiveRecord::Migration
  def change
    create_table :order_products do |t|
      t.references :master_product, index: true, foreign_key: true, null: false
      t.references :order, index: true, foreign_key: true, null: false
      t.string :size
      t.string :color
      t.string :print_type
      t.string :ink_color
      t.string :gsm
      t.string :print_scheme
      t.string :font_pattern
      t.string :side_fabric_color
      t.string :dori_color
      t.boolean :lamination, null: false, default: false
      t.boolean :is_chain, null: false, default: false
      t.boolean :is_dori, null: false, default: false
      t.boolean :is_velcrow, null: false, default: false
      t.boolean :is_tape, null: false, default: false
      t.decimal :price_per_piece, null: false
      t.decimal :price_per_kg, null: false
      t.integer :quantity, null: false

      t.timestamps null: false
    end
  end
end
