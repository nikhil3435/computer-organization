/*
		Name:Integer Arithmetic
		Author: Giritheja
		Description:The experiment does addition of two 4-bit or 5-bit
		binary numbers.The results are expressed in terms of 1's complement,
		2's complement, signed, unsigned and binary format.
	*/
//This will set variables for 4-bit table
var binary = [];
0
var onescomp = [];
var twoscomp = [];
var signed = [];
var unsigned = [];
var selected = [];
var trig = 0;
var unsignedhigh = 15;
var signedlow = -7;
var signedhigh = 7;
var twoshigh = 7;
var twoslow = -8;
var oneshigh = 7;
var oneslow = -7;
var bit = 4;
//This will set variables for 5-bit table
if (window.location.href.indexOf("5bit") > -1) {
		unsignedhigh = 31;
		signedlow = -15;
		signedhigh = 15;
		twoshigh = 15;
		twoslow = -16;
		oneshigh = 15;
		oneslow = -15;
		bit = 5;
}
//This function resets all the variables and sets the background of
//the rows to original color.
function clearall() {
		$('#bittable tr').each(function() {
				$(this).context.cells[0].style.backgroundColor = '';
				$(this).context.cells[1].style.backgroundColor = '';
				$(this).context.cells[2].style.backgroundColor = '';
				$(this).context.cells[3].style.backgroundColor = '';
				$(this).context.cells[4].style.backgroundColor = '';
				$(this).context.style.backgroundColor = '';
				selected = [];
				binary = [];
				signed = [];
				unsigned = [];
				onescomp = [];
				twoscomp = [];
				signedsum = null;
				unsignedsum = null;
				onescompsum = null;
				twoscompsum = null;
				document.getElementById('resulttable').rows[0].cells[2].style.display = 'none';
				document.getElementById('resulttable').rows[3].cells[2].style.display = 'none';
				document.getElementById('resulttable').rows[4].cells[2].style.display = 'none';
				document.getElementById('resulttable').rows[2].cells[2].style.display = 'none';
				document.getElementById('resulttable').rows[1].cells[2].style.display = 'none';
				document.getElementById('resulttable').rows[0].cells[1].innerHTML = null;
				document.getElementById('resulttable').rows[1].cells[1].innerHTML = null;
				document.getElementById('resulttable').rows[2].cells[1].innerHTML = null;
				document.getElementById('resulttable').rows[3].cells[1].innerHTML = null;
				document.getElementById('resulttable').rows[4].cells[1].innerHTML = null;
		})
		trig = 0;
}
//This function changes the color of the selected row in the table.
function changeColor(o) {
		if (trig > 0) {
				clearall();
		}
		//This will make sure that only two of the rows are selected
		if (selected.length == 2) {
				selected[0].style.backgroundColor = '';
				selected.shift();
				binary.shift();
				onescomp.shift();
				twoscomp.shift();
				signed.shift();
				unsigned.shift();
		}
		selected.push(o);
		binary.push($(o).find("td:first").html());
		twoscomp.push($(o).find("td:nth-child(2)").html());
		onescomp.push($(o).find("td:nth-child(3)").html());
		unsigned.push($(o).find("td:nth-child(4)").html());
		signed.push($(o).find("td:nth-child(5)").html());
		var x = document.getElementById("tr2");
		for (var i = 0; i < binary.length; i++) {
				selected[i].style.backgroundColor = '#FA8072';
		}
};
//This function converts decimal value to binary value and appends zero
//at the start if required.
function decbin(value) {
		var out = value.toString(2);
		if (out.length < bit) {
				for (var i = out.length; i < bit; i++) {
						out = 0 + out;
				}

		}
		return out;
}
/* This function adds the signed numbers, unsigned numbers, binary, 1scomplement,
2scomplement and sets result row of the table to green(if within the range of table)
or shows overflow.*/
function add() {
		var unsigned1, unsigned2;
		unsignedsum = parseInt(unsigned[0], 10) + parseInt(unsigned[1], 10);
		signedsum = parseInt(signed[0], 10) + parseInt(signed[1], 10);
		twoscompsum = parseInt(twoscomp[0], 10) + parseInt(twoscomp[1], 10);
		onescompsum = parseInt(onescomp[0], 10) + parseInt(onescomp[1], 10);
		if (isNaN(unsignedsum)) {
				return;
		}
		if (unsignedsum > unsignedhigh) {
				document.getElementById('resulttable').rows[0].cells[2].style.display = 'block';
				document.getElementById('resulttable').rows[3].cells[2].style.display = 'block';
		}
		if (signedsum > signedhigh || signedsum < signedlow)
				document.getElementById('resulttable').rows[4].cells[2].style.display = 'block';
		if (onescompsum > oneshigh || onescompsum < oneslow)
				document.getElementById('resulttable').rows[2].cells[2].style.display = 'block';
		if (twoscompsum > twoshigh || twoscompsum < twoslow)
				document.getElementById('resulttable').rows[1].cells[2].style.display = 'block';
		document.getElementById('resulttable').rows[0].cells[1].innerHTML = decbin(unsignedsum);
		document.getElementById('resulttable').rows[1].cells[1].innerHTML = twoscompsum;
		document.getElementById('resulttable').rows[2].cells[1].innerHTML = onescompsum;
		document.getElementById('resulttable').rows[3].cells[1].innerHTML = unsignedsum;
		document.getElementById('resulttable').rows[4].cells[1].innerHTML = signedsum;
		//x.style.backgroundColor=(x.style.backgroundColor=='#31bc86')?(''):('#31bc86');
		var signedtrig = 0;
		var onestrig = 0;
		$('#bittable tr').each(function() {
				if (parseInt($(this).find("td:nth-child(4)").html(), 10) == unsignedsum) {
						$(this).context.cells[3].style.backgroundColor = '#31bc86';
						$(this).context.cells[0].style.backgroundColor = '#31bc86';
				};
				if (parseInt($(this).find("td:nth-child(2)").html(), 10) == twoscompsum) {
						$(this).context.cells[1].style.backgroundColor = '#31bc86';

				};
				if ((parseInt($(this).find("td:nth-child(3)").html(), 10) == onescompsum) && !onestrig) {
						$(this).context.cells[2].style.backgroundColor = '#31bc86';
						onestrig++;
				};
				if ((parseInt($(this).find("td:nth-child(5)").html(), 10) == signedsum) && !signedtrig) {
						$(this).context.cells[4].style.backgroundColor = '#31bc86';
						signedtrig++;
				};
		})
		trig++;
};
