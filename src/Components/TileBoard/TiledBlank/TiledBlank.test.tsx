import { render, screen } from "@testing-library/react";
import TiledBlank from ".";

describe("TiledBlank", () => {
  it("renders blank squares corresponding to the length of the correct word", () => {
    const { debug } = render(<TiledBlank correctWordLength={10} />);
    debug();
    const allBlankTiles = screen.getAllByDisplayValue(" ");
    expect(allBlankTiles).toHaveLength(2);
  });
});
