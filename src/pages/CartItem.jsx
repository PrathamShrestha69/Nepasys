import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cartSlice";

const CartItem = () => {
  const items = useSelector((s) => s.cart.items || []);
  const dispatch = useDispatch();

  const total = items.reduce(
    (s, i) => s + (i.price || 0) * (i.quantity || 1),
    0
  );

  const checkout = () => {
    return () => {
      alert("CProceeding to checkout...");
      dispatch(clearCart())
    };
}

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Cart</h2>
      {items.length === 0 && <p>Your cart is empty</p>}
      {items.map((it) => (
        <div key={it.id} className="flex items-center gap-4 p-2 border-b">
          {it.thumbnail && (
            <img
              src={it.thumbnail}
              alt={it.title}
              className="w-20 h-20 object-contain"
            />
          )}
          <div className="flex-1">
            <div className="font-bold">{it.title}</div>
            <div>${it.price}</div>
          </div>
          <div>
            <input
              type="number"
              min="1"
              value={it.quantity}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: it.id,
                    quantity: Number(e.target.value),
                  })
                )
              }
              className="input input-sm w-20"
            />
          </div>
          <button
            onClick={() => dispatch(removeFromCart(it.id))}
            className="btn btn-ghost"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
      <div className="flex flex-row gap-4">
        <button
          onClick={checkout()}
          className="btn btn-primary mt-4"
        >
          Checkout
        </button>
        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="btn btn-error mt-4"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
