class OrderDeliveryPlanProcessesController < ApplicationController

      def index
        order_delivery_plan_processes = OrderDeliveryPlanProcess.all
        if params[:master_process_id].present?
          order_delivery_plan_processes = order_delivery_plan_processes.where(master_process_id: params[:master_process_id])
        end
        if params[:order_id].present?
          order_delivery_plan_processes = order_delivery_plan_processes.where(order_id: params[:order_id])
        end
        if params[:order_product_id].present?
          order_delivery_plan_processes = order_delivery_plan_processes.where(order_product_id: params[:order_product_id])
        end
        if params[:order_delivery_plan_id].present?
          order_delivery_plan_processes = order_delivery_plan_processes.where(order_delivery_plan_id: params[:order_delivery_plan_id])
        end
      end

      def show
        @order_delivery_plan_process = OrderDeliveryPlanProcess.find(params[:id])
      end

      def create
        @order_delivery_plan_process = OrderDeliveryPlanProcess.new(order_delivery_plan_process_params)
        if !@order_delivery_plan_process.valid?
          render json: {errors: order_delivery_plan_process.errors.full_messages}, status: 400
        end
        @order_delivery_plan_process.save
      end

      def update
        @order_delivery_plan_process = OrderDeliveryPlanProcess.find(params[:id])
        @order_delivery_plan_process.update_attributes(order_delivery_plan_process_params)
      end

      def destroy
        @order_delivery_plan_process = OrderDeliveryPlanProcess.find(params[:id])
        @order_delivery_plan_process.destroy
        render json: {deleted: true}, status: 200
      end

      private

      def order_delivery_plan_process_params
        params.permit(:master_process_id, :order_id, :order_product_id, :order_delivery_plan_id, :sequence_number, :is_last_step, :is_first_step, :master_process_name)
      end
end
