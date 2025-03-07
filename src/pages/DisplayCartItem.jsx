import React from "react";
import { CgCloseR } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayPriceInCLP from "../utils/displayPrice";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddCartBtn";
import imageEmpty from "../assets/empty_cart.png";
import toast from "react-hot-toast";
import priceWithDiscount from "../utils/priceWithDiscount"

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("user details", user)

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Por favor inicie sesión");
  };
  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Carrito de compras</h2>
          <Link to={"/"} className="lg:hidden">
            <CgCloseR size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <CgCloseR size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/***display items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Tus ahorros totales</p>
                <p>{DisplayPriceInCLP(notDiscountTotalPrice - totalPrice)}</p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] && ( 
                  cartItem.map((item) => {
                    return (
                      <div
                        key={item?._id + "DisplayCartItem"}
                        className="flex  w-full gap-4"
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {DisplayPriceInCLP(
                              priceWithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  }))}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Detalles de la compra</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Total artículos</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInCLP(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInCLP(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Cantidad total</p>
                  <p className="flex items-center gap-2">{totalQty} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Valor de envío</p>
                  <p className="flex items-center gap-2">Gratis</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Total</p>
                  <p>{DisplayPriceInCLP(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center pb-6">
              <img
                src={imageEmpty}
                className="w-28 h-24 my-2 object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded font-semibold"
              >
                Compra ahora
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInCLP(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Procesar el pago
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
