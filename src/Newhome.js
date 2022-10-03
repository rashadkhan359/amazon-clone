import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Newhome.css";
import Product from "./Product";
import Slideshow from "./Slideshow";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductsData() {
      const productsRef = collection(db, "Products");
      const q = query(productsRef);
      const querySnapshot = await getDocs(q);
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log("Got Products>>", products);
    }
    fetchProductsData();
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <Slideshow />
        <div className="home__row">
            {products?.map(product =>(
                <div className="home__row__products">
                    <Product product={product}/>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
