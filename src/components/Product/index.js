import {useEffect, useState} from "react";
import "./Product.css"
import {useParams} from "react-router-dom";
import {formatCurrency} from "../../utils/formatters";
import {removeSubstring, removeLastCharacter} from "../../utils/str";

const Product = () => {
  const [product, setProduct] = useState({});
  const {id} = useParams();

  const fetchData = async () => {
    console.log('fetchData()');
    const response = await fetch(`http://localhost:3001/products/${id}`);

    if (!response.ok) {
      throw new Error('Data could not be fetched!');
    }

    return await response.json();
  }

  useEffect(() => {
    console.log('useEffect()');
    fetchData()
      .then((productData) => {
        console.table(productData.data);
        setProduct(productData.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const formatH2 = () => {
    const category = removeLastCharacter(product.category);
    return removeSubstring(product.title, category);
  }

  return (
    <div className="product-page">
      <div className="image-container">
        <img src={product.image} alt={`${product.title}`}></img>
      </div>
      <div className="product-details">
        <h1>{product.title}</h1>
        <p className="h1-like">{formatCurrency(product.price, 'en-US', 'USD')}</p>
        <p>{product.description}</p>
        <h2>
          {product.category && formatH2()}
        </h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default Product;
