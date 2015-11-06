class MasterProcessesController < ApplicationController

      def index
        @processes = MasterProcess.all
      end
	  
	  def show
        @process = MasterProcess.find(params[:id])
      end

      def create
        @master_process = MasterProcess.new(master_process_params)
        if !@master_process.valid?
          render json: {errors: master_process.errors.full_messages}, status: 400
        end
        @master_process.save
      end

      def update
        @master_process = MasterProcess.find(params[:id])
        @master_process.update_attributes(master_process_params)
      end

      def destroy
        @master_process = MasterProcess.find(params[:id])
        @master_process.destroy
        render json: {deleted: true}, status: 200
      end

      private

      def master_process_params
        params.permit(:name, :description)
      end
end
