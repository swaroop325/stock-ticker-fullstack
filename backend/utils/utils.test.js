const { generateStockPrice, generateTimeStamp, generateLastFivePrices, generateCurrentStockPrice } = require("./utils")

describe("testing utility functions", () => {
    it("testing generateStockPrice function", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
        let stockPrice = generateStockPrice()
        expect(stockPrice).toBe(123.46);
    })

    it("testing generateTimeStamp function", () => {
        Date.now = jest.fn(() => 1658225452018);
        let timeStamp = generateTimeStamp();
        expect(timeStamp).toBe("2022-07-19 10:10:47");
    })

    it("testing generateLastFivePrices function", () => {
        Date.now = jest.fn(() => 1658225452018);
        let fivePrices = generateLastFivePrices();
        expect(fivePrices).toStrictEqual(
            [
                { "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:52" },
                { "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:47" },
                { "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:42" },
                { "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:37" },
                { "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:32" }
            ]
        );
    })

    it("testing currentStockPrice function", () => {
        Date.now = jest.fn(() => 1658225452018);
        let currentPrice = generateCurrentStockPrice();
        expect(currentPrice).toStrictEqual(
            {"stockprice": 123.46, "timeStamp": "2022-07-19 10:10:47"}
        );
    })
})