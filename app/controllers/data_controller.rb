class DataController < ApplicationController
  def destroy
    @data = Datum.find(params[:id])

    if @data
      if @data.owned_by?(current_user)
        @data.destroy
        respond_to do |format|
          format.json { render json: @data, status: :ok }
        end
      else
        respond_to do |format|
          format.json { render json: 'Data does not belong to this user', status: :bad_request }
        end
      end
    else
      respond_to do |format|
        format.json { render json: 'Data does not exist', status: :bad_request }
      end
    end
  end

  protected

  def data_params
    params.require(:data).permit(:id)
  end
end
