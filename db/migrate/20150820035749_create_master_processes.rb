class CreateMasterProcesses < ActiveRecord::Migration
  def change
    create_table :master_processes do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
