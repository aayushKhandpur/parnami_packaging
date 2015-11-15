class OrderDeliveryPlansController < ApplicationController

    def index
      @order_delivery_plans = OrderDeliveryPlan.all
      if params[:customer_id].present?
        @order_delivery_plans = order_delivery_plans.where(customer_id: params[:customer_id])
      end
      if params[:order_id].present?
        @order_delivery_plans = order_delivery_plans.where(order_id: params[:order_id])
      end
      if params[:order_product_id].present?
        @order_delivery_plans = order_delivery_plans.where(order_product_id: params[:order_product_id])
      end
    end
	
	def showByOrderId
		@order_delivery_plans = OrderDeliveryPlan.all.where(order_id: params[:orderId])
	end
	
	def showPlanByProductId
		@order_delivery_plans = OrderDeliveryPlan.all.where(order_product_id: params[:order_product_id])
	end

    def show
      @order_delivery_plan = OrderDeliveryPlan.find(params[:id])
    end

    def create
      @order_delivery_plan = OrderDeliveryPlan.new(order_delivery_plan_params)
      if !@order_delivery_plan.valid?
        render json: {errors: order_delivery_plan.errors.full_messages}, status: 400
      end
      @order_delivery_plan.save
    end

    def update
      @order_delivery_plan = OrderDeliveryPlan.find(params[:id])
      @order_delivery_plan.update_attributes(order_delivery_plan_params)
    end

    def destroy
      @order_delivery_plan = OrderDeliveryPlan.find(params[:id])
      @order_delivery_plan.destroy
      render json: {deleted: true}, status: 200
    end

    private

    def order_delivery_plan_params
      params.permit(:customer_id, :order_id, :order_product_id, :delivery_date, :quantity)
    end
end
