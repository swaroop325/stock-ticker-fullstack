export default function StockPricesTable({ prices }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Prices</th>
                </tr>
            </thead>
            <tbody>
                {prices.map((item, index) =>
                    <tr key={index} data-testid="price-row">
                        <td>{item.timeStamp}</td>
                        <td>{item.stockprice}</td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}