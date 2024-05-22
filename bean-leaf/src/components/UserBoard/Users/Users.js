import "./Users.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserDetails from "./UserDetails/UserDetils";
// import DetailedOrder from "./DetailedOrder/DetailedOrder";

const Users = ({}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)

  const showDetailedUser = (userId) => {
    const selUser = users.find((user) => user.id === userId);
    // console.log(order)
    setSelectedUser(selUser);
  };
  const hideDetailedUser = () =>{
    setSelectedUser(null)
  }

  const fetchUsers = async () => {
    // setIsLoading(true)
    try {
      const usersResp = await axios.get("http://localhost:5000/users/");
      setUsers(usersResp.data);
    } catch (error) {
      console.log("Error of getting orders", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className="revCon">
      <h1>Пользователи</h1>
      {selectedUser ? (<UserDetails selectedUser={selectedUser} hideDetailedUser={hideDetailedUser}/>):(null)}
      <div></div>
      <div class="scrollableTable">
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th>Имя </th>
              <th>Email</th>
              <th>Адрес</th>
              <th>Номер телефона</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="order-line" onClick={() => showDetailedUser(user.id)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.adress}</td>
                <td>{user.telNumber}</td>
                <td>{user.admin ? "Администратор" : "Клиент"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
