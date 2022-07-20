import { useEffect, useState } from "react"
import StockPricesTable from "./stockPriceTable";
import socketIOClient from "socket.io-client";

export default function StockPrices() {
    const [sources, setSources] = useState([]);
    const [ticker, setTicker] = useState([]);
    const [selectedSource, setSelectedSource] = useState('null');
    const [selectedTicker, setSelectedTicker] = useState('null');
    const [prices, setPrices] = useState([])

    const URL = 'ws://localhost:8000';

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

    const getSources = () => {
        fetch('http://localhost:8000/sources').then(res => res.json()).then(data => {
            setSources(data)
        })
    }

    const getTickers = () => {
        fetch(`http://localhost:8000/${selectedSource}/prices`).then(res => res.json()).then(data => {
            setTicker(data)
        })
    }

    const getStockPrices = () => {
        fetch(`http://localhost:8000/stockPrices`).then(res => res.json()).then(data => {
            setPrices(data)
        })
    }

    const updatePriceList = (newPrice) => {
        let lastUpdatedPrice = prices;
        lastUpdatedPrice.push(newPrice);
        setPrices(price => [newPrice, ...price.slice(0, 4)]);
    }

    useEffect(() => {
        if (prices.length !== 0) {
            const socket = socketIOClient(URL);
            socket.on("stock price", data => {
                updatePriceList(data);
            });
            return () => {
                socket.disconnect()
            }
        }
    });

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
                {prices.length !== 0 && <StockPricesTable prices={prices} updatePriceList={updatePriceList} />}
            </div>
        </div>
    )
}