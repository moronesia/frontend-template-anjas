import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {

  const [users, setUsers]= useState([]);
  const [filter, setFilter] = useState("");

  useEffect(()=>{
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
    setUsers(response.data);
  };

  const deleteUser = async(id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };


  const searchText = (e) => {
    setFilter(e.target.value);
  };

  let dataSearch = users.filter((item) => {
    return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()));
  });


  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>


      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." value={filter} onChange={(e) => searchText(e)} />
      </div>


      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-left">Price</th>
            <th className="text-left">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataSearch.map((user, index) =>(
            <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.price}</td>
            <td>{user.stock}</td>
            <td className="text-center">
              <Link to={`/detail/${user._id}`} className="btn btn-sm btn-info">Detail</Link>

              <Link to={`/edit/${user._id}`} className="btn btn-sm btn-warning">Edit</Link>

              {/* <Link to={`/edit/${user._id}`}>Edit</Link> */}

              <Link
              onClick={() => deleteUser(user._id)} 
              className="btn btn-sm btn-danger">Delete</Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;