$(document).ready(function(){
	$(function () {
		$(".orderdatepicker").datepicker({
				orientation:"top",
				autoclose:true,
				format:"yyyy/mm/dd",
				startDate:'0'
		});
		$('ul.nav-tabs li a').click(function (e) {
			$('ul.nav-tabs li.active').removeClass('active');
			$(this).parent('li').addClass('active');
		});
		$('.select2').select2({
			placeholder: "Select a Customer",
			allowClear: true
		});
		$('[data-toggle="tooltip"]').tooltip(); 

	});			

});
    