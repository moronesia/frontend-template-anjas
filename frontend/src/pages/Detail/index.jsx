import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.scss';



const Detail = () => {

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const {id} = useParams();

  useEffect(() => {
    getUserById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setStock(response.data.stock);
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>Name</td>
            <td>: {name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;