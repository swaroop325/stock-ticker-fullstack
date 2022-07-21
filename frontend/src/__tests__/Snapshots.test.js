import renderer from "react-test-renderer";
import App from "../App";
import StockPrices from "../components/stockPrices";
import StockPricesTable from "../components/stockPriceTable";

test("snapshot testing for stockPrices component", () => {
    const domTree = renderer.create(<StockPrices />).toJSON();
    expect(domTree).toMatchSnapshot();
})

test("snapshot testing for stockPricesTable component without any data", () => {
    const domTree = renderer.create(<StockPricesTable prices={[]} />).toJSON();
    expect(domTree).toMatchSnapshot();
})

test("snapshot testing for stockPricesTable component with data", () => {
    const domTree = renderer.create(<StockPricesTable prices={[{ "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:52" }]} />).toJSON();
    expect(domTree).toMatchSnapshot();
})

test("snapshot testing for app component", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
})