
/* 
 *************************************
 * <!-- Advanced Content Slider -->
 *************************************
 */
/**
 * APP.ADVANCED_CONTENT_SLIDER
 * @global
 * @requires ./examples/assets/js/min/hammer.min.js
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ADVANCED_CONTENT_SLIDER               = APP.ADVANCED_CONTENT_SLIDER || {};
	APP.ADVANCED_CONTENT_SLIDER.version       = '0.0.3';
    APP.ADVANCED_CONTENT_SLIDER.documentReady = function( $ ) {

		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			animDuration              = 1200;
		
		
		
		sliderInit();
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				sliderInit();
				
			}
		});
		
		
		/*
		 * Initialize slideshow
		 *
		 * @return {Void}
		 */
        function sliderInit() {
			
			$( '.uix-advanced-content-slider' ).each( function() {
				var $this                      = $( this ),
					$items                     = $this.find( '.uix-advanced-content-slider__item' ),
					$itemsWrapper              = $this.children( '.uix-advanced-content-slider__inner' ),
					$first                     = $items.first(),
					itemWidth                  = $this.width(),
					itemsTotal                 = $items.length,
					totalWidth                 = itemWidth*itemsTotal,
					dataControlsPagination     = $this.data( 'controls-pagination' ),
					dataControlsArrows         = $this.data( 'controls-arrows' ),
					dataDraggable              = $this.data( 'draggable' ),
					dataDraggableCursor        = $this.data( 'draggable-cursor' ),
					dataControlsPaginationAuto = false;

				
				//Autoplay times
				var playTimes;
				//A function called "timer" once every second (like a digital watch).
				$this[0].animatedSlides;
				
				

				if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-content-slider-sp-pagination';
				if ( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-content-slider-sp-arrows';
				if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
				if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
				
				if ( $( dataControlsPagination ).html().length == 0 ) dataControlsPaginationAuto = true;

				

				//Initialize the width of each item
				//-------------------------------------		
				$first.addClass( 'active' );
				
				$items.css( 'width', itemWidth + 'px' );
				
				TweenMax.set( $itemsWrapper, { 
					width: totalWidth,
					onComplete  : function() {
						$this.css( 'height', 'auto' );
						
					}
				} );	
				

				//Pagination dots 
				//-------------------------------------	
				if ( dataControlsPaginationAuto ) {
					var _dot       = '',
						_dotActive = '';
					_dot += '<ul class="uix-advanced-content-slider__pagination--default">';
					for ( var i = 0; i < itemsTotal; i++ ) {

						_dotActive = ( i == 0 ) ? 'class="active"' : '';

						_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
					}
					_dot += '</ul>';

					if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );	
				} else {
					$( dataControlsPagination ).find( 'li' ).first().find( 'a' ).addClass( 'active' );
					$( dataControlsPagination ).find( 'li' ).first().addClass( 'active' );
				}


				$( dataControlsPagination ).find( 'li a' ).on( 'click', function( e ) {
					e.preventDefault();

					if ( !$( this ).hasClass( 'active' ) ) {
						
						sliderUpdates( $( this ).attr( 'data-index' ), $this, dataControlsArrows, dataControlsPagination );
						
						//Pause the auto play event
					    clearInterval( $this[0].animatedSlides );	
						
						
					}
					



				});

				
				//Next/Prev buttons
				//-------------------------------------		
				var _prev = $( dataControlsArrows ).find( '.uix-advanced-content-slider__arrows--prev' ),
					_next = $( dataControlsArrows ).find( '.uix-advanced-content-slider__arrows--next' );
				
				

				$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );
				
				_prev.addClass( 'is-disabled' );

				_prev.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );
					
					//Pause the auto play event
					clearInterval( $this[0].animatedSlides );	
					

				});

				_next.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );
					
					//Pause the auto play event
					clearInterval( $this[0].animatedSlides );	

				});
				
				
				//Drag and Drop
				//-------------------------------------	
				var $dragDropTrigger = $this,
					hammerProps      = {};

				//Make the cursor a move icon when a user hovers over an item
				if ( dataDraggable && dataDraggableCursor != '' && dataDraggableCursor != false ) $dragDropTrigger.css( 'cursor', dataDraggableCursor );
				
				if ( !dataDraggable ) {
					hammerProps = {
						inputClass: Hammer.TouchInput
					};
				}

				//Mouse event
				//Hammer.js pan event only for touch devices and not for desktop computer Click+Drag
				var direction,
					dragDropElement = $dragDropTrigger[0],
					dragDropMC      = new Hammer( dragDropElement, hammerProps );
				
				dragDropMC.on( 'panright press panleft', function( ev ) {

					//Set the direction in here
					direction = ev.type;
				});

				
				
				dragDropMC.on( 'panend', function( ev ) {
					
					//Use the direction in here
					//You know the pan has ended
					//and you know which action they were taking
					if ( direction == 'panleft' ) {
						sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );
						//Pause the auto play event
				    	clearInterval( $this[0].animatedSlides );	
					}
					
					if ( direction == 'panright' ) {
						sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );
						//Pause the auto play event
				    	clearInterval( $this[0].animatedSlides );	
					}			

					
				});	
				
				
				
				//Autoplay Slider
				//-------------------------------------		
				var dataAuto                 = $this.data( 'auto' ),
					dataTiming               = $this.data( 'timing' ),
					dataLoop                 = $this.data( 'loop' );

				if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
				if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
				if ( typeof dataLoop === typeof undefined ) dataLoop = false;


				if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {

					sliderAutoPlay( playTimes, dataTiming, dataLoop, $this, dataControlsArrows, dataControlsPagination );

					$this.on({
						mouseenter: function() {
							clearInterval( $this[0].animatedSlides );
						},
						mouseleave: function() {
							sliderAutoPlay( playTimes, dataTiming, dataLoop, $this, dataControlsArrows, dataControlsPagination );
						}
					});	

				}

			
			});	
			
			
		}
		
		
		/*
		 * Trigger slider autoplay
		 *
		 * @param  {Function} playTimes      - Number of times.
		 * @param  {Number} timing           - Autoplay interval.
		 * @param  {Boolean} loop            - Determine whether to loop through each item.
		 * @param  {Object} slider           - Selector of the slider .
		 * @param  {String} arrows           - Controller name of prev/next buttons.
		 * @param  {String} pagination       - Controller name of pagination buttons.
		 * @return {Void}                    - The constructor.
		 */
		function sliderAutoPlay( playTimes, timing, loop, slider, arrows, pagination ) {	

			var items = slider.find( '.uix-advanced-content-slider__item' ),
				total = items.length;
			
			slider[0].animatedSlides = setInterval( function() {

				playTimes = parseFloat( items.filter( '.active' ).index() );
				playTimes++;


				if ( !loop ) {
					if ( playTimes < total && playTimes >= 0 ) {

						var slideNextId = playTimes;	

						sliderUpdates( slideNextId, slider, arrows, pagination );
					}
				} else {
					if ( playTimes == total ) playTimes = 0;
					if ( playTimes < 0 ) playTimes = total-1;		

					var slideNextId = playTimes;	


					//Prevent problems with styles when switching in positive order
					sliderUpdates( slideNextId, slider, arrows, pagination );	

				}



			}, timing );	
		}

		
		
		
		/*
		 * Transition Between Slides
		 *
		 * @param  {Number} elementIndex     - Index of current slider.
		 * @param  {Object} slider           - Selector of the slider .
		 * @param  {String} arrows           - Controller name of prev/next buttons.
		 * @param  {String} pagination       - Controller name of pagination buttons.
		 * @return {Void}
		 */
        function sliderUpdates( elementIndex, slider, arrows, pagination ) {
			
			var $items        = slider.find( '.uix-advanced-content-slider__item' ),
				itemsTotal    = $items.length,
				$prev         = $( arrows ).find( '.uix-advanced-content-slider__arrows--prev' ),
				$next         = $( arrows ).find( '.uix-advanced-content-slider__arrows--next' ),
				$pagination   = $( pagination ).find( 'li a' );
			
			
			
			
			//Get the animation speed
			if ( typeof slider.data( 'speed' ) != typeof undefined && slider.data( 'speed' ) != false ) {
				animDuration = slider.data( 'speed' );
			}

			
				
			if ( elementIndex <= itemsTotal - 1 && elementIndex >= 0 ) {

				if ( elementIndex > parseFloat( itemsTotal - 1 ) ) elementIndex = parseFloat( itemsTotal - 1 );
				if ( elementIndex < 0 ) elementIndex = 0;
				
				$next.removeClass( 'is-disabled' );
				$prev.removeClass( 'is-disabled' );
				$pagination.removeClass( 'active' );
				$pagination.parent().removeClass( 'active' );

				if ( elementIndex == itemsTotal - 1 ) {
					$next.addClass( 'is-disabled' );
				}

				if ( elementIndex == 0 ) {
					$prev.addClass( 'is-disabled' );
				}

				

				$items.removeClass( 'active' );
				$items.eq( elementIndex ).addClass( 'active' );	
				$pagination.eq( elementIndex ).addClass( 'active' );
				$pagination.eq( elementIndex ).parent().addClass( 'active' );
				
				
				
				TweenMax.to( slider.children( '.uix-advanced-content-slider__inner' ), animDuration/1000, { 
					x: '-' + ( slider.width() * elementIndex ),
					onComplete  : function() {

					},
					ease: Power3.easeOut
				} );
				
	
			}
			

			
		}
		
		
    };

    APP.components.documentReady.push( APP.ADVANCED_CONTENT_SLIDER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


