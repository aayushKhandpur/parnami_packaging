class MasterProductsController < ApplicationController

    def index
      @products = MasterProduct.all
    end

    def create
      @master_products = MasterProduct.new(master_product_params)
      if !@master_products.valid?
        render json: {errors: master_products.errors.full_messages}, status: 400
      end
      @master_products.save
    end

    def update
      @master_products = MasterProduct.find(params[:id])
      @master_products.update_attributes(master_product_params)
    end

    def destroy
      @master_products = MasterProduct.find(params[:id])
      @master_products.destroy
      render json: {deleted: true}, status: 200
    end

    private

    def master_product_params
      params.permit(:name, :description)
    end
end
