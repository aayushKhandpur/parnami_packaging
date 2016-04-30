class OrderTransactionsController < ApplicationController

  def index
    @order_transactions = OrderTransaction.all
    if params[:order_id].present?
      @order_transactions = order_transactions.where(order_id: params[:order_id])
    end
    if params[:order_product_id].present?
      @order_transactions = order_transactions.where(order_product_id: params[:order_product_id])
    end
    if params[:master_product_id].present?
      @order_transactions = order_transactions.where(master_product_id: params[:master_product_id])
    end
    if params[:order_delivery_plan_process_id].present?
      @order_transactions = order_transactions.where(order_delivery_plan_process_id: params[:order_delivery_plan_process_id])
    end
  end

  def show
    @order_transaction = OrderTransaction.find(params[:id])
  end

  def create
    @order_transaction = OrderTransaction.new(order_transaction_params)
    if !@order_transaction.valid?
      render json: {errors: order_transaction.errors.full_messages}, status: 400
    end
    @order_transaction.save
  end

  def update
    @order_transaction = OrderTransaction.find(params[:id])
    @order_transaction.update_attributes(order_transaction_params)
  end

  def destroy
    @order_transaction = OrderTransaction.find(params[:id])
    @order_transaction.destroy
    render json: {deleted: true}, status: 200
  end

  private

  def order_transaction_params
    params.permit(:order_id, :order_product_id, :master_product_id, :order_delivery_plan_id, :lName, :order_delivery_plan_process_id, :process_end_date, :process_start_date, :quantity_waste, :quantity_recieved, :quantity_transfered, :quantity_forwarded, :status)
  end
end
