class MasterProduct < ActiveRecord::Base
  validates :name, presence: true
  validates_uniqueness_of :name
  before_create :uppercase_stuff


 private
   def uppercase_stuff
     self.name.upcase!
  end
end
