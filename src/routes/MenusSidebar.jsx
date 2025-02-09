import Agendamentos from "../pages/Agendamentos/Agendamentos";
import Home from "../pages/Home";
import Horarios from "../pages/Horarios/Horarios";
import Servicos from "../pages/Servicos/Servicos";
import Usuarios from "../pages/Usuarios/Usuarios";

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
  {
    path: "/servicos",
    name: "Serviços",
    icon: "bi bi-bag-heart-fill",
    modulo: ["Admin"],
    component: Servicos,
    sidebar: true
  },
  {
    path: "/horarios",
    name: "Horários",
    icon: "bi bi-clock",
    modulo: ["Admin"],
    component: Horarios,
    sidebar: true
  },
  {
    path: "/usuarios",
    name: "Usuários",
    icon: "bi bi-people",
    modulo: ["Admin"],
    component: Usuarios,
    sidebar: true
  },
];

export default menus;