import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from '../App';

test("snapshot testing", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
})

test("Renders the app perfectly", () => {
    render(<App />);
    expect(screen.getByText("Stock Ticker")).toBeInTheDocument();
})

