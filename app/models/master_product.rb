class MasterProduct < ActiveRecord::Base
  validates :name, presence: true
end
