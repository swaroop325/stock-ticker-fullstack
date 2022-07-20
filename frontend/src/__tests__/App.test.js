import { render, screen } from '@testing-library/react';
import App from '../App';

test("snapshot testing", () => {
    const container = render(<App />)
    expect(container.firstChild).toMatchSnapshot()
})

test("Renders the app perfectly", () => {
    render(<App />);
    expect(screen.getByText("Stock Ticker")).toBeInTheDocument();
})

