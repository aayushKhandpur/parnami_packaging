$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Expand this branch');
	var parent1 = $('.tree li.parent_li > span');
	var children1 = parent1.parent('li.parent_li').find(' > ul > li');
	children1.hide('fast');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > a > i').toggleClass('glyphicon-minus glyphicon-plus');
        } else {
            children.show('fast');
            //$(this).attr('title', 'Collapse this branch').find(' > a > i').addClass('glyphicon glyphicon-minus').removeClass('glyphicon glyphicon-plus');
			$(this).attr('title', 'Collaspe this branch').find(' > a > i').toggleClass('glyphicon-minus glyphicon-plus');
        }
        e.stopPropagation();
    });
});