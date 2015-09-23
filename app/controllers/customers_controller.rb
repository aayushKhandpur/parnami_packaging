class CustomersController < ApplicationController

  def index
    customers = Customer.all
    if params[:search_name].present?
      customers = customers.where("name like ?", "#{params[:search_name]}%")
    end
    if params[:mobile_number].present?
      customers = customers.where("mobile_number like ?", "#{params[:mobile_number]}%")
    end
  end

  def show
    @customer = Customer.find(params[:id])
  end

  def create
    @customer = Customer.new(customer_params)
    if !@customer.valid?
      render json: {errors: customer.errors.full_messages}, status: 400
    end
    @customer.save
  end

  def update
    @customer = Customer.find(params[:id])
    @customer.update_attributes(customer_params)
  end

  def destroy
    @customer = Customer.find(params[:id])
    @customer.destroy
    render json: {deleted: true}, status: 200
  end

  private

  def customer_params
    params.permit(:name, :email_id, :mobile_number, :landline_number, :billing_name, :billing_address)
  end
end
