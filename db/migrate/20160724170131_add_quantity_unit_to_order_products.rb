class AddQuantityUnitToOrderProducts < ActiveRecord::Migration
  def change
    add_column :order_products, :quantity_unit, :string
  end
end
