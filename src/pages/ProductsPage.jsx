// import react icons
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

// import sweet alert
import Swal from "sweetalert2";

// import react hook
import { useEffect, useState } from "react";

// import react router dom
import { Link } from "react-router-dom";

// import axios
import axios from "axios";

const ProductsPage = () => {
  const [searchNotification, setSearchNotification] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await axios
      .get("http://localhost:5000/api/v1/maybach")
      .then((res) => setData(res.data))
      .catch((err) => console.warn(err));
  };

  // delete function
  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/v1/maybach/${id}`)
      .then((res) => {
        setData(res.data);
        Swal.fire({
          title: "Məhsul uğurla silindi!",
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  // search function
  const searchFunction = (e) => {
    if (e.target.value) {
      const updatedData = data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(updatedData);
      if (updatedData.length === 0) {
        setSearchNotification(true);
      }
    } else {
      getAllData();
    }
  };

  return (
    <section className="productsPage">
      <h2 className="productsPageTitle">Products</h2>
      <input
        type="search"
        className="searchInp"
        placeholder="Search..."
        onChange={searchFunction}
      />
      {searchNotification ? (
        <h2 className="searchNotification">
          Axtarışınıza uyğun nəticə tapılmadı!
        </h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No:</th>
              <th>Image</th>
              <th>Name</th>
              <th>Details</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, ind) => (
              <tr key={ind}>
                <td>{ind + 1}.</td>
                <td className="img">
                  <img
                    src={`http://localhost:5000/${item.productImage}`}
                    alt={`${item.name} image`}
                  />
                </td>
                <td>{item.name}</td>
                <td className="details">{item.details}</td>
                <td className="price">{item.price} $</td>
                <td className="actions">
                  <button onClick={() => deleteProduct(item.id)}>
                    <AiFillDelete />
                  </button>
                  <Link to={`/edit-product/${item.id}`}>
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ProductsPage;
