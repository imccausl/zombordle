import { render, screen } from "@testing-library/react";
import TiledBlank from ".";

describe("TiledBlank", () => {
  it("renders blank squares corresponding to the length of the correct word", () => {
    render(<TiledBlank correctWordLength={10} />);

    const allBlankTiles = screen.getAllByRole('listitem');
    
    expect(allBlankTiles).toHaveLength(10);
  });
});
