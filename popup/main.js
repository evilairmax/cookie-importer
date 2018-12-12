/**
 * Main script.
 *
 * Process the input and imports cookies in the navigator.
 */
document.getElementById("process").addEventListener("click", (e) => {
	let input = document.getElementById("input").value;

	let error   = document.getElementById("error");
	let success = document.getElementById("success");

	if(input == "")
		error.innerHTML = "Error: No hay cookies para procesar.";
	else
		document.getElementById("input").disabled = true;

	let lines = input.split('\n');

	let total = 0;

	lines.forEach(function(line) {
  		s = line.split('\t', 7);

  		if(s.length != 7)
  			return;

  		let cHost, cPath, cName, cValue, cSecure, cSession, cExpiry;

  		cHost	= s[0];
  		cPath	= s[2];
  		cName	= s[5];
  		cValue 	= s[6];
  		cSecure = (s[3] == "TRUE");
		cExpiry	= parseInt(s[4]);
		
		cSession = (cExpiry == 0);

		if(!cExpiry)
			cExpiry = 0xffffffff;

		absoluteUrl = cHost.split('.').filter(function(elem){ return elem != ""; }).join('.');

		var browser = browser || chrome

		browser.cookies.set({url:(cSecure ? 'https://' : 'http://') + absoluteUrl, name:cName, value:cValue, domain:cHost, path:cPath, secure:cSecure, expirationDate:cExpiry});

		total++;
	});

	if(total > 0){
		success.innerHTML = "Se han importado un total de <strong>"+total+"</strong> cookies.";
		error.style.display = "none";
		document.getElementById("input").disabled = false;
		document.getElementById("input").value = "";
	}
});