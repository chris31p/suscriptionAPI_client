import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='m-16 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-red-800 font-bold text-lg text-center'>Cancelar pedido</p>
        <Link to="/" className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1">Ir a la página principal</Link>
    </div>
  )
}

export default Cancel