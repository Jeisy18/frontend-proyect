import { useContext, useEffect, useState } from "react";
import Navbar from "../components/NavbarSupervisor";
import EmployeeTable from "../components/Home/EmployeeTable";
import UsersTable from "../components/Home/admin/UsersTable";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchEmployees = async () => {
        const data = [
          { id: 1, name: 'Alondra', lastname: 'Cortes', phone: '123456789', photo: '/photos/alondra.jpg' },
          { id: 2, name: 'Juan', lastname: 'Perez', phone: '987654321', photo: '/photos/juan.jpg' }
        ];
        setEmployees(data);
      };
      fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch ;
  });


  return (
    <div className="dashboard-container">
      <Navbar active="home" />

      <main className="main-content">
        <h1 className="page-title">
          {user?.role === "admin" ? "Supervisores Registrados" : "Empleados Registrados"}
        </h1>

        {user?.role === "admin" ? <UsersTable /> : <EmployeeTable  employees={filteredEmployees}  />}
      </main>
    </div>
  );
}
