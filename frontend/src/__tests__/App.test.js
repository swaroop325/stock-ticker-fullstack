import { render, screen } from '@testing-library/react';
import App from '../App';

test("Renders the app perfectly", () => {
    render(<App />);
    expect(screen.getByText("Stock Ticker")).toBeInTheDocument();
})
