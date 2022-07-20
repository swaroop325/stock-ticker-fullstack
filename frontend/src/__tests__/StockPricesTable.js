import { render, screen } from '@testing-library/react';
import StockPricesTable from '../components/stockPriceTable';

test("Renders the StockPricesTable page perfectly without data", () => {
    render(<StockPricesTable prices={[]}/>);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Prices")).toBeInTheDocument();
})

test("snapshot testing", () => {
    const container = render(<StockPricesTable prices={[]}/>)
    expect(container.firstChild).toMatchSnapshot()
})

test("Renders the StockPricesTable page with data", () => {
    render(<StockPricesTable prices={[{ "stockprice": 123.46, "timeStamp": "2022-07-19 10:10:52" }]}/>);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Prices")).toBeInTheDocument();
    expect(screen.getByText("2022-07-19 10:10:52")).toBeInTheDocument();
    expect(screen.getByText("123.46")).toBeInTheDocument();
})

