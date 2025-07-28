function Contador({ numPizzas, setNumPizzas, setPrecio }) {
  return (
    <form className="max-w-xs mx-auto mt-4 border-3 border-red-500 rounded-xl">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-testid="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-red-400 hover:bg-red-200 border border-red-400 rounded-s-lg p-3 h-11"
          onClick={() => {
            setNumPizzas((prev) => {
              const updatedNumPizzas = prev <= 1 ? 1 : prev - 1;
              setPrecio((prevPrecio) => {
                if (updatedNumPizzas <= 1) {
                  return {
                    precioPizza: prevPrecio.precioPizza,
                    precioTotal: prevPrecio.precioPizza,
                  };
                } else {
                  const precioTotal = prevPrecio.precioPizza * updatedNumPizzas;
                  return {
                    precioPizza: prevPrecio.precioPizza,
                    precioTotal: precioTotal,
                  };
                }
              });
              return updatedNumPizzas;
            });
          }}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          data-input-counter-min="1"
          data-input-counter-max="50"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center font-bold text-gray-900 text-lg  block w-full py-2.5"
          placeholder="1"
          value={numPizzas || "1"}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          data-testid="increment-button"
          className="bg-amber-300 hover:bg-amber-200 border border-gray-300 rounded-e-lg p-3 h-11"
          onClick={() => {
            setNumPizzas((prev) => {
              const updatedNumPizzas = prev + 1;
              setPrecio((prevPrecio) => {
                if (updatedNumPizzas <= 1) {
                  return {
                    precioPizza: prevPrecio.precioPizza,
                    precioTotal: prevPrecio.precioPizza,
                  };
                } else {
                  const precioTotal = prevPrecio.precioPizza * updatedNumPizzas;
                  return {
                    precioPizza: prevPrecio.precioPizza,
                    precioTotal: precioTotal,
                  };
                }
              });
              return updatedNumPizzas;
            });
          }}
        >
          <svg
            className="w-3 h-3 text-gray-900 font-bold dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default Contador;
