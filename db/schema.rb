# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151130070337) do

  create_table "customers", force: :cascade do |t|
    t.string   "name",            limit: 255,   null: false
    t.string   "email_id",        limit: 255
    t.string   "mobile_number",   limit: 255,   null: false
    t.string   "landline_number", limit: 255
    t.string   "billing_name",    limit: 255
    t.text     "billing_address", limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "customers", ["mobile_number"], name: "index_customers_on_mobile_number", using: :btree

  create_table "locations", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "master_processes", force: :cascade do |t|
    t.string   "name",        limit: 255,   null: false
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "master_products", force: :cascade do |t|
    t.string   "name",        limit: 255,   null: false
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "order_delivery_plan_processes", force: :cascade do |t|
    t.integer  "order_id",               limit: 4,                   null: false
    t.integer  "order_delivery_plan_id", limit: 4,                   null: false
    t.integer  "order_product_id",       limit: 4,                   null: false
    t.integer  "master_process_id",      limit: 4,                   null: false
    t.string   "master_process_name",    limit: 255
    t.integer  "sequence_number",        limit: 4,                   null: false
    t.boolean  "is_first_step",          limit: 1,   default: false, null: false
    t.boolean  "is_last_step",           limit: 1,   default: false, null: false
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.integer  "location_id",            limit: 4,                   null: false
    t.integer  "vendor_id",              limit: 4
  end

  add_index "order_delivery_plan_processes", ["master_process_id"], name: "index_order_delivery_plan_processes_on_master_process_id", using: :btree
  add_index "order_delivery_plan_processes", ["order_delivery_plan_id"], name: "index_order_delivery_plan_processes_on_order_delivery_plan_id", using: :btree
  add_index "order_delivery_plan_processes", ["order_id"], name: "index_order_delivery_plan_processes_on_order_id", using: :btree
  add_index "order_delivery_plan_processes", ["order_product_id"], name: "index_order_delivery_plan_processes_on_order_product_id", using: :btree
  add_index "order_delivery_plan_processes", ["vendor_id"], name: "index_order_delivery_plan_processes_on_vendor_id", using: :btree

  create_table "order_delivery_plans", force: :cascade do |t|
    t.integer  "order_id",         limit: 4, null: false
    t.integer  "customer_id",      limit: 4, null: false
    t.date     "delivery_date",              null: false
    t.integer  "order_product_id", limit: 4, null: false
    t.integer  "quantity",         limit: 4, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "order_delivery_plans", ["customer_id"], name: "index_order_delivery_plans_on_customer_id", using: :btree
  add_index "order_delivery_plans", ["delivery_date"], name: "index_order_delivery_plans_on_delivery_date", using: :btree
  add_index "order_delivery_plans", ["order_id"], name: "index_order_delivery_plans_on_order_id", using: :btree
  add_index "order_delivery_plans", ["order_product_id"], name: "index_order_delivery_plans_on_order_product_id", using: :btree

  create_table "order_products", force: :cascade do |t|
    t.integer  "master_product_id", limit: 4,                                  null: false
    t.integer  "order_id",          limit: 4,                                  null: false
    t.string   "size",              limit: 255
    t.string   "color",             limit: 255
    t.string   "print_type",        limit: 255
    t.string   "ink_color",         limit: 255
    t.string   "gsm",               limit: 255
    t.string   "print_scheme",      limit: 255
    t.string   "font_pattern",      limit: 255
    t.string   "side_fabric_color", limit: 255
    t.string   "dori_color",        limit: 255
    t.boolean  "lamination",        limit: 1,                  default: false, null: false
    t.boolean  "is_chain",          limit: 1,                  default: false, null: false
    t.boolean  "is_dori",           limit: 1,                  default: false, null: false
    t.boolean  "is_velcrow",        limit: 1,                  default: false, null: false
    t.boolean  "is_tape",           limit: 1,                  default: false, null: false
    t.decimal  "price_per_piece",               precision: 10,                 null: false
    t.decimal  "price_per_kg",                  precision: 10,                 null: false
    t.integer  "quantity",          limit: 4,                                  null: false
    t.datetime "created_at",                                                   null: false
    t.datetime "updated_at",                                                   null: false
  end

  add_index "order_products", ["master_product_id"], name: "index_order_products_on_master_product_id", using: :btree
  add_index "order_products", ["order_id"], name: "index_order_products_on_order_id", using: :btree

  create_table "order_transactions", force: :cascade do |t|
    t.integer  "order_product_id",               limit: 4,               null: false
    t.date     "process_start_date",                                     null: false
    t.date     "process_end_date",                                       null: false
    t.integer  "order_delivery_plan_process_id", limit: 4,               null: false
    t.integer  "order_id",                       limit: 4,               null: false
    t.integer  "master_product_id",              limit: 4,               null: false
    t.integer  "quantity_recieved",              limit: 4,               null: false
    t.integer  "quantity_forwarded",             limit: 4,   default: 0, null: false
    t.integer  "quantity_transfered",            limit: 4,   default: 0, null: false
    t.integer  "quantity_waste",                 limit: 4,   default: 0, null: false
    t.string   "status",                         limit: 255,             null: false
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
  end

  add_index "order_transactions", ["master_product_id"], name: "index_order_transactions_on_master_product_id", using: :btree
  add_index "order_transactions", ["order_delivery_plan_process_id"], name: "index_order_transactions_on_order_delivery_plan_process_id", using: :btree
  add_index "order_transactions", ["order_id"], name: "index_order_transactions_on_order_id", using: :btree
  add_index "order_transactions", ["order_product_id"], name: "index_order_transactions_on_order_product_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "customer_id",      limit: 4,                    null: false
    t.date     "order_date",                                    null: false
    t.date     "delivery_date",                                 null: false
    t.text     "delivery_address", limit: 65535,                null: false
    t.text     "order_details",    limit: 65535
    t.decimal  "order_price",                    precision: 10, null: false
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
  end

  add_index "orders", ["customer_id"], name: "index_orders_on_customer_id", using: :btree
  add_index "orders", ["delivery_date"], name: "index_orders_on_delivery_date", using: :btree
  add_index "orders", ["order_date"], name: "index_orders_on_order_date", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,                null: false
    t.string   "uid",                    limit: 255,   default: "", null: false
    t.string   "encrypted_password",     limit: 255,   default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "name",                   limit: 255
    t.string   "nickname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens",                 limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  create_table "vendors", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_foreign_key "order_delivery_plan_processes", "master_processes"
  add_foreign_key "order_delivery_plan_processes", "order_delivery_plans"
  add_foreign_key "order_delivery_plan_processes", "order_products"
  add_foreign_key "order_delivery_plan_processes", "orders"
  add_foreign_key "order_delivery_plan_processes", "vendors"
  add_foreign_key "order_delivery_plans", "customers"
  add_foreign_key "order_delivery_plans", "order_products"
  add_foreign_key "order_delivery_plans", "orders"
  add_foreign_key "order_products", "master_products"
  add_foreign_key "order_products", "orders"
  add_foreign_key "order_transactions", "master_products"
  add_foreign_key "order_transactions", "order_delivery_plan_processes"
  add_foreign_key "order_transactions", "order_products"
  add_foreign_key "order_transactions", "orders"
  add_foreign_key "orders", "customers"
end
