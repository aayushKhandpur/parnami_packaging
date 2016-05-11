class Customer < ActiveRecord::Base
  validates :mobile_number, presence: true
end
