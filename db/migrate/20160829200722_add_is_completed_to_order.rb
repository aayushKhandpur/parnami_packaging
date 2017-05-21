class AddIsCompletedToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :is_completed, :boolean, null: false, default: false
  end
end
