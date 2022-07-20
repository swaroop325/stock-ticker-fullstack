function generateStockPrice() {
    let stockprice = Math.random() * 1000;
    return Number(stockprice.toFixed(2));
}

function generateTimeStamp(i = 1) {
    let timeStamp = new Date(Date.now() - i * 5000).toISOString().replace(/\.[0-9]{3}Z/, '').replace('T', ' ');
    return timeStamp
}

function generateLastFivePrices() {
    let lastFivePrices = []
    for (let i = 0; i < 5; i++) {
        let priceUnit = {
            timeStamp: generateTimeStamp(i),
            stockprice: generateStockPrice()
        }
        lastFivePrices.push(priceUnit)
    }
    return lastFivePrices
}

function generateCurrentStockPrice() {
    let currentStockPrice = {
        timeStamp: generateTimeStamp(),
        stockprice: generateStockPrice()
    }
    return currentStockPrice
}

module.exports = {
    generateCurrentStockPrice,
    generateLastFivePrices,
    generateStockPrice,
    generateTimeStamp
}