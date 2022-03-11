/**Affichage des résultats de recerche**/

'use strict';

var btnresultats = document.getElementById('btn-resultats');
var resultssearch = document.getElementById('results-search');

var textbox = document.createElement('span');

btnresultats.addEventListener( 'click', function(){
	
	var nbresults = Math.round(Math.random() * 10000);

	textbox.textContent = nbresults + " répondants";


	resultssearch.appendChild(textbox);

}, false );

