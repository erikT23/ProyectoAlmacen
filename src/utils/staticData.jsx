import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { v } from "../styles/index";
import marcasMenu from "../assets/marcas.png";
import modelosMenu from "../assets/modelos.png";
import mainMarcas from "../assets/mainMarcas.png";
import inventario from "../assets/inventario.png";
import equipos from "../assets/equipos.png";
import monitores from "../assets/monitor.png";
import usaurio from "../assets/usaurio.png";
import comunes from "../assets/comunes.png";
import mar from "../assets/mar.png";
import maya from "../assets/maya.png";
import grand from "../assets/grand.png";

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
    title: "Usaurios",
    subtitle: "Gestiona a tus Usaurios",
    icono: usaurio,
    link: "/configurar/usuarios",
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

export const MenuModelosData = [
  {
    title: "Comunes",
    subtitle: "Gestion de los equipos en comunes",
    icono: comunes,
    link: "/configurar/menuInventario/equipos/comunes",
  },
  {
    title: "Mar y Beach",
    subtitle: "Gestion de los equipos en mar y beach",
    icono: mar,
    link: "/configurar/menuInventario/equipos/myb",
  },
  {
    title: "Lindo y Maya",
    subtitle: "Gestion de los equipos en lindo y maya",
    icono: maya,
    link: "/configurar/menuInventario/equipos/lym",
  },
  {
    title: "Grand",
    subtitle: "Gestion de los equipos en grand",
    icono: grand,
    link: "/configurar/menuInventario/equipos/grand",
  },
];

export const MenuMonitoresData = [
  {
    title: "Comunes",
    subtitle: "Gestion de los monitores en comunes",
    icono: comunes,
    link: "/configurar/menuInventario/monitores/comunes",
  },
  {
    title: "Mar y Beach",
    subtitle: "Gestion de los monitores en mar y beach",
    icono: mar,
    link: "/configurar/menuInventario/monitores/myb",
  },
  {
    title: "Lindo y Maya",
    subtitle: "Gestion de los monitores en lindo y maya",
    icono: maya,
    link: "/configurar/menuInventario/monitores/lym",
  },
  {
    title: "Grand",
    subtitle: "Gestion de los monitores en grand",
    icono: grand,
    link: "/configurar/menuInventario/monitores/grand",
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

//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];
