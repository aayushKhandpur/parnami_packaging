$(document).ready(function(){
    $(function () {
		$("#datetimepicker1").datepicker({
				orientation:"top",
				autoclose:true,
				format:"yyyy/mm/dd"
		});
		$('ul.nav-tabs li a').click(function (e) {
			$('ul.nav-tabs li.active').removeClass('active');
			$(this).parent('li').addClass('active');
		});
		$(".select2").select2({
			
		});
	});			
});