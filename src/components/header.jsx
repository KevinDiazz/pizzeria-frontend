import logoPizza from "../assets/pngegg (6).png";
function Header(){
    return (
        <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-r from-yellow-700 via-red-600 to-yellow-700 shadow-lg">
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto mb-4 md:mb-0">
                <img
                    src={logoPizza}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-md"
                    alt="Logo de la pizzería"
                />
                <h1 className="text-3xl md:text-5xl text-white font-bold font-[lora] tracking-wide drop-shadow-lg">
                    LA PIZZERÍA
                </h1>
            </div>
            <nav className="w-full md:w-auto">
                <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                    <li>
                        <a href="#" className="text-white text-base md:text-lg font-semibold hover:text-yellow-300 transition-colors">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white text-base md:text-lg font-semibold hover:text-yellow-300 transition-colors">
                            Menú
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white text-base md:text-lg font-semibold hover:text-yellow-300 transition-colors">
                            Contacto
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;