require 'ostruct'
class CustomsController < ApplicationController

 def addRoleToUser
	@user = User.find(params[:userId])
	@user.add_role params[:userRole]
  @user.save
 end

 def getUserRole
   @user_role = OpenStruct.new
   @user_role.role = 'Guest'
   user = User.find(params[:userId])
   roles = Role.where.not('id' => nil)
   roles.each do |uRole|
     roleName = uRole.name
     if user.has_role? roleName
       @user_role.role = uRole
     end
   end
 end

end
