import pizzaLogo from "../assets/pizza.png";
import iconoBasura from "../assets/icons8-basura-100.png";
import { toast } from "sonner";
function MisPizzas({ pizzasCompradas, setPizzasCompradas }) {
  function eliminarPizza(id) {
    fetch(`${import.meta.env.VITE_API_URL}/api/pizzas/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la pizza");
        }
        return response.json();
      })
      .then((res) => {
        console.log("Pizza eliminada:", res);
        toast.info("Pizza eliminada")
        // Actualizar el estado de las pizzas compradas
        fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`)
          .then((response) => response.json())
          .then((data) => {
            setPizzasCompradas(data);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar la pizza:", error.message);
      });
  }
  return (
    <>
      {/* Contenedor principal, responsive con md y mobile */}
      <div className="flex flex-col w-full max-w-xs bg-blue-300 p-2 rounded-xl mt-6 mb-5 border-amber-200 border-2 overflow-y-auto max-h-96 md:w-xl md:p-2 md:rounded-2xl md:mt-12 md:border-amber-200 md:border-3 md:overflow-y-scroll md:max-h-100 lg:max-w-xl">
        {/* Encabezado, responsive */}
        <div className="flex w-full items-center">
          <p className="w-1/2 font-bold text-lg md:w-1/2 md:font-bold md:text-xl">
            Mis Pizzas
          </p>
        </div>
        <div>
          {pizzasCompradas.map((pizza) => (
            // Fila de pizza, responsive
            <div
              key={pizza.id}
              className="flex flex-col w-full gap-2 mt-2 md:flex-row md:gap-1 md:items-center md:mt-2"
            >
              <div className="flex items-center gap-2 md:w-full md:items-center md:gap-1">
                {/* Imagen, responsive */}
                <img
                  className="w-8 h-8 me-2 object-contain md:w-10 md:h-9 md:me-1"
                  alt="pizza"
                  src={pizzaLogo}
                />
                <div className="flex flex-wrap w-40 text-xs md:w-full md:text-base">
                  {(pizza.ingredientes || []).map((ingrediente, i, arr) => (
                    <p key={i}>
                      {ingrediente.charAt(0).toUpperCase() +
                        ingrediente.slice(1)}
                      {i === arr.length - 1 ? "." : ","}
                    </p>
                  ))}
                </div>
                {/* Precio y cantidad al lado de los ingredientes */}
                <div className="flex items-end w-full justify-end gap-4 ms-2">
                  <p className="text-xs md:text-base">{pizza.precio}€</p>
                  <p className="text-xs md:text-base">{pizza.cantidad}x</p>
                  <button
                    onClick={() => eliminarPizza(pizza.id)}
                    className="relative flex items-center group"
                  >
                    <img
                      className="trashIcon w-5 object-contain md:w-6 cursor-pointer transition-transform duration-200 group-hover:scale-110"
                      src={iconoBasura}
                      alt="Eliminar pizza"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default MisPizzas;
