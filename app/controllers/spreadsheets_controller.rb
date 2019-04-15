class SpreadsheetsController < ApplicationController
  before_action :logged_in, defaults: { format: :json }

  def index
  	@spreadsheets = current_user.get_spreadsheets

    spreadsheets_json = @spreadsheets.as_json(include: [:data])
    spreadsheets_json.each do |spreadsheet|
      spreadsheet['data_attributes'] = spreadsheet.delete('data')
    end


    respond_to do |format|
      format.json{render json: spreadsheets_json.to_json }
    end
  end

  def create
    params_json = spreadsheet_params.to_json
    @spreadsheet = current_user.spreadsheets.new.from_json(params_json)

    if @spreadsheet.save

      spreadsheet_json = @spreadsheet.as_json(include: [:data])
      spreadsheet_json['data_attributes'] = spreadsheet_json.delete('data')

      respond_to do |format|
        format.json { render json: spreadsheet_json, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @spreadsheet.errors.full_messages, status: :bad_request }
      end
    end
  end

  def destroy
  	@spreadsheet = Spreadsheet.find(params[:id])

  	if @spreadsheet
  		@spreadsheet.destroy
      respond_to do |format|
        format.json { render json: @spreadsheet, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: 'Spreadsheet does not exist', status: :bad_request }
      end
  	end
  end

  protected

  def spreadsheet_params
    params.require(:spreadsheet).permit(:user_id, :fileName, data_attributes: [:coin, :transactionType, :quantity, :fee, :price, :date, :feeType])
  end
end
