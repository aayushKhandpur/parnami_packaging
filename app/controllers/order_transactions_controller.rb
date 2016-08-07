require 'date'
class OrderTransactionsController < ApplicationController

  def index
    @order_transactions = OrderTransaction.all.order(:process_start_date)
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
    @order_transaction = OrderTransaction.where(order_id: params[:id])
  end

  def create
    @order_transaction = OrderTransaction.new(order_transaction_params)
    if !@order_transaction.valid?
      render json: {errors: @order_transaction.errors.full_messages}, status: 400
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

  def move_transaction
    order_transaction = OrderTransaction.find(params[:id])
    order_transaction.update_attributes(order_transaction_params)
    if order_transaction_params[:quantity_transfered] != 0
        new_order_transaction = OrderTransaction.new(order_transaction_params)
        new_order_transaction.quantity_recieved = order_transaction_params[:quantity_transfered];
        new_order_transaction.quantity_waste = 0;
        new_order_transaction.quantity_forwarded = 0;
        new_order_transaction.status = "In Process";
        new_order_transaction.quantity_transfered = 0;
        new_order_transaction.process_start_date = Time.now.strftime("%d/%m/%Y %H:%M");
        new_order_transaction.process_end_date = nil;
        new_order_transaction.save
    end
    destination_step_id = self.get_next_process_id
    process = OrderDeliveryPlanProcess.find(order_transaction_params[:order_delivery_plan_process_id])
    if destination_step_id.present? && destination_step_id != order_transaction_params[:order_delivery_plan_process_id] && !process.is_last_step
      next_order_transaction = OrderTransaction.new(order_transaction_params)
      next_order_transaction.order_delivery_plan_process_id = destination_step_id;
      next_order_transaction.quantity_recieved = order_transaction_params[:quantity_forwarded]
      next_order_transaction.quantity_forwarded = 0
      next_order_transaction.quantity_waste = 0;
      next_order_transaction.quantity_transfered = 0;
      next_order_transaction.status = "In Process";
      location = OrderDeliveryPlanProcess.find(destination_step_id).location.name
      next_order_transaction.lName = location
      next_order_transaction.process_start_date = Time.now.strftime("%d/%m/%Y %H:%M");
      next_order_transaction.process_end_date = nil;
      next_order_transaction.save
    end
    @order_transaction = OrderTransaction.where(order_id: order_transaction_params[:order_id])
  end

  def get_next_process_id
    @currentProcess = OrderDeliveryPlanProcess.find(params[ :order_delivery_plan_process_id])
    next_step = OrderDeliveryPlanProcess.where(order_id: order_transaction_params[:order_id],order_delivery_plan_id: order_transaction_params[:order_delivery_plan_id], sequence_number: (@currentProcess.sequence_number + 1)).first
    return next_step.id if next_step.present?
    return OrderDeliveryPlanProcess.where(order_id: order_transaction_params[:order_id],order_delivery_plan_id: order_transaction_params[:order_delivery_plan_id]).last.id
  end

  private

  def order_transaction_params
    params.permit(:order_id, :order_product_id, :master_product_id, :order_delivery_plan_id, :lName, :order_delivery_plan_process_id, :process_end_date, :process_start_date, :quantity_waste, :quantity_recieved, :quantity_transfered, :quantity_forwarded, :status)
  end
end
