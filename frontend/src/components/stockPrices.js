import { useEffect, useState } from "react"
import StockPricesTable from "./stockPriceTable";
import socketIOClient from "socket.io-client";
import apiCall from "../api";
import { BASE_URL, WEBSOCKET_URL } from "../constants";

export default function StockPrices() {
    const [sources, setSources] = useState([]);
    const [ticker, setTicker] = useState([]);
    const [selectedSource, setSelectedSource] = useState('null');
    const [selectedTicker, setSelectedTicker] = useState('null');
    const [prices, setPrices] = useState([])

    useEffect(() => {
        getSources();
    }, [])

    useEffect(() => {
        if (selectedSource !== 'null') {
            getTickers();
            setSelectedTicker('null')
            setPrices([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSource])

    useEffect(() => {
        if (selectedTicker !== 'null') {
            getStockPrices();
            setPrices([])
        }
    }, [selectedTicker])

    useEffect(() => {
        if (prices.length !== 0) {
            const socket = socketIOClient(WEBSOCKET_URL);
            socket.on("stock price", data => {
                updatePriceList(data);
            });
            return () => {
                socket.disconnect()
            }
        }
    });

    const getSources = () => {
        apiCall(BASE_URL + `sources`).then(sourcesData => {
            setSources(sourcesData)
        })
    }

    const getTickers = () => {
        apiCall(BASE_URL + selectedSource + `/tickers`).then(tickersData => {
            setTicker(tickersData)
        })
    }

    const getStockPrices = () => {
        apiCall(BASE_URL + `stockPrices`).then(stockprices => setPrices(stockprices))
    }

    const updatePriceList = (newPrice) => {
        let lastUpdatedPrice = prices;
        lastUpdatedPrice.push(newPrice);
        setPrices(price => [newPrice, ...price.slice(0, 4)]);
    }

    return (
        <div>
            <div className="select-box">
                <span>
                    <label>Price Source:</label>
                </span>
                <select value={selectedSource} onChange={(item) => setSelectedSource(item.target.value)}>
                    <option value="null" disabled hidden>
                        Choose price source
                    </option>
                    {sources.map((item, index) => (<option value={item.name}>{item.name}</option>))}
                </select>
            </div>
            <div className="select-box">
                <span>
                    <label>Ticker:</label>
                </span>
                <select value={selectedTicker} onChange={(item) => setSelectedTicker(item.target.value)}>
                    <option value="null" disabled hidden>
                        Choose ticker
                    </option>
                    {ticker.map((item, index) => (<option value={item.name}>{item.name}</option>))}
                </select>
            </div>
            <div>
                {prices.length !== 0 && <StockPricesTable prices={prices} updatePriceList={updatePriceList} data-testid="stock-table"/>}
            </div>
        </div>
    )
}