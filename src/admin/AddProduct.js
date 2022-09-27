import React, { useState } from "react";
import "./AddProduct.css";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(""); //for file type that are not image
  const [uploadError, setUploadError] = useState(""); //for file type that are not image

  const validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && validImageTypes.includes(selectedFile.type)) {
        console.log("called", selectedFile.type);
        setImage(selectedFile);
        setImageError("");
      } else {
        console.log("called insed", selectedFile.type);
        setImage(null);
        setImageError("Please select a valid image file type!");
      }
    } else {
      console.log("Please select file!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `product-images/${image.name}`);
    console.log("Got the refrence!");
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log("Trying Progress~~~");
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        console.log("Uploaded a file!");
      })
      .catch((error) => setUploadError(error.message));

    getDownloadURL(storageRef)
      .then(async (url) => {
        console.log("Getting Url~~~~~");
        //NoSQL Type retrieval of data
        try {
            const docRef = await addDoc(collection(db, "Products"), {
            title: title,
            desc: desc,
            price: price,
            url: url,
          }).then(() => {
            setSuccessMsg("KUDOS!!... Product added succesfully!");
            setTitle("");
            setDesc("");
            setPrice("");
            document.getElementById("file").value = "";
            setImageError("");
            setUploadError("");
            setTimeout(() => {
              setSuccessMsg("");
            }, 3000);
          });
        } catch (e) {
          console.error("Error adding orders to database: ", e);
          setUploadError("Error adding orders to database");
        }
        // Or inserted into an <img> element
        // const img = document.getElementById("myimg");
        // img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
        setUploadError("Try Catch Block Error. Failed to add orders to database.");
      });
  };
  return (
    <div className="addProducts">
      {successMsg && (
        <>
          <div className="addProducts__successMsg"></div>
        </>
      )}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h5>Product Title</h5>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <h5>Product Description</h5>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <h5>Product Price</h5>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <h5>Product Image</h5>
        <input type="file" id="file" onChange={handleProductImage} required />
        {imageError && (
          <>
            <div className="addProducts__imageError">{imageError}</div>
          </>
        )}
        <button>Add to Database</button>
      </form>
      {uploadError && (
        <>
          <div className="addProducts__uploadError">{uploadError}</div>
        </>
      )}
    </div>
  );
}

export default AddProduct;
