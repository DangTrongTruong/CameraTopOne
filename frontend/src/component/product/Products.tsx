import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../slice/productSlice";
import Loader from "../layout/loader/Loader";
import ProductCard from "../home/ProductCard";
import Slider from "@material-ui/core/Slider";
import { useParams } from "react-router";
import { IProduct } from '../../model/Product'
import {dataFormProductList} from '../../model/Product'
const categories = [
  "Canon",
  "Nikon",
  "Sony",
  "Fujifilm",
  "Olympus",
  "Pentax",
  "Kodak",
];
type dataForm = {
  data:dataFormProductList
}
const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {keyword=""} = useParams();
  const { products, loading } = useSelector((state: any) => state.productStore);
console.log(keyword)
  const priceHandler = (
    e: React.SyntheticEvent<EventTarget>,
    newPrice:any
  ) => {
    setPrice(newPrice);
  };
  const data = {
    keyword,
    price,
    category,
    ratings,
  };
  useEffect(() => {
    dispatch(getProductList(data));
  }, [dispatch, keyword, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="productsContainer">
            <div>
              <div className="filterBox">
                <h2>Price</h2>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />

                <h2>Categories</h2>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <h2>Ratings Above</h2>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating: any) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
            </div>
            <div className="products">
              {products &&
                products.map((product:IProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
