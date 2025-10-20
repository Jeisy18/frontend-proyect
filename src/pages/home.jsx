// src/pages/Home.js
import { useState, useEffect } from 'react';
import Navbar from '../components/NavbarSupervisor';
import EmployeeTable from '../components/Home/EmployeeTable';

export default function Home() {
  // Estado para empleados
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState(true);

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
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = showActive; 
    return matchesSearch && matchesActive;
  });

  return (
    <div className="dashboard-container">
      <Navbar active="home"/>
      <main className="main-content">
        <h1 className="page-title">Empleados Registrados</h1>
        <EmployeeTable employees={filteredEmployees} />
      </main>
    </div>
  );
}
