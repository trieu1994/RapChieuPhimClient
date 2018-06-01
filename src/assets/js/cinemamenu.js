$(function() {
    var items = $('.cinemacontainer');
	var cinemacontainer = $('.cinemacontainer');
    var cimenucontent = $('.overlapblackbg');
	
	var menuopen = function() {
	$(items).addClass('cioffcanvasopener');
						}
	var menuclose = function() { 
	$(items).removeClass('cioffcanvasopener');
	}

	$('#cinavtoggle').click(function(){
		if (cinemacontainer.hasClass('cioffcanvasopener')) {$(menuclose)}
		else {$(menuopen)}
	});
	cimenucontent.click(function(){
		if (cinemacontainer.hasClass('cioffcanvasopener')) {$(menuclose)}
	});
	
	$('#cinavtoggle,.overlapblackbg').on('click', function(){
	$('.cinemacontainer').toggleClass( "cioffcanvasopener" );
	});

	$('.cimenu-list li').has('.cimenu-submenu, .cimenu-submenu-sub, .cimenu-submenu-sub-sub').prepend('<span class="cimenu-click"><i class="cimenu-arrow fa fa-angle-down"></i></span>');
	
	//$('.cimenu-list li').has('.halfdiv').prepend('<span class="cimenu-click"><i class="cimenu-arrow"></i></span>');
	
	$('.cimenu-list li').has('.megamenu').prepend('<span class="cimenu-click"><i class="cimenu-arrow fa fa-angle-down"></i></span>');
		
	$('.cimenu-mobile').click(function(){
		$('.cimenu-list').slideToggle('slow');
	});
	$('.cimenu-click').click(function(){
	$(this).siblings('.cimenu-submenu').slideToggle('slow');
	$(this).children('.cimenu-arrow').toggleClass('cimenu-rotate');
	$(this).siblings('.cimenu-submenu-sub').slideToggle('slow');
	$(this).siblings('.cimenu-submenu-sub-sub').slideToggle('slow');
	$(this).siblings('.megamenu').slideToggle('slow');
		
	});

});



