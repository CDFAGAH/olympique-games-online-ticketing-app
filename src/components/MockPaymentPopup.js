'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CartContext } from '@/components/AppContext';

export default function MockPaymentPopup({ address, cartProducts, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useContext(CartContext);
  const router = useRouter();

  async function handlePayment() {
    setLoading(true);

    try {
      const res = await fetch('/api/mockPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, cartProducts }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Payment successful!');
        clearCart();
        onSuccess(data.orderId);
        router.push('/reservations');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2>Confirm Payment</h2>
        <p>Are you sure you want to proceed with the payment?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
