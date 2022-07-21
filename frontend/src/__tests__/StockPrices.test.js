import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as apiCall from '../api';
import StockPrices from '../components/stockPrices';

const sourceValues = [{ "id": "01", "name": "SRC01" }];
let apiCallSpy;

beforeEach(() => {
    apiCallSpy = jest.spyOn(apiCall, 'default').mockReturnValue(
        new Promise(resolve => {
            resolve(sourceValues);
        })
    );
});

afterAll(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

test("Renders the StockPrices page perfectly", async () => {
    await act(async () => {
        render(<StockPrices />);
    })
    expect(screen.getByText("Price Source:")).toBeInTheDocument();
    expect(screen.getByText("Ticker:")).toBeInTheDocument();
    const dataRows = screen.queryAllByTestId("stock-table");
    expect(dataRows).toHaveLength(0);
    const pricesSelect = screen.getByTestId('source-select')
    expect(pricesSelect).toBeInTheDocument();
    const tickerSelect = screen.getByTestId('ticker-select');
    expect(tickerSelect).toBeInTheDocument();
    expect(screen.queryByTestId('stock-table')).not.toBeInTheDocument();
})

test("test for selecting stock and tickers", async () => {
    expect(apiCallSpy).not.toHaveBeenCalled();
    await act(async () => {
        render(<StockPrices />);
    })
    const pricesSelect = screen.getByTestId('source-select');
    expect(pricesSelect).toBeInTheDocument();
    const tickerSelect = screen.getByTestId('ticker-select');
    expect(tickerSelect).toBeInTheDocument();
    expect(apiCallSpy).toHaveBeenCalledTimes(1);
    await act(async () => {
        fireEvent.change(pricesSelect, { target: { value: 'SRC01' } })
    })
    expect(apiCallSpy).toHaveBeenCalledTimes(2);
    await act(async () => {
        fireEvent.change(tickerSelect, { target: { value: 'SRC02-T01' } })
    })
    expect(apiCallSpy).toHaveBeenCalledTimes(3);
})

test("test for displaying the stock price table", async () => {
    await act(async () => {
        await render(<StockPrices />);
    })
    expect(screen.queryByTestId('stock-table')).not.toBeInTheDocument();
    const pricesSelect = screen.getByTestId('source-select');
    const tickerSelect = screen.getByTestId('ticker-select');
    await act(async () => {
        fireEvent.change(pricesSelect, { target: { value: 'SRC01' } });
    })
    await act(async () => {
        fireEvent.change(tickerSelect, { target: { value: 'SRC02-T01' } })
    })
    expect(screen.queryByTestId('stock-table')).not.toBeInTheDocument();

})