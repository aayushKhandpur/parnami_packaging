class VendorsController < ApplicationController
  def index
      @vendors = Vendor.all
    end
	
	def show
		@vendor = Vendor.find(params[:id])
	end

    def create
      @vendor = Vendor.new(vendor_params)
      if !@vendor.valid?
        render json: {errors: location.errors.full_messages}, status: 400
      end
      @vendor.save
    end

    def update
      @vendor = Vendor.find(params[:id])
      @vendor.update_attributes(vendor_params)
    end

    def destroy
      @vendor = Vendor.find(params[:id])
      @vendor.destroy
      render json: {deleted: true}, status: 200
    end

    private

    def vendor_params
      params.permit(:name)
    end
end
