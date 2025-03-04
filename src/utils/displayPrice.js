//Funcion para mostrar los precios en CLP
const displayPrice = (price)=>{
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}

export default displayPrice