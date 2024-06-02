import "./Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailedOrder from "./DetailedOrder/DetailedOrder";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Orders = ({CurentUser , forAdmin}) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
   // ... (остальной код)
  console.log(CurentUser)
   const [filterStatus, setFilterStatus] = useState("");

   // ... (функции fetchOrders, showDetailedOrder, hideDetailedOrder, combineOrdersData) 
 
   const filteredOrders = combinedData.filter((order) => {
     return !filterStatus || order.status === filterStatus;
   });
   filteredOrders.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Сортировка по убыванию даты
  });
  const fetchOrders = async () => {
    setIsLoading(true);
    if(forAdmin){
    try {
      const response = await axios.get("http://localhost:5000/order");
      const usersResp = await axios.get("http://localhost:5000/users/");
      setOrders(response.data);
      setUsers(usersResp.data);
    } catch (error) {
      console.log("Error of getting orders", error);
    } finally {
      setIsLoading(false);
    }
  }
  else{
    try {
      const response = await axios.get("http://localhost:5000/order");
      const usersResp = await axios.get("http://localhost:5000/users/");
      const usersOrders = response.data.filter((order) => order.userId === CurentUser.id);
      console.log(response.data)
      setOrders(usersOrders);
      setUsers(usersResp.data);
    } catch (error) {
      console.log("Error of getting orders", error);
    } finally {
      setIsLoading(false);
    }
  }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(orders);
  console.log(users);
  const showDetailedOrder = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    // console.log(order)
    setSelectedOrder(order);
  };
  const hideDetailedOrder = () =>{
    setSelectedOrder(null)
  }
  function combineOrdersData(orders, users) {
    return orders.map((order) => {
      const user = users.find((u) => u.id === order.userId);
      return {
        ...order,
        userName: user?.name,
      };
    });
  }

  useEffect(() => {
    if (orders.length && users.length) {
      const combinedData = combineOrdersData(orders, users);
      setCombinedData(combinedData);
      setIsLoading(false);
    }
  }, [orders, users]);
  const statusOptions = [
    "Обрабатывается",
    "Сборка",
    "Готов к отправке",
    "В Пути",
    "Доставлено",
  ];
  console.log(combinedData)
  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  return (
    
    <div className="revCon">
      {forAdmin? (<h1>Новые заказы</h1>):(<h1>Ваши заказы</h1>)}
      
    {selectedOrder ? (<DetailedOrder selectedOrder={selectedOrder} hideDetailedOrder = {hideDetailedOrder} fetchOrders={fetchOrders} forAdmin = {forAdmin}/> ) : null}
      {/* </table> */}
      <div>
        <label htmlFor="filterStatus">Фильтр по статусу:</label>
        <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Все статусы</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div class="scrollableTable">
        <table>
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Имя пользователя</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.map((order) => (
              <tr key={order.id} onClick={() =>showDetailedOrder(order.id)} className="order-line" data-tooltip-id="my-tooltip-1" style={{}}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{Number(order.total).toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactTooltip
        id="my-tooltip-1"
        place="bottom"
        content="Детали заказа"
      />
    </div>
  );
};
export default Orders;
