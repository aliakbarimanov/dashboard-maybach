// import react icons
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

// import react hook
import { useEffect, useState } from "react";

// import axios
import axios from "axios";

const ProductsPage = () => {
  useEffect(() => {
    getAllData();
  }, []);

  const [data, setData] = useState([]);

  const getAllData = async () => {
    await axios
      .get("http://localhost:5000/api/v1/maybach")
      .then((res) => setData(res.data))
      .catch((err) => console.warn(err));
  };

  console.log(data);

  return (
    <section className="productsPage">
      <h2 className="productsPageTitle">All products</h2>
      <table>
        <thead>
          <th>No:</th>
          <th>Image</th>
          <th>Name</th>
          <th>Details</th>
          <th>Price</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {data.map((item, ind) => (
            <tr>
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
                <button>
                  <AiFillDelete />
                </button>
                <button>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductsPage;
