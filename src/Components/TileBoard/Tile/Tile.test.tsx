import { render, screen } from "@testing-library/react";
import Tile from ".";
import { VariantColor, VariantBorder } from "./Tile.styles";

const variantColors = Object.keys(VariantColor);
describe("Tile", () => {
  it("renders default variant", () => {
    render(<Tile>A</Tile>);

    const tileElement = screen.getByRole('listitem');

    expect(tileElement).toBeInTheDocument();
    expect(tileElement).toHaveStyle(
      `background-color: ${VariantColor.default}`
    );
    expect(tileElement).toHaveStyle(`border-color: ${VariantBorder.default}`);
  });

  describe("Variants", () => {
    it.each([
      ...variantColors.map((color) => [
        color,
        VariantColor[color as keyof typeof VariantColor],
        VariantBorder[color as keyof typeof VariantColor],
      ]),
    ])(
      "renders with correct background and border colors for variant %s",
      (variantColorName, expectedBackgroundColor, expectedBorderColor) => {
        render(
          <Tile variant={variantColorName as keyof typeof VariantColor}>A</Tile>
        );

        const tileElement = screen.getByRole('listitem');

        expect(tileElement).toHaveStyle(
          `background-color: ${expectedBackgroundColor}`
        );
        expect(tileElement).toHaveStyle(`border-color: ${expectedBorderColor}`);
      }
    );
  });
});
