class Location < ActiveRecord::Base
  validates :name, presence: true
  validates_uniqueness_of :name
  before_create :uppercase_stuff
  before_update :uppercase_stuff
  has_many :order_delivery_plan_processes

 private
   def uppercase_stuff
     self.name.upcase!
  end
end
