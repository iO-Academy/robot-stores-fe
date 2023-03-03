import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <h1>Products</h1>
  );
}

export default Products;
