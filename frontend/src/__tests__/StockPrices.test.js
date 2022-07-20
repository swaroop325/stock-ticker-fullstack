import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import StockPrices from '../components/stockPrices';

test("Renders the StockPrices page perfectly", () => {
    render(<StockPrices />);
    expect(screen.getByText("Price Source:")).toBeInTheDocument();
    expect(screen.getByText("Ticker:")).toBeInTheDocument();
    const dataRows = screen.queryAllByTestId("stock-table")
    expect(dataRows).toHaveLength(0) 
})

test("snapshot testing", () => {
    const domTree = renderer.create(<StockPrices />).toJSON();
    expect(domTree).toMatchSnapshot();
})