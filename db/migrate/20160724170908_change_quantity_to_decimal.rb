class ChangeQuantityToDecimal < ActiveRecord::Migration
  def self.up
     change_column :order_products, :quantity, :decimal,:precision => 16, :scale => 2
     change_column :order_products, :price, :decimal,:precision => 16, :scale => 2
  end
    def self.down
     change_column :order_products, :quantity, :integer
     change_column :order_products, :price, :integer
    end
end
