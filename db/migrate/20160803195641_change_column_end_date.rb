class ChangeColumnEndDate < ActiveRecord::Migration
  def change
    change_column_null :order_transactions, :process_end_date, true
  end
end
