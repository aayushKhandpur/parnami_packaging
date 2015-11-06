class LocationsController < ApplicationController

    def index
      @locations = Location.all
    end
	
	def show
		@location = Location.find(params[:id])
	end

    def create
      @location = Location.new(location_params)
      if !@location.valid?
        render json: {errors: location.errors.full_messages}, status: 400
      end
      @location.save
    end

    def update
      @location = Location.find(params[:id])
      @location.update_attributes(location_params)
    end

    def destroy
      @location = Location.find(params[:id])
      @location.destroy
      render json: {deleted: true}, status: 200
    end

    private

    def location_params
      params.permit(:name)
    end
end
