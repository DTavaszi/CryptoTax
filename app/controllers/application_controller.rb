class ApplicationController < ActionController::Base
  #protect_from_forgery with: :exception

  def logged_in
    unless current_user
      respond_to do |format|
        format.json { render json: { message: "Must be logged in" }, status: :unauthorized }
      end
    end
  end
end
