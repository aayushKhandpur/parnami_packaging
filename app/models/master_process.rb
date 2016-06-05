class MasterProcess < ActiveRecord::Base
  validates :name, presence: true
end
