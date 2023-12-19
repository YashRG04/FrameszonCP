import React from 'react'

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CategoryIcon from '@mui/icons-material/Category';
import SourceIcon from '@mui/icons-material/Source';
import TagIcon from '@mui/icons-material/Tag';

const ProductForm = ({name, productCode, price, stock, desc, category, brand, special, shape, gender, categories, setName, setProductCode, setPrice, setStock, setDescription, setCategory, 
        setGender, setBrand, setShape, setSpecial, createProductImagesChange, imagesPreview, title, product
    }) => {
  return (
      <div className="w-full flex-row items-center justify-center rounded-md dark:text-white" encType="multipart/form-data" >

          <h1 className="text-3xl font-bold mb-3 text-center">{title}</h1>
          <hr className="mb-3" />
          <span className="text-red-600">* Marked are mandatory to be filled</span>

          {/* Name */}
          <div className="flex w-100 items-center gap-3 my-3">
              <span className="text-red-600 absolute translate-x-4 -translate-y-2">*</span><SpellcheckIcon />
              <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={ product ? product.name: "Product Name"}
                  required
                  name="name"
                  className="p-2 w-full box-border border border-black rounded outline-none"
                  />
          </div>

          {/* Product Code */}
          <div className="flex w-100 items-center gap-3 my-3">
              <span className="text-red-600 absolute translate-x-4 -translate-y-2">*</span><SourceIcon />
              <input
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  type="text"
                  placeholder={ product ? product.productCode : "Product Code"}
                  required
                  name="productCode"
                  className="p-2 w-full box-border border border-black rounded outline-none"
              />
          </div>

          {/* Price and Stock */}
          <div className="flex w-100 items-center gap-3 my-3">
              <span className="text-red-600 absolute translate-x-4 -translate-y-2">*</span><CurrencyRupeeIcon />
              <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder={ product ? product.price:"Price"}
                  required
                  name="price"
                  className="p-2 w-full box-border border border-black rounded outline-none"
              />
              <span className="text-red-600 absolute translate-x-80 -translate-y-3">*</span><Inventory2Icon />
              <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  placeholder={ product ? product.stock : "Stock"}
                  required
                  name="stock"
                  className="p-2 w-full box-border border border-black rounded outline-none"
              />
          </div>

          {/* Product Desc */}
          <div className="flex w-100 items-center gap-3 my-3">
              <span className="text-red-600 absolute translate-x-4 -translate-y-3">*</span><DescriptionIcon />
              <textarea
                  value={desc}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={ product ? product.description : "Product Description"}
                  required
                  name="description"
                  className="p-2 w-full box-border border border-black rounded outline-none"
                  cols="30"
                  rows="1"
              ></textarea>
          </div>

          {/* Category and Gender*/}
          <div className="flex w-100 items-center gap-3 my-3">
              <span className="text-red-600 absolute translate-x-4 -translate-y-3">*</span><AccountTreeIcon />
              <select
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  name="category"
                  className="p-2 w-full box-border border border-black rounded outline-none">
                  <option selected={(category || (product && product.category))?false:true} >Choose Category</option>
                  {
                      categories.categories && categories.categories.map((category, index) =>
                          <option key={index} value={category._id} selected={product && category._id === product.category}>{category.name}</option>
                      )
                  }
              </select>
              <select
                  onChange={(e) => setGender(e.target.value)}
                  required
                  name="gender"
                  className="p-2 w-full box-border border border-black rounded outline-none">
                  <option selected={(gender || (product && product.gender))?false:true}>Choose Gender</option>
                  {
                      categories.genders && categories.genders.map((gender, index) =>
                          <option key={index} value={gender._id} selected={product && gender._id === product.gender}>{gender.name}</option>
                      )
                  }
              </select>
          </div>

          {/* Shape and Brand */}
          <div className="flex w-100 items-center gap-3 my-3">
              <CategoryIcon />
              <select
                  onChange={(e) => setShape(e.target.value)}
                  name="shape"
                  className="p-2 w-full box-border border border-black rounded outline-none">
                  <option selected={(shape || (product && product.shape))?false:true}>Choose Shape</option>
                  {
                      categories.shapes && categories.shapes.map((shape, index) =>
                          <option key={index} value={shape._id} selected={product && shape._id === product.shape}>{shape.name}</option>
                      )
                  }
              </select>
              <select
                  onChange={(e) => setBrand(e.target.value)}
                  name="brand"
                  className="p-2 w-full box-border border border-black rounded outline-none">
                  <option selected={(brand || (product && product.brand))?false:true}>Choose Brand</option>
                  {
                      categories.brands && categories.brands.map((brand, index) =>
                          <option key={index} value={brand._id} selected={product && brand._id === product.brand}>{brand.name}</option>
                      )
                  }
              </select>
          </div>

          {/* Special Category */}
          <div className="flex w-100 items-center gap-3 my-3">
              <TagIcon />
              <select
                  onChange={(e) => setSpecial(e.target.value)}
                  name="special"
                  className="p-2 w-full box-border border border-black rounded outline-none">
                  <option selected={(special || (product && product.special))?false:true}>Choose Special Category</option>
                  {
                      categories.specials && categories.specials.map((special, index) =>
                          <option key={index} value={special._id} selected={product && special._id === product.special}>{special.name}</option>
                      )
                  }
              </select>
          </div>

          {/* Images */}
          <div className="flex-row w-100 items-center justify-center gap-2 my-2">

              <div id="createProductFormFile" className="flex w-100 items-center gap-3 my-1 ml-8">
                  <input
                      onChange={createProductImagesChange}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      required={!product}
                      className="file-input file-input-bordered w-full"
                      multiple
                  />
              </div>

              <div id="createProductFormImage" className="flex items-center gap-3 my-2 flex-wrap">
                { 
                    (imagesPreview && imagesPreview.length) ? imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" className="object-contain" />
                    )):
                    (   
                        product && product.images.map((image, index) => (
                            <img key={index} src={image.url} alt="Product Preview" className="object-contain" />
                    )))
                }
              </div>

          </div>

      </div>
  )
}

export default ProductForm