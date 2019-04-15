class Spreadsheet < ApplicationRecord
	belongs_to :user
	has_many :data
	accepts_nested_attributes_for :data
end
