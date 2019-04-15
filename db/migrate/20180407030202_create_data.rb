class CreateData < ActiveRecord::Migration[5.1]
  def change
    create_table :data do |t|
      t.references :spreadsheet
      t.string :coin
      t.integer :transactionType
      t.string :quantity
      t.string :fee
      t.string :price
      t.datetime :date

      t.timestamps
    end
  end
end
