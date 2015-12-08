class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.string :email_id
      t.string :mobile_number, null: false, index: true
      t.string :landline_number
      t.string :billing_name
      t.text :billing_address
	  t.text :alternate_number
	  t.text :office_number

      t.timestamps null: false
    end
  end
end
