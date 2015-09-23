class OrdersController < ApplicationController

  def index
    orders = Order.all
    if params[:customer_id].present?
      orders = orders.where(customer_id: params[:customer_id])
    end
  end

  def show
    @order = Order.find(params[:id])
  end

  def create
    @order = Order.new(order_params)
    if !@order.valid?
      render json: {errors: order.errors.full_messages}, status: 400
    end
    @order.save
  end

  def update
    @order = Order.find(params[:id])
    @order.update_attributes(order_params)
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render json: {deleted: true}, status: 200
  end

  private

  def order_params
    params.permit(:customer_id, :order_date, :delivery_date, :delivery_address, :order_details, :order_price)
  end
end
