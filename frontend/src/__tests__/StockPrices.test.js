import { render, screen } from '@testing-library/react';
import StockPrices from '../components/stockPrices';

test("Renders the StockPrices page perfectly", () => {
    render(<StockPrices />);
    expect(screen.getByText("Price Source:")).toBeInTheDocument();
    expect(screen.getByText("Ticker:")).toBeInTheDocument();
})

test("snapshot testing", () => {
    const container = render(<StockPrices />)
    expect(container.firstChild).toMatchSnapshot()
})