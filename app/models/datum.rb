class Datum < ApplicationRecord
  enum transactionType: [:BUY, :SELL]
  enum feeType: [:COIN, :VALUE]
  belongs_to :spreadsheet

  def owned_by?(user)
    spreadsheet.user == user
  end
end
