import salami from "../assets/pngegg (1).png";
import cebolla from "../assets/pngegg (2).png";
import queso from "../assets/Diseño_sin_título__3_-removebg-preview (1).png";
import pimientos from "../assets/pngegg (4).png";
import tomate from "../assets/Diseño_sin_título__5_-removebg-preview.png";
import { toast } from "sonner";
const toppings = [
  { topping: "queso", image: queso, precio: 2 },
  { topping: "tomate", image: tomate, precio: 2 },
  { topping: "cebolla", image: cebolla, precio: 0.75 },
  { topping: "pimientos", image: pimientos, precio: 0.75 },
  { topping: "salami", image: salami, precio: 1 },
];

export const añadirPizza = (
  visibles,
  numPizzas,
  precio,
  setPizzasCompradas
) => {
  const ingredientes = Object.keys(visibles).filter((key) => visibles[key]);

  if (ingredientes.length < 2) {
    return toast.error("Debes seleccionar al menos 2 ingredientes");
  }

  const nuevaPizza = {
    ingredientes,
    cantidad: numPizzas,
    precio: precio.precioTotal,
  };

  fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaPizza),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text(); // ✅ CLAVE
        throw new Error(text || "Error al añadir la pizza");
      }
      return response.json();
    })
    .then(() => {
      toast.success("Pizza añadida correctamente");
      return fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`);
    })
    .then((res) => res.json())
    .then((data) => {
      setPizzasCompradas(data);
    })
    .catch((error) => {
      console.error("Error al añadir la pizza:", error);
      toast.error(error.message);
    });
};

export default toppings;
