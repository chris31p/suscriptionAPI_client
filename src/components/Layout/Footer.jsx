import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-100 text-gray-700">
      <div className="container mx-auto p-6 flex flex-col lg:flex-row lg:justify-between items-center gap-6 text-center lg:text-left">
        
        

        {/* Información de contacto */}
        <div className="text-sm">
          <h4 className="font-semibold text-gray-800">📞 Atención al Cliente</h4>
          <p>📧 <a href="mailto:contacto@greenmarket.com" className="hover:text-green-600">contacto@greenmarket.com</a></p>
          <p>📍 Santiago, Chile</p>
        </div>

        {/* Información principal */}
        <div className="items-center justify-between">
          <h3 className="font-semibold text-lg">🌱 GreenMarket - Conectando tu mesa con lo mejor del mercado local 🌱</h3>
          <p className="text-sm mt-1 ml-24">📍 Compra local, come saludable, apoya a los productores</p>
        </div>

        {/* Redes Sociales */}
        <div className="flex items-center gap-4 text-xl">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
            <FaTiktok />
          </a>
        </div>

      </div>

      {/* Línea divisoria */}
      <div className="border-t mt-2 pt-4 text-center bg-gray-300 text-sm text-gray-600">
        <p>🔒 Compra segura | 🚚 Entrega rápida | 🍃 Sostenibilidad garantizada</p>
        <p>⚡ Hecho con pasión por <span className="font-semibold">Christopher Pesántez</span> | 🌍 Proyecto con fines educativos</p>
        <p>📜 © 2025 GreenMarket. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
