class ChangeColumnInCustomer < ActiveRecord::Migration
  def change
    Customer.update_all( {billing_name: 'Parnami Packaging'})
    change_column_null  :customers, :billing_name, false
  end
end
