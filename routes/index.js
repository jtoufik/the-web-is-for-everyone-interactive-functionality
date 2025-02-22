import * as dotenv from 'dotenv'

import express from 'express'
import { fetchJson } from '../helpers/fetchWrapper.js'

dotenv.config()

const index = express.Router()

// Overzicht
index.get('/', (request, response) => {
    let zoekopdracht = 'Geschiedenis'
    let booksUrl = `${process.env.API_URL}/search/?q=${zoekopdracht}&authorization=${process.env.API_KEY}&refine=true&output=json`

    fetchJson(booksUrl).then((data) => {
    response.render('index', data)
        // console.log(booksUrl)
    })
})

index.get('/reserveOverview', (request, response) => {
    response.render('reserveOverview')
})

export default index
