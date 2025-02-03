/*import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);

  // Wrap fetchCart in useCallback to prevent unnecessary re-renders
  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(response.data?.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  }, [userId]); // Only re-create fetchCart when userId changes

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // Now the warning will be resolved

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
              <div className="cart-info">
        <span>Cart: {cartCount} items</span>
      </div>
      )}


    </div>
  );
};

export default Cart;
*/