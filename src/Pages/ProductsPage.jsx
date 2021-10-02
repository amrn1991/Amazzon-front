import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/productsReducer";
import { saveProduct } from "../redux/productSaveReducer";
import { deleteProduct } from "../redux/productDeleteReducer";
import LoadingBox from "../comps/LaodingBox";
import AlertBox from "../comps/AlertBox";

const ProductsPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const { products } = useSelector((state) => state.productsList);
  const {
    loading: loadingSave,
    error: errorSave,
    success: successSave,
  } = useSelector((state) => state.savedProduct);
  const { success: successDelete } = useSelector(
    (state) => state.deleteProduct
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const handleDelete = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const openModal = (product) => {
    setModalShow(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  useEffect(() => {
    if (successSave) {
      setModalShow(false);
    }
    dispatch(listProducts());
    
  }, [dispatch, successSave, successDelete]);

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalShow && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <LoadingBox />}
                {errorSave && <AlertBox>{errorSave}</AlertBox>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={image || ""}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={brand || ""}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="text"
                  id="countInStock"
                  name="countInStock"
                  value={countInStock || ""}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={category || ""}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>

              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
                <button
                  type="submit"
                  className="button secondary"
                  onClick={() => setModalShow(false)}
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
