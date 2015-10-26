class OrderProductsController < ApplicationController

  before_action :set_order

    def index
      @order_products = @order.order_products.all
      if params[:master_product_id].present?
        @order_products = order_products.where(master_product_id: params[:master_product_id])
      end
    end

    def show
      @order_product = OrderProduct.find(params[:id])
    end

    def create
      @order_product = @order.order_products.new(order_product_params)
      if !@order_product.valid?
        render json: {errors: order_product.errors.full_messages}, status: 400
      end
      @order_product.save
    end

    def update
      @order_product = OrderProduct.find(params[:id])
      @order_product.update_attributes(order_product_params)
    end

    def destroy
      @order_product = OrderProduct.find(params[:id])
      @order_product.destroy
      render json: {deleted: true}, status: 200
    end

    private

    def order_product_params
      params.permit(:master_product_id, :order_id, :size, :color, :print_type, :print_scheme, :ink_color, :gsm, :is_velcrow, :is_dori, :is_chain, :is_tape, :lamination, :font_pattern, :side_fabric_color, :dori_color, :price_per_kg, :price_per_piece, :quantity)
    end

    def set_order
      @order = Order.find params[:order_id]
    end
end
