import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../Firebase/FirebaseConfig'
import Navbar from '../Navbar/Navbar'
import './ShowOrderSpecific.css'

const ShowOrderSpecific = () => {
    const { orderid } = useParams();
    // console.log(orderid)

    const [orderdata, setOrderData] = useState([])

    const getorderdata = async () => {
        const docRef = doc(db, "UserOrders", orderid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setOrderData(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getorderdata()
    }, [])
    console.log(orderdata)
    return (
        <div className="order-section">
            <Navbar />
            <Link to='/orders'><button className='goback-btn'>Go back</button></Link>
            <h1 className='order-head1'>Order Details</h1>

            <div className='orderdetails-form'>
                <div className="orderetails_row">
                    <p>Customer Name</p>
                    <p>{orderdata.ordername}</p>
                </div>
                <div className="orderetails_row">
                    <p>Order Address</p>
                    <p>{orderdata.orderaddress}</p>
                </div>

                <div className="orderetails_row">
                    <p>Customer Phone</p>
                    <p>{orderdata.orderphone}</p>
                </div>

                <div className="orderetails_row">
                    <p>Order Status</p>
                    <p>{orderdata.orderstatus}</p>
                </div>

            </div>

        </div>
    )
}

export default ShowOrderSpecific