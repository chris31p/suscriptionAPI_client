import React, { useState } from 'react'
import UploadCategory from '../components/Category/UploadCategory'

const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false)

    // Aquí no invocas la función directamente, solo la referencias
    const handleOpenUploadCategory = () => {
        setOpenUploadCategory(true);
    }



  return (
    <section>
        <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between'>
            <h2>Categorías</h2>
            <button onClick={handleOpenUploadCategory} className='text-sm border bg-green-400 px-3 py-1 rounded'>Añadir categoría</button>
        </div>
        {
            openUploadCategory && ( 
                <UploadCategory close={()=> setOpenUploadCategory(false)} />
            )
        }
       
    </section>
  )
}

export default CategoryPage