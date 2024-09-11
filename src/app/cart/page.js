'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/tickets/CartProduct";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from '../../components/UseProfile';
import AddressInputs from '../../components/layout/AddressInputs';
import MockPaymentPopup from '../../components/MockPaymentPopup';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = { phone, streetAddress, city, postalCode, country };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }

  function handlePaymentSuccess(orderId) {
    window.location.href = `/reservations/${orderId}?clear-cart=1`;
  }

  function proceedToCheckout(ev) {
    ev.preventDefault();
    setShowPopup(true);
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && <div>No products in your shopping cart</div>}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              index={index}
              onRemove={removeCartProduct}
            />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}<br />
              $5<br />
              ${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <MockPaymentPopup
          address={address}
          cartProducts={cartProducts}
          onClose={() => setShowPopup(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
}
