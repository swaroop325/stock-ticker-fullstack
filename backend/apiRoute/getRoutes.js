const express = require('express');
const { sources } = require('../__data__/source');
const { tickers } = require('../__data__/tickers');
const getRoutes = express.Router();

getRoutes.get('/sources', (req, res) => {
    res.status(200).json(sources)
})

getRoutes.get('/:sourceId/prices', (req, res) => {
    let sourceId = req.params.sourceId
    if (sourceId) {
        let prices = tickers[sourceId]
        if (prices) {
            res.status(200).json(prices)
        } else {
            res.status(204).json({ message: "No Content" })
        }
    } else {
        res.status(500).json({ message: "No source Id found" })
    }
})

module.exports = getRoutes;