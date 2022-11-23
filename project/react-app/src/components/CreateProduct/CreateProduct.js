import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProductThunk } from '../../store/product'
import "./CreateProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  
  const submit = (e) => {
    e.preventDefault();
    setErrors([]);

    const data = { category, name, description, price, quantity, image };

        if (!data.category.length) return setErrors(['Category can not be empty.'])
        if (!data.name.length) return setErrors(['Name can not be empty.'])
        if (!data.description.length) return setErrors(['Description can not be empty.'])
        if (!data.price.length) return setErrors(['Price can not be empty.'])
        if (!data.quantity.length) return setErrors(['Quantity can not be empty.'])
        if (!data.image.length) return setErrors(['Image can not be empty.'])
        if (!data.image.endsWith('.jpg') && !data.image.includes('.jpeg') && !data.image.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);
        
        let createdProduct;
        createdProduct = dispatch(createProductThunk(data)).then(() => {
            history.push(`/products/${createdProduct.id}`);
        });
    };
    
        const cancelHandler = (e) => {
        e.preventDefault();
        history.push('/');
        }; 
    
    let category_choices = ["Whole Bean", "Ground Coffee", "Pods", "Drinkware", "Equipment", "Accessories"]
    let quantity_choices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <>
        <div className="form-wrapper">
            <form className="form-container" onSubmit={submit}>
                <div className="errors">
                    {errors.length > 0 &&
                        errors.map((error) => <li key={error}>{error}</li>)}
                </div>
                <label>
                    Select a Category
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    {category_choices.map(choice => (
                        <option
                        key={category}
                        >
                        {category}
                        </option>
                    ))}
                    </select>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <label>
                Select a Quantity
                <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                >
                {quantity_choices.map(choice => (
                    <option
                    key={quantity}
                    >
                    {quantity}
                    </option>
                ))}
                </select>
                </label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image Url"
                />
                <button className="create-product-submit-button" type="submit">Submit</button>
                <button type="button" className="create-product-cancel-button" onClick={cancelHandler}>
                Cancel
                </button>
            </form>
        </div>  
    </>
  );
};

export default CreateProduct;
