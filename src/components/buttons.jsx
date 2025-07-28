import { Button } from "@/components/ui/button";
import toppings from "../utils/toppins";
function ButtonsToppings({
  setVisibles,
  visibles,
  setPrecio,
  numPizzas,
}) {
  const toggleIngrediente = (nombre) => {
    setVisibles((prev) => ({
      ...prev,
      [nombre]: !prev[nombre],
    }));
  };
  const handlePrecio = (item) => {
    const nuevoEstado = !visibles[item.topping];
    setPrecio((prevPrecio) => {
      if (nuevoEstado) {
        //se suma o resta al precio inicial el ingrediente y se multiplica por el número de pizzas
        const nuevoPrecio = item.precio + prevPrecio.precioPizza;
        const precioTotal = nuevoPrecio * numPizzas;
        return { precioPizza: nuevoPrecio, precioTotal: precioTotal };
      } else {
        const nuevoPrecio = prevPrecio.precioPizza - item.precio;
        const precioTotal = nuevoPrecio * numPizzas;
        return { precioPizza: nuevoPrecio, precioTotal: precioTotal };
      }
    });
  };
  return (
    <div className="flex flex-wrap items-center gap-6 justify-center">
      {toppings.map((item) => (
        <div
          key={item.topping}
          className="principal flex flex-col items-center p-4 rounded-xl border-2 border-yellow-400 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-200 w-40"
        >
          <img
            className="w-14 h-14 object-contain mb-2"
            src={item.image}
            alt={item.topping}
          />
          <span className="text-base  text-gray-700 mb-2 font-bold">
            {item.topping.toUpperCase()}
          </span>
          <Button
            className={`w-full py-2 rounded-lg font-medium transition-colors duration-150 ${
              visibles[item.topping]
                ? "bg-red-500 hover:bg-red-400 text-white"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            }`}
            onClick={() => {
              toggleIngrediente(item.topping);
              handlePrecio(item);
            }}
          >
            {visibles[item.topping] ? `- Quitar` : `+ Añadir`}
          </Button>
          <span className="text-sm text-gray-500 mt-2">
            +€{item.precio.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
export default ButtonsToppings;
