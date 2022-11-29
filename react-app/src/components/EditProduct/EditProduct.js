import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneProductThunk, editProductThunk } from '../../store/product';
import "./EditProduct.css";

const EditProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product.singleProduct)
  const categories = ["Whole Beans", "Ground Coffee", "Pods", "Drinkware", "Equipment", "Accessories"]

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    dispatch(getOneProductThunk(productId))
  }, [dispatch, productId])

  useEffect(() => {
        setName(product.name)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setQuantity(product.quantity)
        setImage(product.image)
  }, [product])

  const submit = (e) => {
    e.preventDefault();
    setErrors([]);

    const data = { category, name, description, price, quantity, image };

    if (!data.name.length) return setErrors(['Name can not be empty.'])
    if (data.name.length > 200) return setErrors(['Name can not be greater than 200 characters.'])
    if (!data.category.length) return setErrors(['Category can not be empty.'])
    if (!data.description.length) return setErrors(['Description can not be empty.'])
    if (!data.price.length && data.price < 0) return setErrors(['Price can not be empty and it must be greater than $0.'])
    if (isNaN(data.price)) return setErrors(['Price must be a number.'])
    if (!data.quantity.length || data.quantity < 0) return setErrors(['Quantity can not be empty and it must be greater than 1.'])
    if (!data.image.length) return setErrors(['Image can not be empty.'])
    if (!data.image.endsWith('.jpg') && !data.image.includes('.jpeg') && !data.image.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);
    
    dispatch(editProductThunk(productId, data)).then(() => {
        history.push(`/`);
        });
    };
    
    const cancelHandler = (e) => {
        e.preventDefault();
        history.push('/');
    }; 
    

    return (
        <>
        <div className="product-form-wrapper">
            <div className="product-form-title">Edit a listing</div>
            <div className="product-form-title2">Add some details about your item. Fill out what you can for now—you’ll be able to edit this later.</div>
            <div className="product-form-title3">Listing details</div>
            <div className="product-form-title4">Tell the world all about your item and why they'll love it.</div>
            <form className="product-form-container" onSubmit={submit}>
                <div className="errors">
                    {errors.length > 0 &&
                        errors.map((error) => <li key={error}>{error}</li>)}
                </div>
                <label className='product-form-label'>Name*</label>
                <input
                    className="product-form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className='product-form-label'>Category*</label>
                <select
                    name={category}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="" disabled>
                        Select a Category
                    </option>
                    {categories.map(category => (
                        <option
                        value={category}
                        >
                        {category}
                        </option>
                    ))}
                </select>
                <label className='product-form-label'>Description*</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className='product-form-label'>Price*</label>
                <input
                    className="product-form-input"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label className='product-form-label'>Quantity*</label>
                <input
                    className="product-form-input"
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label className='product-form-label'>Image*</label>
                <input
                    className="product-form-input"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <div className="product-form-buttons">
                    <button className="product-form-submit-button" type="submit">Submit</button>
                    <button type="button" className="product-form-cancel-button" onClick={cancelHandler}>
                    Cancel
                    </button>
                </div>
            </form>
        </div> 
    </>
  );
};

export default EditProduct;
