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
                    <tr key={index}>
                        <td>{item.timeStamp}</td>
                        <td>{item.stockprice}</td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}