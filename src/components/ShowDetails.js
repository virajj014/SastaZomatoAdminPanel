import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/FirebaseConfig'
import './ShowDetails.css'
import { Link } from 'react-router-dom'

const ShowDetails = () => {

    const { orderid } = useParams()
    const [orderdata, setOrderData] = useState({})
    console.log(orderid)

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
    return (
        <div className="order-section">
            <Navbar />
            <Link to='/'><button className='goback-btn'>Go back</button></Link>

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

export default ShowDetails