class AddFeeTypeToData < ActiveRecord::Migration[5.1]
  def change
    add_column :data, :feeType, :integer
  end
end
