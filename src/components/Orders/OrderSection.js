import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './OrderSection.css'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from '../../Firebase/FirebaseConfig'
import { Link } from 'react-router-dom';


const OrderSection = () => {
    const [allorders, setAllOrders] = useState([])
    const [allordersstatus, setAllOrdersStatus] = useState('')
    const [keyword, setKeyword] = useState('')

    const getallorder = async () => {
        setAllOrders([]);
        const querySnapshot = await getDocs(collection(db, "UserOrders"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setAllOrders((prev) => [...prev, doc.data()])
        })
    }

    useEffect(() => {
        getallorder();
    }, [])

    // console.log(allorders)

    allorders.map((item) => {
        console.log(item.orderid)
    })
    const changeOrderStatus = (id, orderdata, status) => {
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            orderstatus: status
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getallorder()
    }



    const changeDeliveryboyName = (id, orderdata, boyname) => {
        console.log(id, orderdata, boyname)
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_name: boyname
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getallorder()
    }


    const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
        console.log(id, orderdata, boyphone)
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_phone: boyphone
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getallorder()
    }

    return (
        <div className="order-section">
            <Navbar />
            <h1 className="order-head1">Order Section</h1>
            <div className="order-s1">
                <input type="text" placeholder="Search by order id or delivery status" className='searchbar'
                    onChange={(e) => setKeyword(e.target.value)} />

                <div className="order-s1-in">
                    <p>Sort by Order Status</p>
                    <select className='ordertxt' onChange={(e) => setAllOrdersStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="ontheway">On the way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className='order__container'>
                <div className="order-row_card1">
                    <p className='ordertxt'> OrderId</p>
                    <p className='ordertxt'>Paid</p>
                    <p className='ordertxt'>Delivery Status</p>
                    <p className='ordertxt'>Delivery Boy Name</p>
                    <p className='ordertxt'>Delivery Boy Phone</p>

                    <p className='ordertxt'>Cost</p>
                    <button>Show Details</button>
                </div>
                <div className="order__container">
                    {/* data */}
                    {allorders.filter((val) => {
                        if (allordersstatus === "") {
                            return val
                        }
                        else if (val.orderstatus.toLowerCase().includes(allordersstatus.toLowerCase())) {
                            return val
                        }
                    })
                        .filter((val) => {
                            if (keyword === "") {
                                return val
                            }
                            else if (val.orderid.toLowerCase().includes(keyword.toLowerCase()) || val.orderstatus.toLowerCase().includes(keyword.toLowerCase()) || val.deliveryboy_name.toLowerCase().includes(keyword.toLowerCase())) {
                                return val
                            }
                        }).map((order) => {
                            return (
                                <div className="order-row_card">
                                    <p className='ordertxt'> {order.orderid}</p>
                                    <p className='ordertxt'> {order.orderpayment}</p>
                                    <div className="order-card-in">
                                        {order.orderstatus === 'pending' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                <option value="pending">Pending</option>
                                                <option value="ontheway">On the way</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }
                                        {order.orderstatus === 'ontheway' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                <option value="ontheway">On the way</option>

                                                <option value="pending">Pending</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }
                                        {order.orderstatus === 'delivered' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderid, order, e.target.value)}>
                                                <option value="delivered">Delivered</option>
                                                <option value="ontheway">On the way</option>
                                                <option value="pending">Pending</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }

                                        {order.orderstatus === 'cancelled' && <p className='ordertxt'> {order.orderstatus}</p>}
                                    </div>
                                    {order.deliveryboy_name ? <p className='ordertxt'> {order.deliveryboy_name}</p> :
                                        <input type="text" placeholder="Enter deliveryboy name" className='orderinput' onBlur={(e) => changeDeliveryboyName(order.orderid, order, e.target.value)} />}

                                    {order.deliveryboy_phone ? <p className='ordertxt'> {order.deliveryboy_phone}</p> :
                                        <input type="text" placeholder="Enter deliveryboy phone" className='orderinput' onBlur={(e) => changeDeliveryboyPhone(order.orderid, order, e.target.value)} />}

                                    <p className='ordertxt'>{order.ordercost}</p>
                                    <Link to={`/orderdetails/${order.orderid}`}><button>Show Details</button></Link>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default OrderSection