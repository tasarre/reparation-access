"use strict";

	var btnClose = document.getElementById( 'btn-close-modal' );
	var underDialog = document.getElementById( 'screen' );
	var block = document.getElementById( 'modal-content' );
	var btnOpen = document.getElementById( 'modal-btn' );
	var focusPrevious = focusPrev( block );

	btnOpen.addEventListener( 'click', function(){	
		//open/close
		block.classList.add( 'is-visible' );
		underDialog.setAttribute( 'aria-hidden', 'true' );
		btnClose.focus();
		//trapping focus
		document.addEventListener( 'focus', focusIn, true );
		//pas de click en dehors de la dialogModal
		document.addEventListener( 'click', clikIn, true );
		//fermeture via escape
		document.addEventListener( 'keydown', function( event) {
			if ( event.keyCode === 27) endFunction();
		}, false);
		//bouton de fermeture
		btnClose.addEventListener( 'click', endFunction	, false );
		//Tabulation circulaire
		document.addEventListener( 'keyup', function( event) {		
			var curEle = document.activeElement;
			if( curEle === block ){
				if( event.shiftKey && event.keyCode === 9 )	{
					focusPrevious.focus(); 
				}
				event.stopPropagation();
			}
		}, false);
	}, false );

	function focusPrev( dialogModal){
		var elementActive = dialogModal.getElementsByTagName( '*' );
		for( var i = 0, len = elementActive.length; i < len; i++ ){
			if( elementActive[i].tabIndex >= '0' ){
				focusPrevious = elementActive[i];
			}
		};
		return focusPrevious;
	}

	function focusIn( event ) {
		if( !block.contains( event.target ) ) {
			block.focus();		
		}
	};

	function clikIn( event ){
		if( !block.contains( event.target ) ) {
			event.stopPropagation();
			event.preventDefault();
		}	
	};

	function endFunction(){		
		block.classList.remove( 'is-visible' );
		underDialog.removeAttribute( 'aria-hidden' );
		btnOpen.focus();
		document.removeEventListener( 'focus', focusIn, true );
		document.removeEventListener( 'click', clikIn, true );
	};
