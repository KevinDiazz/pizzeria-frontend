/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MisPizzas from "../components/misPizzas";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("MisPizzas component", () => {
  const pizzasMock = [
    {
      id: 1,
      ingredientes: ["queso", "tomate"],
      cantidad: 2,
      precio: 13,
    },
    {
      id: 2,
      ingredientes: ["salami", "cebolla"],
      cantidad: 1,
      precio: 6.5,
    },
  ];

  let setPizzasCompradasMock;

  beforeEach(() => {
    setPizzasCompradasMock = vi.fn();

    // Limpia mocks antes de cada test
    vi.clearAllMocks();
  });

  it("renderiza las pizzas correctamente", () => {
    render(
      <MisPizzas
        pizzasCompradas={pizzasMock}
        setPizzasCompradas={setPizzasCompradasMock}
      />
    );

    // Comprueba que se muestran ingredientes con la primera letra en mayúscula y separadas
    expect(screen.getByText("Queso,")).toBeInTheDocument();
    expect(screen.getByText("Tomate.")).toBeInTheDocument();

    // Comprueba que se muestran precios y cantidades
    expect(screen.getByText("13€")).toBeInTheDocument();
    expect(screen.getByText("2x")).toBeInTheDocument();

    // Segundo pizza
    expect(screen.getByText("Salami,")).toBeInTheDocument();
    expect(screen.getByText("Cebolla.")).toBeInTheDocument();
    expect(screen.getByText("6.5€")).toBeInTheDocument();
    expect(screen.getByText("1x")).toBeInTheDocument();
  });

  it("eliminarPizza llama al API y actualiza estado y muestra toast", async () => {
    global.fetch = vi
      .fn()

      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Pizza eliminada" }),
      })

      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: 2,
            ingredientes: ["salami", "cebolla"],
            cantidad: 1,
            precio: 6.5,
          },
        ],
      });

    render(
      <MisPizzas
        pizzasCompradas={pizzasMock}
        setPizzasCompradas={setPizzasCompradasMock}
      />
    );

    const botonesEliminar = screen.getAllByRole("button");
    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(setPizzasCompradasMock).toHaveBeenCalledWith([
        {
          id: 2,
          ingredientes: ["salami", "cebolla"],
          cantidad: 1,
          precio: 6.5,
        },
      ]);
    });

    expect(toast.info).toHaveBeenCalledWith("Pizza eliminada");
  });

  it("muestra error si DELETE falla", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "No se pudo eliminar" }),
    });

    render(
      <MisPizzas
        pizzasCompradas={pizzasMock}
        setPizzasCompradas={setPizzasCompradasMock}
      />
    );

    const botonesEliminar = screen.getAllByRole("button");
    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(toast.info).not.toHaveBeenCalled();
    });
  });
});
