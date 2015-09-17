class OrderProduct < ActiveRecord::Base
  belongs_to :master_product
  belongs_to :order
end
