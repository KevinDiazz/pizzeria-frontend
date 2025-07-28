import "@testing-library/jest-dom";
import Contador from "../components/contador";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import { useState } from "react";

function Wrapper() {
  const [numPizzas, setNumPizzas] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [precio, setPrecio] = useState({ precioPizza: 10, precioTotal: 10 });

  return (
    <Contador
      numPizzas={numPizzas}
      setNumPizzas={setNumPizzas}
      setPrecio={setPrecio}
    />
  );
}
describe("Contador test", () => {
  it("comprobar estado inicial", () => {
    render(<Wrapper></Wrapper>);
    const input = screen.getByPlaceholderText("1");
    expect(input).toHaveValue("1");
  });

  it("comprobar que aumenta el número de pizzas", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("1");
    const button = screen.getByTestId("increment-button");

    fireEvent.click(button);

    expect(input).toHaveValue("2");
  });
  it("comprobar que desciende el número de pizzas", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("1");
    const button = screen.getByTestId("increment-button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const buttonDecrement = screen.getByTestId("decrement-button");
    fireEvent.click(buttonDecrement);

    expect(input).toHaveValue("3");
  });
});
