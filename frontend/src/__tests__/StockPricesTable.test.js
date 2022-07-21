import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import StockPricesTable from '../components/stockPriceTable';

test("Renders the StockPricesTable page perfectly without data", () => {
    render(<StockPricesTable prices={[]} />);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Prices")).toBeInTheDocument();
    const dataRows = screen.queryAllByTestId("price-row")
    expect(dataRows).toHaveLength(0)
})

test("Renders the StockPricesTable page with data", () => {
    render(<StockPricesTable prices={[{ "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:52" }]} />);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Prices")).toBeInTheDocument();
    expect(screen.getByText("2022-07-19 10:10:52")).toBeInTheDocument();
    expect(screen.getByText("123.46")).toBeInTheDocument();
    const dataRows = screen.queryAllByTestId("price-row")
    expect(dataRows).toHaveLength(1)
})