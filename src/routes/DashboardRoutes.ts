import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Inicio",
    icon: "home",
    link: "/",
  },
  {
    id: uuid(),
    title: "Gestión de turnos",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Turnos",
    icon: "layers",
    children: [{ id: uuid(), link: "/gestion", name: "Gestión" }],
  },
];

export default DashboardMenu;
