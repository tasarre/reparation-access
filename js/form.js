"use strict";

	var sendBtn = document.getElementById( 'sendBtn' );
	var myForm = document.getElementById( 'form-sondage' );
	var errormsg;

	sendBtn.addEventListener( 'click', function( event ) {

		var nom = document.getElementById( 'nom' );
		var email = document.getElementById( 'email' );
		
		var successmessage = document.getElementById( 'msg-ok');
		var arrayInput = [nom, email];

		deleteErrors();

		if (!nom.value || !email.value || !isEmail(email.value)) {
			if ( !nom.value ) {
				errors( nom, 'required-name', 'Le champ ' + nom.name + ' est obligatoire');
			} else if (nom.value) {
				var node = document.getElementById('required-name');
				if (node) {
					node.parentNode.removeChild( node );
					errormsg = '';
				}
			}

			if (!email.value || !isEmail( email.value)) {
				errors(email, 'required-email', 'Saisissez une adresse email valide (exemple : john.smith@gmail.com)');
			} else {
				var node = document.getElementById('required-email');
				if( node ) {
					node.parentNode.removeChild( node );
					errormsg = '';
				}
			}

			if(( !nom.value ) && ( !email.value ) ) {
				errormsg = nom;
			}
			else if(( !nom.value ) && ( email.value ) ) {
				errormsg = nom;
			}
			else if((!nom.value ) && ( !isEmail( email.value) ) ) {
				errormsg = nom;
			}
			else if((nom.value ) && ( !email.value ) ) {
				errormsg = email;
			}
			else if((nom.value ) && ( !isEmail( email.value) ) ) {
				errormsg = email;
			}
			// TODO : rendu correct des erreurs : ex avec un focus sur la liste des erreurs en un endroit commun en SR-only
			errormsg.focus();

		}
		//Envois avec succès
		else{
			var success = document.createElement( 'p' );
			var successText = document.createTextNode( 'Votre vote a été envoyé ! Merci pour votre temps.' );
			success.appendChild( successText );
			success.setAttribute( 'class','success' );
			success.classList.add('a42-bgcolor-success');
			success.setAttribute( 'id','msg-success' );
			successmessage.appendChild( success );
			myForm.remove();
			//reset
			nom.value = '';
			email.value = '';
			Element.prototype.documentOffsetTop = function () {
				return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
			};

			var top = document.getElementById( 'msg-ok' ).documentOffsetTop() - ( window.innerHeight / 2 );
			window.scrollTo( 0, top );
			document.getElementById( 'msg-ok' ).focus();
		}
		function errors( obj, label, text ){
			var text = document.createTextNode( text );
			var required = document.createElement( 'span' );
			var span = document.createElement( 'span' );			
			var parent = obj.parentNode;
			required.appendChild( span );
			span.appendChild( text );
			required.classList.add('required' );
			required.classList.add('a42-error-msg' );
			parent.insertBefore( required, obj );
			required.setAttribute( 'id', label );
			obj.classList.add('required' );
			obj.setAttribute( 'data-message', label );
		}	
		
		// 
		function deleteErrors(){
			for( var i = 0, len = arrayInput.length; i < len; i++ ){
				var node = document.getElementById( arrayInput[i].getAttribute( 'data-message' ) );
				if( node ) {
					node.parentNode.removeChild( node );
				}
			}
			//reset
			nom.removeAttribute('aria-required');
			nom.classList.remove('required');
			email.removeAttribute('aria-required');
			email.classList.remove('required');
			//efface le message de succès
			var node = document.getElementById( 'msg-success' );
			if( node ) node.parentNode.removeChild( node );
		}
		// vérification de l'adresse email
		function isEmail( mail ){
			var regMail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
			return regMail.test( mail );
		}
		event.preventDefault();
	}, false );
