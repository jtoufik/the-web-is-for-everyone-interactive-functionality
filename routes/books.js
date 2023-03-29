import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const books = express.Router()

// Opbouw Boeken URL van de API
const urlBase = "https://zoeken.oba.nl/api/v1/search/";
const urlQuery = "?q=";
const urlDefault = "boek";
const urlKey = `&authorization=${process.env.API_KEY}`;
const urlOutput = "&refine=true&output=json";
const defaultUrl = urlBase + urlQuery + urlDefault + urlKey + urlOutput;

// Maakt een route voor de detailpagina
books.get("/", async (request, response) => {
	let isbn = request.query.id || "9789025764784";
	console.log(request.query)

	const uniqueUrl = urlBase + urlQuery + isbn + urlKey + urlOutput;

    console.log(uniqueUrl)

	const data = await fetch(uniqueUrl)
		.then((response) => response.json())
		.catch((err) => err);
	response.render("books", data);

});

// Toon het formulier om een reservering te maken
books.get('/new', (request, response) => {
	response.render('reserveForm.ejs')
})

// Handel het versturen van het formulier af
books.post('/', (request, response) => {
console.log(request.body)

// // Roep de API aan met de post methode
// const url = `${process.env.API_URL}/member`
// postJson(url, request.body).then((data) => {
// 	// De waarden uit het formulier (niet de API)
// 	let newMember = { ...request.body }
// 	// Het id uit de API (overschrijft het formulier)
// 	newMember.id = data.data.createMember.id || null

// 	// Stuur de gebruiker naar / als het gelukt is
// 	if (data.success) {
// 	response.redirect('/?memberPosted=true') // squad meegeven, message meegeven

// 	// Toon opnieuw het formulier (met waarden) als het niet gelukt is
// 	} else {
// 	response.render('memberForm.ejs', newMember) // Fail, message meegeven
// 	}
// })
})

export default books
