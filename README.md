ihelp
=====

jQuery library for providing tooltip overlays to aid user interaction

Examples
--------

http://gkwelding.github.com/ihelp/regularTour.html

http://gkwelding.github.com/ihelp/autoTour.html

http://gkwelding.github.com/ihelp/withoutOverlay.html

http://gkwelding.github.com/ihelp/withoutStartButtonHide.html

Usage
-----

	// simple usage
	var config = [
		{
			"name" 		: "tour_1",
			"bgcolor"	: "black",
			"color"		: "white",
			"position"	: "TL",
			"text"		: "You can create a tour to explain the functioning of your app",
			"time" 		: 5000
		},
		{
			"name" 		: "tour_2",
			"bgcolor"	: "black",
			"color"		: "white",
			"text"		: "Give a class to the points of your walkthrough",
			"position"	: "BL",
			"time" 		: 5000
		}
	];
	
	$('#target').ihelp().addDefaultSteps(config):

To have the "tour" autplay do the following.

	$('#target').ihelp({autoplay:true}).addDefaultSteps(config);

Each "tour" element has the following options:

	name:		the class given to the element where you want the tooltip to appear
	bgcolor:	the background color of the tooltip
	color:		the color of the tooltip text
	text:		the text inside the tooltip
	time:		if automatic tour, then this is the time in ms for this options.step
	position:	the position of the tip. Possible values are:
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

Copyright
----------

The initial library and structure was borrowed from a resource I can't remember the name of nor locate again in the vast reaches of the internet. If anyone knows the original author whom i've so shamelessly ripped off then please let me know so i can give propert credit here. Work here is relesed under Phil Sturgeons DBAD license. http://philsturgeon.co.uk/code/dbad-license. Just give me some goddam credit if you use it and don't be a dick.