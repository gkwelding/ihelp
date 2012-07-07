/*
* jquery.ihelp.js
* jQuery Inline Help Plugin
* http://www.in-the-attic.co.uk/
*
* Copyright (c) 2011 Garry Welding http://www.in-the-attic.co.uk/
* Version 1.0
* Dual licensed under the MIT and GPL licenses.
*/
(function ($) {
    $.fn.ihelp = function (options) {
		/*
		 the json config obj.
		 name: the class given to the element where you want the tooltip to appear
		 bgcolor: the background color of the tooltip
		 color: the color of the tooltip text
		 text: the text inside the tooltip
		 time: if automatic tour, then this is the time in ms for this options.step
		 position: the position of the tip. Possible values are
			TL	top left
			TR  top right
			BL  bottom left
			BR  bottom right
			LT  left top
			LB  left bottom
			RT  right top
			RB  right bottom
			T   top
			R   right
			B   bottom
			L   left

		 var config = [{
							"name"		: "tour_1",
							"bgcolor"	: "black",
							"color"		: "white",
							"position"	: "TL",
							"text"		: "You can create a tour to explain the functioning of your app",
							"time"		: 5000
						}];
			
		 $.inlineHelp.addDefaultSteps(config);
		 
		 //show the tour controls
		 $.inlineHelp.showControls();

		 we can restart or stop the tour,
		 and also navigate through the options.steps
		 options.activateTour.live('click',startTour);
		 options.cancelTour.live('click',endTour);
		 options.endTour.live('click',endTour);
		 options.restartTour.live('click',restartTour);
		 options.nextTour.live('click',nextStep);
		 options.prevTour.live('click',prevStep);
		*/		
		var obj					= $(this);
		
		this.addDefaultSteps = function (confArr) {
			if (typeof confArr === 'object') {
				config			= confArr;
				total_steps		= config.length;
			}
		};
		
		this.addStep = function (confObj) {
			if (typeof confObj === 'object') {
				config.push(confObj);
				total_steps	= config.length;
			}
		};
		
		var startTour = function () {
			if (options.autoplay) {
				options.nextTour.hide();
				options.prevTour.hide();
			}
			
			showControls();
			
			options.cancelTour.click(endTour);
			options.endTour.click(endTour);
			options.restartTour.click(restartTour);
			options.nextTour.click(nextStep);
			options.prevTour.click(prevStep);
			
			if (options.hidestart) {
				obj.hide();
			}
			
			if (!options.autoplay && total_steps > 1) {
				options.nextTour.show();
			}
			
			if (options.showoverlay) {
				showOverlay();
			}
			
			nextStep();
		};
		
		var nextStep = function () {
			if (!options.autoplay) {
				if (options.step > 0) {
					options.prevTour.show();
				} else {
					options.prevTour.hide();
				}
				if (options.step === total_steps - 1) {
					options.nextTour.hide();
				} else {
					options.nextTour.show();	
				}
			}	
			if (options.step >= total_steps) {
				//if last options.step then end tour
				endTour();
				return false;
			}
			options.step++;
			showTooltip();
		};
		
		var prevStep = function () {
			if (!options.autoplay) {
				if (options.step > 2) {
					options.prevTour.show();
				} else {
					options.prevTour.hide();
				}
				if (options.step === total_steps) {
					options.nextTour.show();
				}
			}		
			if (options.step <= 1) {
				return false;
			}
			options.step--;
			showTooltip();
		};
		
		var endTour = function () {
			options.step = 0;
			if (options.autoplay) {
				clearTimeout(SHOWTIME);
			}
			removeTooltip();
			hideControls();
			hideOverlay();
			$(obj).show();
		};
		
		var restartTour = function () {
			options.step = 0;
			if (options.autoplay) {
				clearTimeout(SHOWTIME);
			}
			nextStep();
		};
		
		var showTooltip = function () {
			//remove current tooltip
			removeTooltip();
			
			var step_config		= config[options.step - 1];
			var $elem			= $('.' + step_config.name);
			
			if (options.autoplay) {
				SHOWTIME		= setTimeout(nextStep, step_config.time);
			}
			
			var bgcolor			= step_config.bgcolor;
			var color			= step_config.color;
			
			var $tooltip		= $('<div>',{
												'id'		: 'tour_tooltip',
												'class'		: 'tooltip',
												'html'		: '<p>' + step_config.text + '</p><span class="tooltip_arrow"></span>'
											}).css({
												'display'			: 'none',
												'background-color'	: bgcolor,
												'color'				: color
											});
			
			//position the tooltip correctly:
			
			//the css properties the tooltip should have
			var properties		= {};
			
			var tip_position 	= step_config.position;
			
			//append the tooltip but hide it
			$('BODY').prepend($tooltip);
			
			//get some info of the element
			var e_w				= $elem.outerWidth();
			var e_h				= $elem.outerHeight();
			var e_l				= $elem.offset().left;
			var e_t				= $elem.offset().top;
			
			switch(tip_position){
				case 'TL'	:
					properties = {
						'left'	: e_l,
						'top'	: e_t + e_h + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TL');
					break;
				case 'TR'	:
					properties = {
						'left'	: e_l + e_w - $tooltip.width() + 'px',
						'top'	: e_t + e_h + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TR');
					break;
				case 'BL'	:
					properties = {
						'left'	: e_l + 'px',
						'top'	: e_t - $tooltip.height() + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BL');
					break;
				case 'BR'	:
					properties = {
						'left'	: e_l + e_w - $tooltip.width() + 'px',
						'top'	: e_t - $tooltip.height() + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BR');
					break;
				case 'LT'	:
					properties = {
						'left'	: e_l + e_w + 'px',
						'top'	: e_t + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LT');
					break;
				case 'LB'	:
					properties = {
						'left'	: e_l + e_w + 'px',
						'top'	: e_t + e_h - $tooltip.height() + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LB');
					break;
				case 'RT'	:
					properties = {
						'left'	: e_l - $tooltip.width() + 'px',
						'top'	: e_t + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RT');
					break;
				case 'RB'	:
					properties = {
						'left'	: e_l - $tooltip.width() + 'px',
						'top'	: e_t + e_h - $tooltip.height() + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RB');
					break;
				case 'T'	:
					properties = {
						'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
						'top'	: e_t + e_h + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_T');
					break;
				case 'R'	:
					properties = {
						'left'	: e_l - $tooltip.width() + 'px',
						'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_R');
					break;
				case 'B'	:
					properties = {
						'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
						'top'	: e_t - $tooltip.height() + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_B');
					break;
				case 'L'	:
					properties = {
						'left'	: e_l + e_w  + 'px',
						'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
					};
					$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_L');
					break;
			}
			
			
			/*
			if the element is not in the viewport
			we scroll to it before displaying the tooltip
			 */
			var w_t	= $(window).scrollTop();
			var w_b = $(window).scrollTop() + $(window).height();
			//get the boundaries of the element + tooltip
			var b_t = parseFloat(properties.top,10);
			
			if (e_t < b_t)
				b_t = e_t;
			
			var b_b = parseFloat(properties.top,10) + $tooltip.height();
			if ((e_t + e_h) > b_b)
				b_b = e_t + e_h;
				
			
			if ((b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)){
				$('html, body').stop()
				.animate({scrollTop: b_t}, 500, 'linear', function(){
					//need to reset the timeout because of the animation delay
					if (options.autoplay){
						clearTimeout(SHOWTIME);
						SHOWTIME = setTimeout(nextStep,step_config.time);
					}
					//show the new tooltip
					$tooltip.css(properties).show();
				});
			}
			else
			//show the new tooltip
				$tooltip.css(properties).show();
		};
		
		function initControls () {
			/*
			we can restart or stop the tour,
			and also navigate through the steps
			 */
			var $tourcontrols  = '<div id="tourcontrols" class="tourcontrols">';
				$tourcontrols += '<div id="tourcontrolsNav" class="nav">';
				$tourcontrols += '<span class="button" id="ihPrevStep">< Previous</span>';
				$tourcontrols += '<span class="button" id="ihNextStep">Next ></span>';
				$tourcontrols += '</div>';
				$tourcontrols += '<a id="ihRestartTour">Restart the tour</span>';
				$tourcontrols += '<a id="ihEndTour">End the tour</a>';
				$tourcontrols += '<span class="close" id="ihCancelTour"></span>';
				$tourcontrols += '</div>';
			
			$('BODY').prepend($tourcontrols);
		};
		
		function showControls () {
			$('#tourcontrols').show();
		};
		
		function hideControls () {
			$('#tourcontrols').hide();
		};
		
		var removeTooltip = function () {
			$('#tour_tooltip').remove();
		};
				
		var showOverlay = function () {
			var $overlay	= '<div id="tour_overlay" class="overlay"></div>';
			$('BODY').prepend($overlay);
		};
		
		var hideOverlay = function () {
			$('#tour_overlay').remove();
		};
		
		initControls();
		
		var total_steps			= 0;
		
		var defaults			= {};
		
		defaults.cancelTour		= $('#ihCancelTour');
		defaults.endTour		= $('#ihEndTour');
		defaults.restartTour	= $('#ihRestartTour');
		defaults.nextTour		= $('#ihNextStep');
		defaults.prevTour		= $('#ihPrevStep');
		defaults.autoplay		= false;
		defaults.showoverlay	= true;
		defaults.hidestart		= true;
		defaults.step			= 0;
		
		var options				= $.extend(defaults, options);
		
		obj.click(startTour);
		
		// support mutltiple elements
		if (this.length > 1){
			this.each(function () { $(this).ihelp(options) });
			return this;
		}
	
		return this;
	}
})(jQuery);