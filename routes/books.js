import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const books = express.Router()

// Opbouw Boeken URL van de API
const urlBase = 'https://zoeken.oba.nl/api/v1/search'
const urlQuery = '?q='
const urlDefault = 'boek'
const urlKey = `&authorization=${process.env.API_KEY}`
const urlOutput = '&refine=true&output=json'
const defaultUrl = urlBase + urlQuery + urlDefault + urlKey + urlOutput


// Maakt een route voor de detailpagina
books.get('/', async (request, response) => {
	let isbn = request.query.id || '9789025764784'
	const uniqueUrl = urlBase + urlQuery + isbn + urlKey + urlOutput
	
	const data = await fetch(uniqueUrl)
		.then((response) => response.json())
		.catch((err) => err)
	response.render('books', data)
})

// Maakt een route voor de reserveringspagina
books.get('/new', (request, response) => {

    const baseurl = 'https://api.oba.fdnd.nl/api/v1'

    const url = `${baseurl}/reserveringen`

	fetchJson(url).then((data) => {
		response.render('reserveForm.ejs')
	})

    fetchJson(defaultUrl).then((data) => {
		response.render('reserveForm.ejs')
	})
})

// Verstuurt de data naar de API
books.post('/new', (request, response) => {
    const baseurl = 'https://api.oba.fdnd.nl/api/v1'
    const url = `${baseurl}/reserveringen`

    postJson(url, request.body).then((data) => {
        let newReservation = { ...request.body }

        if (data.success) {
            response.redirect('/?reserveringenPosted=true')
        } else {
            const errormessage = `${data.message}: Mogelijk komt dit door het id die al bestaat.`
            const newdata = {
                error: errormessage,
                values: newReservation,
            };

            response.render('reserveForm', newdata)
        }

        console.log(JSON.stringify(data.errors))
    })

})

// Stelt afhandeling van formulieren in
books.use(express.json());
books.use(express.urlencoded({ extended: true }));

export default books
