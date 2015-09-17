class CreateMasterProducts < ActiveRecord::Migration
  def change
    create_table :master_products do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
