class Customer < ActiveRecord::Base
  validates :mobile_number, :name, presence: true
end
