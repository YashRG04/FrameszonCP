import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminCard = ({product, delProductId, editProductId}) => {
  return (
    <div className="card w-96 h-96 bg-base-100 shadow-xl">
        {product.images.length && <figure className="w-full"><img src={product.images[0].url} alt="Shoes" className="w-full object-cover"/></figure>}
        <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <div className="card-actions justify-between mt-5">
                <button className="btn btn-primary btn-active w-max" onClick={() => editProductId(product)}><EditIcon />Edit</button>
                <button className="btn btn-error btn-active w-max" onClick={()=> delProductId(product)}><DeleteIcon />Delete</button>
            </div>
        </div>
    </div>
  )
}

export default AdminCard