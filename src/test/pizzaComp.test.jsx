import "@testing-library/jest-dom";
import PizzaComp from "../components/pizzaComp";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import { useState } from "react";
function Wrapper() {
  const [numPizzas, setNumPizzas] = useState(1);
  const [precio, setPrecio] = useState({ precioPizza: 6.5, precioTotal: 6.5 });
  // eslint-disable-next-line no-unused-vars
  const [visibles, setVisibles] = useState({
    salami: true,
    cebolla: true,
    queso: true,
    tomate: true,
    pimientos: true,
  });

  return (
    <PizzaComp
      visibles={visibles}
      numPizzas={numPizzas}
      setNumPizzas={setNumPizzas}
      precio={precio}
      setPrecio={setPrecio}
    ></PizzaComp>
  );
}
describe("pizza component test", () => {
  it("comprobar numero contador y precio", () => {
    render(<Wrapper></Wrapper>);
    const input = screen.getByPlaceholderText("1");
    expect(input).toHaveValue("1");
    const precio = screen.getByText("6.5€");
    expect(precio).toHaveTextContent("6.5€");
  });

  it("comprobar que aumenta el número de pizzas y su precio", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("1");
    const button = screen.getByTestId("increment-button");
    const precioInicial = screen.getByText("6.5€");
    expect(precioInicial).toHaveTextContent("6.5€");

    fireEvent.click(button);

    expect(input).toHaveValue("2");
    const precioActualizado = screen.getByText("13€");
    expect(precioActualizado).toHaveTextContent("13€");
  });
  it("comprobar que aumenta el número de pizzas y su precio", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("1");
    const button = screen.getByTestId("increment-button");
    const precioInicial = screen.getByText("6.5€");
    expect(precioInicial).toHaveTextContent("6.5€");

    fireEvent.click(button);

    expect(input).toHaveValue("2");
    const precioActualizado = screen.getByText("13€");
    expect(precioActualizado).toHaveTextContent("13€");
  });
});
