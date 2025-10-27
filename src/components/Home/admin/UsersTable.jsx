import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/users.api";
import UsersRow from "../admin/UsersRow";
import SearchBar from "../SearchBar";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
    <div className="controls-section">
        <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
             <UsersRow key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
