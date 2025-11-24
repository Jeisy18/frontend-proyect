import DashboardTiles from "../components/Dashboard/DashboardTiles";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "../components/NavbarSupervisor";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const adminMenu = [
    {
      title: "Empleados",
      desc: "Lista general",
      icon: "employees",
      href: "/employees",
    },
    {
      title: "Supervisores",
      desc: "Roles y permisos",
      icon: "supervisors",
      href: "/supervisors",
    },
    {
      title: "Horarios",
      desc: "Gestión de turnos",
      icon: "schedules",
      href: "/schedules",
    },
    {
      title: "Dispositivos",
      desc: "Checadores",
      icon: "devices",
      href: "/devices",
    },
  ];

  const supervisorMenu = [
    {
      title: "Empleados",
      desc: "Administrar personal",
      icon: "employees",
      href: "/employees",
    },
    {
      title: "Estadísticas",
      desc: "Ver desempeño",
      icon: "stats",
      href: "/statistics",
    },
    {
      title: "Perfil",
      desc: "Mi información",
      icon: "supervisors",
      href: "/profile",
    },
    {
      title: "Horarios",
      desc: "Control de turnos",
      icon: "schedules",
      href: "/schedules",
    },
  ];

  const items = user?.role === "admin" ? adminMenu : supervisorMenu;

  return (
    <>
      <Navbar active="home" />
      <DashboardTiles items={items} />
    </>
  );
}
