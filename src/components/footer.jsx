import logoPizza from "../assets/pngegg (6).png";
function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center p-3 justify-evenly bg-black">
      <div className="mb-4 md:mb-0">
        <ul className="flex flex-col items-center md:items-start">
          <li className="text-white">Facebook</li>
          <li className="text-white">Instagram</li>
          <li className="text-white">Twitter</li>
        </ul>
      </div>
      <div className="mb-4 md:mb-0">
        <ul className="flex flex-col items-center md:items-start">
          <li className="text-white">Contacto</li>
          <li className="text-white">Sobre nosotros</li>
          <li className="text-white">Política de privacidad</li>
          <li className="text-white">Términos de servicio</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={logoPizza}
          className="w-24 h-24 object-contain ml-0 md:ml-4 mb-2 md:mb-0"
          alt="Logo de la pizzería"
        />
        <p className="text-xs text-white font-bold mr-0 md:mr-4 ml-0 md:ml-4"> © 2025</p>
      </div>
    </div>
  );
}
export default Footer;
