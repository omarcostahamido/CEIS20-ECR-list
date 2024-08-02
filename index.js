// this code was written by OCH in 2024 to help CEIS20 programmatically identify its Early Career Researchers
// given that all listed researchers on the new CEIS20 website have a public ciencia vitae, this code only parses publicly available data.
// omarcostahamido.com 2024

const fetch = require("node-fetch");
const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',};

// array to store all ciencia vitae links
var cvlist = [];

// list of links to parse, i.e. pages with researchers profiles
var links2parse = ["https://www.uc.pt/ceis20/o-centro-de-estudos-interdisciplinares-ceis20/investigadores-integrados/", "https://www.uc.pt/ceis20/o-centro-de-estudos-interdisciplinares-ceis20/investigadores-associados-e-colaboradores/"]

// function to get researcher
async function parseResearchersPage(url) {
	const response = await fetch(url, {headers, method: 'GET',});
	const body = await response.text();
	// parse all contents of body and create an array
	var bodyarray = body.split(" ");
	var parsedarray = [];
	// create a resultarray only with the cienciavitae links
	for (var i = 0; i < bodyarray.length; i++) {
		if (bodyarray[i].substring(0,33) == "href='https://www.cienciavitae.pt") {
			parsedarray.push(bodyarray[i].substring(6,bodyarray[i].length-1));
		}
	}
	// every researcher has a card and a modal, so each ciencia vitae link appears duplicated, even for those who seemingly don't have it ;)
	var resultarray = [];
	for (var i = 0; i < parsedarray.length; i = i+2) {
		resultarray.push(parsedarray[i]);
	}
	return resultarray;
};

// function to get researcher info
async function parseCienciaVitae(url) {
	if (url.split("/")[url.split("/").length-1].length != 14) {return ["bad cv link","bad cv link","bad cv link","bad cv link"]}
	const response = await fetch(url, {headers, method: 'GET',});
	var body = await response.text();
	if (body.includes("<h1>Currículo não encontrado")) { // if the cv is offline
		return ["cv offline", "cv offline", "cv offline", "cv offline"]
	}
	// get researcher's name
	var researcherName = body.split("user-name")[1].substring(2).split("<")[0];
	var temDoutoramento = false;
	var dataDoutoramento = 0;
	var isECR = false;
	// check if researcher has PhD
	if (body.includes("<div>Formação</div>")) {
		body = body.split("<div>Formação</div>")[1].split("</tbody>")[0];
		temDoutoramento = body.includes("Doutoramento") || body.includes("Doctor");
	}
	if (temDoutoramento == true) {
		// check researcher's PhD date
		if (body.includes("Doutoramento")) {
			dataDoutoramento = body.split("Doutoramento")[0];
		} else	{
			dataDoutoramento = body.split("Doctor")[0];
		}
		dataDoutoramento = dataDoutoramento.split("ui-text-light\">")
		dataDoutoramento = dataDoutoramento[dataDoutoramento.length-1].split("<")[0].split("- ");
		dataDoutoramento = dataDoutoramento[dataDoutoramento.length-1].split("/")[0];
		// calculate if they are an ECR. Change this "2018" year if needed!
		if (dataDoutoramento > 2018) {isECR = true;}
	}
	return [researcherName, temDoutoramento, dataDoutoramento, isECR];
}

// helper function to avoid too many requests in a short period of time
function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) });
}

// main function of our code
async function main(){
	// collect all ciencia vitae links of all pages of researchers
	for (var i = 0; i < links2parse.length; i++) {
		// first we extract the 
		var iterationarray = await parseResearchersPage(links2parse[i]);
		// then we push those results to cvlist
		for (var j = 0; j < iterationarray.length; j++) {
			cvlist.push(iterationarray[j]);
		}
	}
	// console.log(cvlist);
	console.log("we have "+cvlist.length+" cvs to parse");
	console.log("#, cienciavitae, nome, temDoutoramento, dataDoutoramento, isECR");
	// parse one cv at a time and print it to the console as a .csv (comma separated value table)
	for (var i = 0; i < cvlist.length; i++) {
		// please note that if the code fails or timesout, you can change the "var i = 0" to be index of the last successful retrieved cv!
		// console.log(cvlist[i]);
		var currentResercherData = await parseCienciaVitae(cvlist[i]);
		console.log(i,",", cvlist[i],",", currentResercherData[0],",", currentResercherData[1],",", currentResercherData[2],",", currentResercherData[3]);
		// ciencia vitae website has a speed limit of access, let's work with it...
		await sleep(2000);
	}
}

main();