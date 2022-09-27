import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { doc, query, getDocs, orderBy, collection, getDoc, onSnapshot } from "firebase/firestore";
import Order from './Order';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]); //Initial value will be empty array

  useEffect(() =>{
    if(user){
      async function fetchData() {
        // You can await here
        const ordersRef = collection(db,"users",user?.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const querySnapshot = await getDocs(q);
        setOrders(querySnapshot.docs.map(doc =>({
          id: doc.id,
          data: doc.data()
        })));
        console.log("Got Orders>>",orders);
     }
      fetchData();
     }else{
      console.log("No user!");
       setOrders([]);
     }  
  }, []); //You have to have [] here. This makes it run only once. 

  return (
    <div className="orders">
        <h1>Your Orders</h1>
        <div className="orders__order">
          {orders?.map(order => (
            <Order order={order}/>
          ))}
        </div>
    </div>
  )
}

export default Orders