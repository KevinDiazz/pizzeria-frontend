import "@testing-library/jest-dom";
import ButtonsToppings from "../components/buttons";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import toppings from "../utils/toppins";
import { useState } from "react";

describe("Buttons toppings test", () => {
  const visibles = {
    salami: true,
    cebolla: true,
    queso: true,
    tomate: true,
    pimientos: true,
  };
  it("comprobar el numero de botones", async () => {
    const setFuncion = vi.fn();
    render(
      <ButtonsToppings
        numPizzas={0}
        setPrecio={setFuncion}
        setVisibles={setFuncion}
        visibles={visibles}
      ></ButtonsToppings>
    );
    const numButtons = await screen.findAllByText(/- Quitar/i);
    expect(numButtons).toHaveLength(5);
  });
  it('cambia "- Quitar" a "+ Añadir" al hacer clic', async () => {
    const Wrapper = () => {
      const [visibles, setVisibles] = useState({
        salami: true,
        cebolla: true,
        queso: true,
        tomate: true,
        pimientos: true,
      });

      return (
        <ButtonsToppings
          numPizzas={0}
          setPrecio={() => {}}
          setVisibles={setVisibles}
          visibles={visibles}
        />
      );
    };

    render(<Wrapper />);

    const buttons = await screen.findAllByText(/- Quitar/i);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[0]);

    const texto = await screen.findByText(/\+ Añadir/i);
    expect(texto).toBeInTheDocument();
  });

  it("comprobar nombres de toppings", () => {
    const setFuncion = vi.fn();
    render(
      <ButtonsToppings
        numPizzas={0}
        setPrecio={setFuncion}
        setVisibles={setFuncion}
        visibles={visibles}
      ></ButtonsToppings>
    );
    for (let i = 0; i < toppings.length; i++) {
      const regex = new RegExp(toppings[i].topping, "i");
      expect(screen.getByText(regex)).toBeInTheDocument();
    }
  });

  it("comprobar precios de toppings", () => {
    const setFuncion = vi.fn();
    render(
      <ButtonsToppings
        numPizzas={0}
        setPrecio={setFuncion}
        setVisibles={setFuncion}
        visibles={visibles}
      ></ButtonsToppings>
    );
    for (let i = 0; i < toppings.length; i++) {
      const precio = toppings[i].precio;
      const precioTexto = `\\+€${precio.toFixed(2)}`;
      const regex = new RegExp(precioTexto);
      console.log(regex);
      expect(screen.getAllByText(regex)).toBeTruthy();
    }
  });
});
