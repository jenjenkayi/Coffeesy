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

    if (!data.category.length) return setErrors(['Category can not be empty.'])
    if (!data.name.length) return setErrors(['Name can not be empty.'])
    if (!data.description.length) return setErrors(['Description can not be empty.'])
    if (!data.price.length) return setErrors(['Price can not be empty.'])
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
        {user && <div className="form-wrapper">
            <h1>Edit a listing</h1>
            <form className="form-container" onSubmit={submit}>
                <div className="errors">
                    {errors.length > 0 &&
                        errors.map((error) => <li key={error}>{error}</li>)}
                </div>
                <span>Name*</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <span>Category*</span>
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
                <span>Description*</span>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <span>Price*</span>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <span>Quantity*</span>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <span>Image*</span>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button className="create-product-submit-button" type="submit">Submit</button>
                <button type="button" className="create-product-cancel-button" onClick={cancelHandler}>
                Cancel
                </button>
            </form>
        </div>}  
    </>
  );
};

export default EditProduct;
