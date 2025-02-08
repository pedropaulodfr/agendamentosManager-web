import Agendamentos from "../pages/Agendamentos/Agendamentos";
import Home from "../pages/Home";

var menus = [
  {
    path: "/home",
    name: "Home",
    icon: "bi bi-house",
    component: Home,
    sidebar: true
  },
  {
    path: "/agendamentos",
    name: "Agendamentos",
    icon: "bi bi-calendar3",
    modulo: ["Admin"],
    component: Agendamentos,
    sidebar: true
  },
];

export default menus;