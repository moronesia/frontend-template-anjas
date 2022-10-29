import React, {useState} from "react";
import axios from "axios";
import Input from '../../components/Input';
import './index.scss';

const TambahProducts = () => {

  const[name, setName] = useState("");
  const[price, setPrice] = useState("");
  const[stock, setStock] = useState("");


  const tambahProduct = async(e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/products`, {
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
        <form onSubmit={tambahProduct}>
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
            Simpan
          </button>
        </form>
      </div>
    </div>
  )
}

export default TambahProducts;