class CreateSpreadsheets < ActiveRecord::Migration[5.1]
  def change
    create_table :spreadsheets do |t|
      t.string :fileName
      t.references :user
      t.timestamps
    end
  end
end
