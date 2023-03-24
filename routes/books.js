import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const book = express.Router()

// Haal de gegevens van één boek op
book.get('/', (request, response) => {
    const id = request.query.id || null
    const url = `${process.env.API_URL}/book/`

    fetchJson(url).then((data) => {
        response.render('book', data)
    })
})


export default book
