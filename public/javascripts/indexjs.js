$(function () {
	
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Expand this branch');
	var parent1 = $('.tree li.parent_li > span');
	var children1 = parent1.parent('li.parent_li').find(' > ul > li');
	children1.hide('fast');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
			$(this).attr('title', 'Expand this branch').find(' > i').toggleClass('fa-minus-circle fa-plus-circle');
        } else {
            children.show('fast');
            //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
			$(this).attr('title', 'Expand this branch').find(' > i').toggleClass('fa-minus-circle fa-plus-circle');
        }
        e.stopPropagation();
    });
});