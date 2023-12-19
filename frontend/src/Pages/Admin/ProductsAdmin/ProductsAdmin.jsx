import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, deleteProduct, createProduct, updateProduct, getAdminProducts } from '../../../Actions/productActions.js';
import { getCategories } from '../../../Actions/categoryActions.js';
import { DELETE_PRODUCT_RESET, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../../Constants/productsConstants.js';

import ProductForm from './ProductForm.jsx';
import AdminCard from '../AdminCard/AdminCard.jsx';
import Loader from '../../../Components/Loader.jsx';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const ProductsAdmin = () => {

  const dispatch = useDispatch();

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { products, resultPerPage, filteredProductsCount, loading } = useSelector((state) => state.products);

  // for deleting and editing a product
  const [product, setProduct] = useState();

  // Mode
  const [mode, setMode] = useState();

  // Modal states
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { error, success, loadingNew } = useSelector((state) => state.newProduct);
  const { isUpdated, isDeleted, loadingUpdate } = useSelector((state) => state.productsChanges);

  // Form states
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [category, setCategory] = useState();
  const [gender, setGender] = useState();
  const [special, setSpecial] = useState();
  const [brand, setBrand] = useState();
  const [shape, setShape] = useState();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector(state => state.categories);

  // Getting categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])
  
  // Reset states after submission
  // useEffect(() => {
  //   // Reset the form states when the "loadingNew" state changes
  //   if (!loadingNew) {
  //     resetStates();
  //   }
  // }, [loadingNew]);

  // Opening Update modal to inform regarding any error, updates regarding deleting, adding and editing a product
  useEffect(() => {

      if (error) {
          setModalTitle("Error Alert!")
          setModalMessage(error);
          dispatch(clearErrors());
      }
      else
      {
        setModalTitle("Update!");
        if (success) {
          setModalMessage("New product added successfully");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
        else if(isDeleted) {
          setModalMessage("Product deleted successfully")
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
        else if(isUpdated) {
          setModalMessage("Product updated successfully")
          dispatch({ type: UPDATE_PRODUCT_RESET });
        }
      }

      if(modalMessage)
      {
        window.my_modal_5.close();
        window.my_modal_2.close();
        window.my_modal_2.showModal();
      }

  }, [dispatch, error, success, isDeleted, isUpdated, modalMessage]);
  
  // Resetting states once used
  const resetStates = () => {
    setName("");
    setProductCode("");
    setDescription("");
    setPrice(0);
    setStock(0);

    setCategory(undefined);
    setGender(undefined);
    setBrand(undefined);
    setShape(undefined);
    setSpecial(undefined);

    setImages([]);
    setImagesPreview([]);
  }
  
  // Processing images to mek them rneder as preview
  const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);

      files.forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
              if (reader.readyState === 2) {
                  setImagesPreview((old) => [...old, reader.result]);
                  setImages((old) => [...old, reader.result]);
              }
          };

          reader.readAsDataURL(file);
      });
  };

  // Get products on search and whenever changes are made
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getAdminProducts(keyword, currentPage));
  }, [dispatch, keyword, error, currentPage, success, isDeleted, isUpdated]);

  // opening modal and Getting id of product to be deleted
  const delProductId = (product) => {

    // Setting variables for modal
    setProduct(product);
    setMode("delete");
    setModalTitle("Delete Confirmation");
    setModalMessage(product.name);

    window.my_modal_5.close();
    window.my_modal_5.showModal();
  }

  // Opening modal for adding the product
  const openProduct = () => {

    // Setting variables for modal
    setMode("add");
    setModalTitle("Create Product");
    setModalMessage(null);
    window.my_modal_5.close();
    window.my_modal_5.showModal();
  }

  // Opening modal and Getting id of the product to be edited
  const editProductId = (product) => {

    // Setting variables for modal
    setProduct(product);
    setMode("edit");
    setModalTitle("Edit Product");
    setModalMessage(null);

    // Edit variable set
    resetStates();

    window.my_modal_5.close();
    window.my_modal_5.showModal();
  }

  // Submit Handle
  const submitHandle = (e, mode) => {
    if(mode === "add")
    {
      e.preventDefault();
      const myForm = {};

      myForm["name"]=name;
      myForm["productCode"]=productCode;
      myForm["price"]=price;
      myForm["description"]=description;
      myForm["stock"]=stock;
      myForm["category"]=category;
      myForm["gender"]=gender;
      myForm["images"] = images;

      if (shape)
        myForm["shape"]=shape;
      if (brand)
        myForm["brand"]=brand;
      if (special)
        myForm["special"]=special;

      window.my_modal_5.close();

      if(images.length > 4 || images.length === 0)
      {
        setModalMessage("Images can have atleast 1 and atmost 4 images");
        window.my_modal_2.close();
        window.my_modal_2.showModal();
      }
      else
        dispatch(createProduct(myForm));
    }
    else if(mode === "delete" && product)
    {
      dispatch(deleteProduct(product._id));
    }
    else if(mode === "edit" && product)
    {
      e.preventDefault();
      const myForm = {};

      if (name)
        myForm["name"] = name;
      if (productCode)
        myForm["productCode"] = productCode;
      if (price)
      myForm["price"] = price;
      if (description)
      myForm["description"] = description;
      if (stock)
        myForm["stock"] = stock;
      if (category)
        myForm["category"] = category;
      if (gender)
        myForm["gender"] = gender;
      
      if (images.length)
        myForm["images"] = images;
      if (shape)
        myForm["shape"] = shape;
      if (brand)
        myForm["brand"] = brand;
      if (special)
        myForm["special"] = special;

      dispatch(updateProduct(product._id, myForm));
    }
  }

  // Close Handle
  const closeHandle = () => {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: "No Confirmation Given",
    });
    window.my_modal_5.close();
    resetStates();
  }

  return (
    <div className="w-full flex flex-col">

      {/* Modal for addition and updation */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box overflow-y-auto pr-10">
          { mode === "delete" && <h3 className="font-bold text-lg">{modalTitle}</h3>}
          { mode === "delete" && modalMessage && <p className="py-4">Are you sure you want to delete the product <b>{modalMessage}</b></p> }     
          {
            mode === "add" && 
            <ProductForm name={name} productCode={productCode} price={price} stock={stock} desc={description} category={category}
              gender={gender} brand={brand} shape={shape} special={special} 
              categories={categories} setName={setName} setProductCode={setProductCode} setDescription={setDescription}
              setPrice={setPrice} setStock={setStock} setCategory={setCategory} setGender={setGender} setBrand={setBrand}
              setShape={setShape} setSpecial={setSpecial} createProductImagesChange={createProductImagesChange} 
              imagesPreview={imagesPreview} title={modalTitle} />
          }   
          {
           mode === "edit" &&
            <ProductForm name={name} productCode={productCode} price={price} stock={stock} desc={description} category={category}
              gender={gender} brand={brand} shape={shape} special={special} 
              categories={categories} setName={setName} setProductCode={setProductCode} setDescription={setDescription}
              setPrice={setPrice} setStock={setStock} setCategory={setCategory} setGender={setGender} setBrand={setBrand}
              setShape={setShape} setSpecial={setSpecial} createProductImagesChange={createProductImagesChange}
              imagesPreview={imagesPreview} title={modalTitle} product={product} />
          }  
          <div className="modal-action flex justify-between">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary btn-active" onClick={() => closeHandle()}>Close</button>
            { mode === "add" && <button className="btn btn-success btn-active" disabled={loadingNew} onClick={(e) => submitHandle(e, mode)}>Create</button>}
            { mode === "delete" && <button className="btn btn-error btn-active"  disabled={loadingUpdate} onClick={(e) => submitHandle(e, mode)}>Delete</button>}
            { mode === "edit" && <button className="btn btn-neutral btn-active" disabled={loadingUpdate} onClick={(e) => submitHandle(e, mode)}>Change</button>}
          </div>
        </div>
      </dialog>

      {/* Modal for confirmation */}
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{modalMessage}</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <h1 className="font-semibold text-center text-5xl text-slate-600 mb-4 mt-5 ">Products Admin</h1>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex w-full justify-center items-center">
          <div className="flex m-4 pr-2 w-3/4 justify-center items-center align-middle rounded border border-black">
            <input placeholder="Search by name" disabled={loading} className="py-2 px-4 bg-gray-100 outline-none rounded-l text-slate-600 w-full" onChange={(e) => setKeyword(e.target.value)} />
            <span className="pl-3 cursor-pointer"><SearchIcon /></span>
          </div>
          <div className="bg-blue-400 hover:bg-blue-700 rounded-xl min-w-max w-20 text-lg p-2 text-white  justify-center items-center cursor-pointer" onClick={() => openProduct()}><AddIcon />Add</div>
        </div>

        <div className="flex flex-col items-center">
          {loading ? <Loader /> :<div className="flex flex-wrap justify-center items-center gap-5 pt-6 last:mb-8">
            {products && products.map((product, index)=> <AdminCard product={product} key={index} delProductId={delProductId} editProductId={editProductId} />)}
          </div>}

        {/* Pagination */}
          <div className="join my-4">
            <button className="join-item btn bg-slate-600" disabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn bg-slate-600" disabled={resultPerPage > filteredProductsCount} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductsAdmin