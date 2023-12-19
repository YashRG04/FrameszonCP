import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../../Actions/categoryActions';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NEW_CATEGORIES_RESET } from '../../../Constants/categoriesConstants';

const CategoriesAdmin = () => {

  const dispatch = useDispatch();

  // used for modal and for Delete, Add, Update
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [mode, setMode] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories, isChanged } = useSelector(state => state.categories);

  useEffect(()=>{
    dispatch(getCategories());
    dispatch({type: NEW_CATEGORIES_RESET});
  }, [dispatch, isChanged]);

  const createCateImagesChange = (e) => {
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
  // Category Add, Edit and Delete
  const openModal = (props) => {
    setMode(props.mode);
    setLink(props.link);
    if(props.mode==="add")
    {
      setTitle("Add a category");
      setMessage(null);
    }
    else if(props.mode==="delete")
    {
      setMessage(props.category.name)
      setTitle("Delete the category");
      setName(null);
      setCategory(props.category);
    }
    else if(props.mode==="edit")
    {
      setTitle("Edit the category");
      setMessage(null);
      setName(props.category.name);
      setCategory(props.category);
    }
    window.my_modal_5.close();
    window.my_modal_5.showModal();
  }

  const openErrorModal = (props) => {
    if(props.mode === "Error: Regarding Images")
    {
      setTitle(props.mode);
      setMessage("Only one image must be added");
    }
    window.my_modal_2.close();
    window.my_modal_2.showModal();
  }

  const handleSubmit = () => {
    if (mode === "add" && name) {
      // Since shape model has images as required for the front end to work smoothly
      if(link==="shape")
      {
        if(images.length === 1)
          dispatch(createCategory(link, name, images))
        else
          openErrorModal({mode: "Error: Regarding Images"})
      }
      else
        dispatch(createCategory(link, name))
    }
    else if(mode === "delete" && category) {
      dispatch(deleteCategory(link, category._id))
    }
    else if(mode === "edit" && category && name) {
      if(images)
        dispatch(updateCategory(link, category._id, name, images))
      else
        dispatch(updateCategory(link, category._id, name))
    }
  }

  return (
    <div className="w-full flex flex-col overflow-y-scroll">

      {/* Modal is here */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box flex flex-col">
          <h3 className="font-bold text-2xl mb-4">{title}</h3>

          {/* Message */}
          {mode === "delete" && <p className="py-4">Are you sure you want to delete <b>{message}</b></p>}
          
          {mode === "add" &&
            <div>
              <input type="text" required placeholder="Name" formNoValidate className="p-2 w-full box-border border border-black rounded outline-none mb-3" onChange={(e) => setName(e.target.value)} />

              {link === "shape" ? (
                <div>
                  <input
                    formNoValidate
                    onChange={createCateImagesChange}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    required={link==="shape"}
                    className="file-input file-input-bordered w-full"
                    multiple={true} placeholder="Name" />

                  <div id="createCateFormImage" className="flex items-center gap-3 my-2 flex-wrap">
                    {imagesPreview && imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" className="object-contain" />
                    ))}
                  </div>
                </div>) : <></>}

            </div>
          }

          {mode === "edit" &&
            <div>
              <input type="text" placeholder={category.name} className="p-2 w-full box-border border border-black rounded outline-none mb-3" onChange={(e) => setName(e.target.value)} />
              
              {link === "shape" ? (
              <div>
              <input
              onChange={createCateImagesChange}
              type="file"
              name="avatar"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              multiple={true} placeholder="Name" />

              <div id="createCateFormImage" className="flex items-center gap-3 my-2 flex-wrap">
                { imagesPreview && imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" className="object-contain" />
                  ))}
              </div>
            </div>):<></>}
              
            </div> 
          }

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary btn-active" onClick={() => window.my_modal_5.close()}>Close</button>
            <button className="btn btn-error btn-active" onClick={handleSubmit}>{mode}</button>
          </div>

        </form>
      </dialog>

      {/* Error Modal */}
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <h1 className="font-semibold text-center text-5xl text-slate-600 mb-4 mt-4 ">Categories Admin</h1>
      <div className="flex gap-5 p-8">
        <div className="w-full h-96">
          <table className="table">

            {/* Category */}
            <thead className="border border-b-black">
              <tr className="flex flex-col">
                <td className="flex justify-between pb-4">
                  <h2 className="font-medium md:font-semibold text-md md:text-4xl text-slate-700">Category
                    {categories.categories && categories.categories.length > 4 ? <></> : <span className="self-start justify-start text-sm ml-5 text-italic text-red-500">* <u>Note:</u> There must be atleast 4 categories at all times</span>}
                  </h2>
                  <div className="bg-blue-400 hover:bg-blue-700 rounded-3xl min-w-max w-20 text-base p-2 text-white  justify-center items-center cursor-pointer" onClick={()=>openModal({link:"category", mode:"add"})}><AddIcon />Add</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.categories && categories.categories.map((category, index) => 
                <tr key={index} style={{"borderBottomColor":"lightgrey"}}>
                  <td className="flex justify-between items-center text-lg">
                    <div>{category.name}</div>
                    <div className="flex justify-center items-center gap-4">
                      <button className="btn btn-primary btn-active w-max" onClick={() => openModal({ link: "category", mode: "edit", category: category })}><EditIcon />Edit</button>
                      <button className="btn btn-error btn-active w-max" disabled={categories.categories.length > 4 ? false : true} onClick={() => openModal({ link: "category", mode: "delete", category: category })}><DeleteIcon />Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Genders */}
            <thead className="border border-b-black">
              <tr className="flex flex-col mt-10">
                <td className="flex justify-between pb-4">
                  <h2 className="font-medium md:font-semibold text-md md:text-4xl text-slate-700">Gender</h2>
                  <div className="bg-blue-400 hover:bg-blue-700 rounded-3xl min-w-max w-20 text-base p-2 text-white  justify-center items-center cursor-pointer" onClick={() => openModal({ link: "gender", mode: "add" })}><AddIcon />Add</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.genders && categories.genders.map((gender, index) =>
                <tr key={index} style={{ "borderBottomColor": "lightgrey" }}>
                  <td className="flex justify-between items-center text-lg">
                    <div>{gender.name}</div>
                    <div className="flex justify-center items-center gap-4">
                      <button className="btn btn-primary btn-active w-max" onClick={() => openModal({ link: "gender", mode: "edit", category: gender })}><EditIcon />Edit</button>
                      <button className="btn btn-error btn-active w-max" disabled={(gender.name === "Women" || gender.name === "Men" || gender.name === "Kids")? true: false} onClick={() => openModal({ link: "gender", mode: "delete", category: gender })}><DeleteIcon />Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Brands */}
            <thead className="border border-b-black">
              <tr className="flex flex-col mt-10">
                <td className="flex justify-between pb-4">
                  <h2 className="font-medium md:font-semibold text-md md:text-4xl text-slate-700">Brand</h2>
                  <div className="bg-blue-400 hover:bg-blue-700 rounded-3xl min-w-max w-20 text-base p-2 text-white  justify-center items-center cursor-pointer" onClick={() => openModal({ link: "brand", mode: "add" })}><AddIcon />Add</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.brands && categories.brands.map((brand, index) =>
                <tr key={index} style={{ "borderBottomColor": "lightgrey" }}>
                  <td className="flex justify-between items-center text-lg">
                    <div>{brand.name}</div>
                    <div className="flex justify-center items-center gap-4">
                      <button className="btn btn-primary btn-active w-max" onClick={() => openModal({ link: "brand", mode: "edit", category: brand })}><EditIcon />Edit</button>
                      <button className="btn btn-error btn-active w-max" onClick={() => openModal({ link: "brand", mode: "delete", category: brand })}><DeleteIcon />Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Shape */}
            <thead className="border border-b-black">
              <tr className="flex flex-col mt-10">
                <td className="flex justify-between pb-4">
                  <h2 className="font-medium md:font-semibold text-md md:text-4xl text-slate-700">Shape
                    {categories.shapes && categories.shapes.length > 4 ? <></> : <span className="self-start justify-start text-sm ml-5 text-italic text-red-500">* <u>Note:</u> There must be atleast 4 shapes at all times</span>}
                  </h2>
                  <div className="bg-blue-400 hover:bg-blue-700 rounded-3xl min-w-max w-20 text-base p-2 text-white  justify-center items-center cursor-pointer" onClick={() => openModal({ link: "shape", mode: "add" })}><AddIcon />Add</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.shapes && categories.shapes.map((shape, index) =>
                <tr key={index} style={{ "borderBottomColor": "lightgrey" }}>
                  <td className="flex justify-between items-center text-lg">
                    <div>{shape.name}</div>
                    <div className="flex justify-center items-center gap-4">
                      <button className="btn btn-primary btn-active w-max" onClick={() => openModal({ link: "shape", mode: "edit", category: shape })}><EditIcon />Edit</button>
                      <button className="btn btn-error btn-active w-max" disabled={categories.shapes.length > 4 ? false : true} onClick={() => openModal({ link: "shape", mode: "delete", category: shape })}><DeleteIcon />Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            
            {/* Special */}
            <thead className="border border-b-black">
              <tr className="flex flex-col mt-10">
                <td className="flex justify-between pb-4">
                  <h2 className="font-medium md:font-semibold text-md md:text-4xl text-slate-700">Special</h2>
                  <div className="bg-blue-400 hover:bg-blue-700 rounded-3xl min-w-max w-20 text-base p-2 text-white  justify-center items-center cursor-pointer" onClick={() => openModal({ link: "special", mode: "add" })}><AddIcon />Add</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.specials && categories.specials.map((special, index) =>
                <tr key={index} style={{ "borderBottomColor": "lightgrey" }}>
                  <td className="flex justify-between items-center text-lg">
                    <div>{special.name}</div>
                    <div className="flex justify-center items-center gap-4">
                      <button className="btn btn-primary btn-active w-max" disabled={(special.name === "Best Seller") ? true : false} onClick={() => openModal({ link: "special", mode: "edit", category: special })}><EditIcon />Edit</button>
                      <button className="btn btn-error btn-active w-max" disabled={(special.name === "Best Seller") ? true : false} onClick={() => openModal({ link: "special", mode: "delete", category: special })}><DeleteIcon />Delete</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        {/* <div className="h-[0.1rem] md:h-1 w-40 self-center bg-gradient-to-r from-white to-white via-slate-500"></div> */}
        </div>
      </div>
    </div>
  )
}

export default CategoriesAdmin