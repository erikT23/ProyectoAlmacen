import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import equipos from "../assets/equipos.png";
import inventario from "../assets/inventario.png";
import mainMarcas from "../assets/mainMarcas.png";
import marcasMenu from "../assets/marcas.png";
import modelosMenu from "../assets/modelos.png";
import monitores from "../assets/monitor.png";
import { v } from "../styles/index";

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <v.iconoUser />,
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: <v.iconoSettings />,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <v.iconoCerrarSesion />,
    tipo: "cerrarsesion",
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Equipos",
    icon: <v.iconocategorias />,
    to: "/kardex",
  },
  {
    label: "Reportes",
    icon: <v.iconoreportes />,
    to: "/reportess",
  },
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/configurar",
  },
];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];

//data configuracion
export const DataModulosConfiguracion = [
  {
    title: "Inventario",
    subtitle: "Gestion del inventario ",
    icono: inventario,
    link: "/configurar/menuInventario",
  },
  {
    title: "Marcas",
    subtitle: "Gestion de las marcas de los productos",
    //  icono: "https://i.ibb.co/VYbMRLZ/categoria.png",
    icono: mainMarcas,
    link: "/configurar/menuMarcas",
  },
  {
    title: "tests",
    subtitle: "gestiona tus marcas",
    icono: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/configurar/marca",
  },
];

export const MenuMarcasData = [
  {
    title: "Marcas",
    subtitle: "Gestion de las marcas de los productos",
    icono: marcasMenu,
    link: "/configurar/menuMarcas/marcas",
  },
  {
    title: "Modelos",
    subtitle: "Gestion de modelos por marca",
    icono: modelosMenu,
    link: "/configurar/menuMarcas/modelos",
  },
];

export const MenuInventarioData = [
  {
    title: "Equipos",
    subtitle: "Gestion de los equipos",
    icono: equipos,
    link: "/configurar/menuInventario/equipos",
  },
  {
    title: "Monitores",
    subtitle: "Gestion de los monitores",
    icono: monitores,
    link: "/configurar/menuInventario/monitores",
  },
];
