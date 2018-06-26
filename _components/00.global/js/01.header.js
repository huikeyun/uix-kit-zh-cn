
/* 
 *************************************
 * <!-- Header Area -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.HEADER               = APP.HEADER || {};
	APP.HEADER.version       = '0.0.2';
    APP.HEADER.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		//-------- Header initialize
		headerInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				headerInit( windowWidth );
		

			}
		});
		function headerInit( w ) {
			if ( w > 768 ) $( '.header-inner.auto-height' ).css( 'height', $( '.header-area' ).outerHeight() + 'px' ); 
			
		}
		
		


		
		//-------- Sticky header area
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.header-area' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'spy-scroll-fixed' );
			} else {
				$el.removeClass( 'spy-scroll-fixed' );	
			}
			
		});

		
    };

    APP.components.documentReady.push( APP.HEADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


		