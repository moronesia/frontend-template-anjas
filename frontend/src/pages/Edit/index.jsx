import Input from "../../components/Input";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {

  const[name, setName] = useState("");
  const[price, setPrice] = useState("");
  const[stock, setStock] = useState("");
  const {id} = useParams();


  useEffect(() => {
    getUserById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserById = async() => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v4/products/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setStock(response.data.stock);
  };

  const updateUser = async(e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v4/products/${id}`, {
        name,
        price,
        stock
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={updateUser}>
          <Input 
            type="text"  
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Name Product..........."
          />
          <Input 
            type="number"  
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga Product..........."
          />
          <Input 
            type="number"  
            value={stock} 
            onChange={(e) => setStock(e.target.value)}
            placeholder="Jumlah Stock..........."
          />
          <Input 
            name="status" 
            type="checkbox" 
            label="Active" 
          />
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default Edit;