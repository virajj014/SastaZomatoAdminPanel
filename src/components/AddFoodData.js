import React, { useState } from 'react'
import './AddFoodData.css'
// firebase imports
import { db, storage } from '../Firebase/FirebaseConfig'
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from './Navbar';
//
const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodPrice, setFoodPrice] = useState('')
    const [foodImage, setFoodImage] = useState(null)
    const [foodCategory, setFoodCategory] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    // const [restaurantAddress, setRestaurantAddress] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [foodImageUrl, setFoodImageUrl] = useState('')


    //
    const [foodType, setFoodType] = useState('')
    const [mealType, setMealType] = useState('')
    const [foodAddon, setFoodAddon] = useState('')
    const [foodAddonPrice, setFoodAddonPrice] = useState('')
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [restrauntAddressBuilding, setRestrauntAddressBuilding] = useState('')
    const [restrauntAddressStreet, setRestrauntAddressStreet] = useState('')
    const [restrauntAddressCity, setRestrauntAddressCity] = useState('')
    const [reatrauntAddressPincode, setRestrauntAddressPincode] = useState('')

    // console.log(foodName, foodPrice, foodImage, foodCategory, foodDescription, restaurantName, restaurantAddress, restaurantPhone)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (foodImage == null) {
            alert('Please select an image')
            return
        }

        else {
            const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
            uploadBytes(imageRef, foodImage)
                .then(() => {
                    alert('Image uploaded successfully')
                    getDownloadURL(imageRef)
                        .then((url) => {
                            // console.log(url)
                            // setFoodImageUrl(url)

                            const foodData = {
                                foodName,
                                foodPrice,
                                foodImageUrl: url,
                                foodCategory,
                                foodDescription,
                                restaurantName,
                                // restaurantAddress,
                                restaurantPhone,
                                //
                                foodType,
                                mealType,
                                foodAddon,
                                foodAddonPrice,
                                restaurantEmail,
                                restrauntAddressBuilding,
                                restrauntAddressStreet,
                                restrauntAddressCity,
                                reatrauntAddressPincode,
                                id: new Date().getTime().toString()
                            }

                            // console.log(foodData)
                            try {
                                const docRef = addDoc(collection(db, "FoodData"), foodData);
                                alert("Data added successfully ", docRef.id);
                            }
                            catch (error) {
                                alert("Error adding document: ", error);
                            }
                        })
                })
                .catch((error) => {
                    alert(error.message)
                })
        }

    }


    // console.log(new Date().getTime().toString())
    return (
        <div className="food-outermost">
            <Navbar />
            <div className="form-outer">
                <h1>Add Food Data</h1>
                <form className="form-inner">
                    <label>Food Name</label>
                    <input type="text" name="food_name"
                        onChange={(e) => { setFoodName(e.target.value) }} />
                    <br />
                    <label>Food Description</label>
                    <input type="text" name="food_description"
                        onChange={(e) => { setFoodDescription(e.target.value) }} />
                    <br />

                    {/*                            */}
                    {/*  */}
                    {/*  */}


                    <div className="form-row">

                        <div className="form-col">
                            <label>Food Price</label>
                            <input type="number" name="food_price"
                                onChange={(e) => { setFoodPrice(e.target.value) }}
                            />
                        </div>
                        <div className="form-col">
                            <label>Food Type</label>

                            <select name="food_type" onChange={(e) => { setFoodType(e.target.value) }}>
                                <option value="null">Select Food Type</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-col">
                            <label>Food Category</label>
                            <select name="food_category" onChange={(e) => { setFoodCategory(e.target.value) }}>
                                <option value="null">Select Food Category</option>
                                <option value="veg">Indian</option>
                                <option value="non-veg">Chineese</option>
                                <option value="non-veg">Italian</option>
                                <option value="non-veg">Mexican</option>
                                <option value="non-veg">American</option>
                            </select>
                        </div>
                        <div className="form-col">
                            <label>Meal Type</label>

                            <select name="meal_type" onChange={(e) => { setMealType(e.target.value) }}>
                                <option value="null">Select Meal Type</option>
                                <option value="dinner">Dinner</option>
                                <option value="staters">Starters</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="liquid">Liquid</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="form-row">
                        <div class="form-col">
                            <label>Add On</label>
                            <input type="text" name="food_addon"
                                onChange={(e) => { setFoodAddon(e.target.value) }}
                            />
                        </div>
                        <div className='form-col'>
                            <label>Add On Price</label>
                            <input type="text" name="food_addon_price"
                                onChange={(e) => { setFoodAddonPrice(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />
                    {/*  */}
                    {/*  */}
                    {/*                                          */}
                    <label>Food Image</label>
                    <input type="file" name="food_image"
                        onChange={(e) => { setFoodImage(e.target.files[0]) }}
                    />
                    <br />
                    <label>Restaurant Name</label>
                    <input type="text" name="restaurant_name"
                        onChange={(e) => { setRestaurantName(e.target.value) }}
                    />
                    <br />
                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant Building Number/Name</label>
                            <input type="text" name="restaurant_address_building"
                                onChange={(e) => { setRestrauntAddressBuilding(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Street / Area Name</label>
                            <input type="text" name="restaurant_address_street"
                                onChange={(e) => { setRestrauntAddressStreet(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant City</label>
                            <input type="text" name="restaurant_address_city"
                                onChange={(e) => { setRestrauntAddressCity(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Pin-code</label>
                            <input type="number" name="restaurant_address_pincode"
                                onChange={(e) => { setRestrauntAddressPincode(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-col">
                            <label>Restaurant Phone</label>
                            <input type="number" name="restaurant_phone"
                                onChange={(e) => { setRestaurantPhone(e.target.value) }}
                            />
                        </div>
                        <div class="form-col">
                            <label>Restaurant Email</label>
                            <input type="email" name="restaurant_email"
                                onChange={(e) => { setRestaurantEmail(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />
                    <button onClick={handleSubmit}>Add Food</button>
                </form>
            </div>
        </div>
    )
}

export default AddFoodData