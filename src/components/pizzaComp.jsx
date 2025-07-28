import pizza from "../assets/pngegg.png";
import salami from "../assets/Diseño_sin_título__1_-removebg-preview.png";
import cebolla from "../assets/Diseño_sin_título__2_-removebg-preview.png";
import queso from "../assets/Diseño_sin_título__3_-removebg-preview (1).png";
import pimientos from "../assets/Diseño_sin_título__4_-removebg-preview.png";
import tomate from "../assets/Diseño_sin_título__5_-removebg-preview.png";
import Contador from "../components/contador";
function PizzaComp({ visibles, numPizzas, setNumPizzas, precio, setPrecio }) {
  return (
    <div className="flex flex-col items-center border-2 border-black  rounded-4xl bg-white mt-12 mx-8">
      <Contador
        numPizzas={numPizzas}
        setNumPizzas={setNumPizzas}
        precio={precio}
        setPrecio={setPrecio}
      />
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "250px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Imagen base */}
        <img
          src={pizza}
          alt="Pizza base"
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            zIndex: 1,
          }}
        />

        {/* Topping (salami) superpuesto */}
        <div className="w-full h-full flex items-center justify-center">
          {visibles.salami && (
            <img
              src={salami}
              alt="Salami"
              style={{
                width: "150px",
                height: "150px",
                zIndex: 4,
              }}
            />
          )}
          <div className="absolute w-full h-full flex items-center justify-center">
            {visibles.cebolla && (
              <img
                src={cebolla}
                alt="cebolla"
                style={{
                  width: "150px",
                  height: "150px",
                  zIndex: 4,
                }}
              />
            )}
          </div>
          <div className="absolute w-full h-full flex items-center justify-center">
            {visibles.queso && (
              <img
                src={queso}
                alt="queso"
                style={{
                  width: "250px",
                  height: "250px",
                  zIndex: 3,
                }}
              />
            )}
          </div>
          <div className="absolute w-full h-full flex items-center justify-center">
            {visibles.pimientos && (
              <img
                src={pimientos}
                alt="pimientos"
                style={{
                  width: "140px",
                  height: "140px",
                  zIndex: 3,
                }}
              />
            )}
          </div>
          <div className="absolute w-full h-full flex items-center justify-center">
            {visibles.tomate && (
              <img
                src={tomate}
                alt="tomate"
                style={{
                  width: "250px",
                  height: "250px",
                  zIndex: 2,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <p className="bg-white p-2 mb-4  font-bold text-xl">{precio.precioTotal}€</p>
    </div>
  );
}
export default PizzaComp;
