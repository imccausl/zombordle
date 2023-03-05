import { render, screen } from "@testing-library/react";
import TiledAttempt from ".";

describe("TiledAttempt", () => {
  it("renders a word as separate tiles", () => {
    render(<TiledAttempt word="test" correctWord="best" />);

    screen.getByText(/e/)
    screen.getByText(/s/)

    const repeatedConsonants = screen.getAllByText(/t/);
    expect(repeatedConsonants).toHaveLength(2);
  });
});
