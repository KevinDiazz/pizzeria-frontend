import "./App.css";
import { useEffect, useState } from "react";
import PizzaComp from "./components/pizzaComp";
import ButtonsToppings from "./components/buttons";
import MisPizzas from "./components/misPizzas";
import { Button } from "@/components/ui/button";
import { añadirPizza } from "./utils/toppins";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/header";
import Footer from "./components/footer";
function App() {
  const [visibles, setVisibles] = useState({
    salami: true,
    cebolla: true,
    queso: true,
    tomate: true,
    pimientos: true,
  });
  const [numPizzas, setNumPizzas] = useState(1);
  const [precio, setPrecio] = useState({ precioPizza: 6.5, precioTotal: 6.5 });
  const [pizzasCompradas, setPizzasCompradas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener pizzas");

        const data = await res.json();
        setPizzasCompradas(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchPizzas();
  }, []);
  return (
    <>
      <div className="bg-[url('./assets/32744249.JPG')] bg-center min-h-screen  bg-repeat bg-fixed">
        <Header />
        <div className="fixed top-4 left-1/2 w-[90vw] max-w-md md:max-w-xl transform -translate-x-1/2 z-50 px-2 md:px-0">
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              style: {
                fontSize: "14px",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              },
            }}
          />
        </div>
        <div className="flex flex-col justify-center md:flex-row items-center md:items-start md:h-120 gap-6 px-4">
          <PizzaComp
            visibles={visibles}
            numPizzas={numPizzas}
            setNumPizzas={setNumPizzas}
            precio={precio}
            setPrecio={setPrecio}
          />
          <MisPizzas
            pizzasCompradas={pizzasCompradas}
            setPizzasCompradas={setPizzasCompradas}
          />
        </div>
        <h3 className="text-2xl md:text-4xl mx-4 md:mx-6  px-4 md:px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-700 via-red-600 to-yellow-700 shadow-lg font-[lora] text-white font-bold tracking-wide text-center mt-8 mb-4">
          INGREDIENTES
        </h3>
        <ButtonsToppings
          visibles={visibles}
          setVisibles={setVisibles}
          setPrecio={setPrecio}
          numPizzas={numPizzas}
          setNumPizzas={setNumPizzas}
        />
        <div className="flex justify-center">
          <Button
            onClick={() =>
              añadirPizza(visibles, numPizzas, precio, setPizzasCompradas)
            }
            className="cursor-pointer mt-8 mb-10 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-amber-400 via-red-500 to-amber-600 shadow-lg hover:scale-105 transition-transform duration-200 hover:from-amber-500 hover:to-red-600 border-4 border-amber-700 text-lg md:text-xl font-extrabold text-white font-[lora] tracking-wide"
          >
            🍕 Añadir Pizza
          </Button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
