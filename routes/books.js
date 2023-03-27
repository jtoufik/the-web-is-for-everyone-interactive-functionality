import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const books = express.Router()

// Opbouw Boeken URL van de API
const urlBase = "https://zoeken.oba.nl/api/v1/search/";
const urlQuery = "?q=";
const urlDefault = "boek";
const urlKey = `${process.env.KEY}`;
const urlOutput = "&refine=true&output=json";
const defaultUrl = urlBase + urlQuery + urlDefault + urlKey + urlOutput;


// Maakt een route voor de detailpagina
books.get("/", async (request, response) => {
	let isbn = request.query.resultIsbn || "9789025764784";

	const uniqueUrl =
		urlBase + urlQuery + isbn + urlKey + urlOutput;

	const data = await fetch(uniqueUrl)
		.then((response) => response.json())
		.catch((err) => err);
	response.render("books", data);

});

export default books
