import { añadirPizza } from "../utils/toppins";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));
describe("test funcion para añadir pizzas al backend", () => {
  it("añade pizza correctamente cuando hay ingredientes válidos", async () => {
    const mockSetPizzasCompradas = vi.fn();

    // Mock de fetch (primero POST, luego GET)
    // eslint-disable-next-line no-undef
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      .mockResolvedValueOnce({
        json: async () => [
          {
            ingredientes: ["Aqui veras las pizzas que añadas"],
            cantidad: 0,
            precio: 0,
            id: 1,
          },
          {
            ingredientes: ["Aqui veras las pizzas que añadas"],
            cantidad: 0,
            precio: 0,
            id: 2,
          },
        ],
      });

    const visibles = { queso: true, tomate: true, salami: false };
    const numPizzas = 2;
    const precio = { precioPizza: 6.5, precioTotal: 13 };

    await añadirPizza(visibles, numPizzas, precio, mockSetPizzasCompradas);

    // Verifica llamadas a fetch
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/pizzas",
      expect.objectContaining({
        method: "POST",
      })
    );

    // Verifica que se actualizó el estado

    await waitFor(() => {
      expect(mockSetPizzasCompradas).toHaveBeenCalledWith([
        {
          ingredientes: ["Aqui veras las pizzas que añadas"],
          cantidad: 0,
          precio: 0,
          id: 1,
        },
        {
          ingredientes: ["Aqui veras las pizzas que añadas"],
          cantidad: 0,
          precio: 0,
          id: 2,
        },
      ]);
    });

    // Verifica que se mostró toast de éxito
    expect(toast.success).toHaveBeenCalledWith("Pizza añadida correctamente");
  });
  it("muestra error si hay menos de 2 ingredientes", async () => {
    const visibles = { queso: true, tomate: false, salami: false };
    const numPizzas = 1;
    const precio = { precioPizza: 6.5, precioTotal: 6.5 };

    await añadirPizza(visibles, numPizzas, precio, vi.fn());

    expect(toast.error).toHaveBeenCalledWith(
      "Debes seleccionar al menos 2 ingredientes"
    );
  });
});
