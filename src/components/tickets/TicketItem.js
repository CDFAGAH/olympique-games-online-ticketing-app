import { useState, useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import QRCode from 'qrcode.react';

export default function TicketItem({ _id, type, basePrice, numberOfPlaces, qrCode, key, image, category, event }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  async function handleAddToCartButtonClick() {
    console.log('add to cart');
    addToCart({ _id, type, basePrice, numberOfPlaces, qrCode, key, image, category, event });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
    toast.success('Added to cart');
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-lg max-w-md"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src={image} alt={type} width={300} height={300} />
              </div>
              <p className="text-amber-300 font-bold">Ticket Type:</p>
              <h2 className="text-lg font-bold">{type}</h2>
              <p className="text-amber-300 font-bold">Category:</p>
              <p className="text-amber-300">{category}</p>
              <p className="text-amber-300 font-bold">Event:</p>
              <p className="text-amber-300">{event}</p>
              <p className="text-amber-300 font-bold">Price:</p>
              <h2 className="text-amber-300">${basePrice}</h2>
              <p className="text-amber-300 font-bold">Number of Places:</p>
              <p className="text-amber-300">{numberOfPlaces}</p>
              <div className="mt-4 flex justify-center">
                <button
                  className="primary bg-amber-200 text-white py-2 px-4 rounded"
                  onClick={handleAddToCartButtonClick}
                >
                  Add to cart
                </button>
                <button className="ml-2 text-amber-300" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-amber-300 font-bold">QR Code:</p>
                <div className="flex justify-center">
                  <QRCode value={qrCode} size={96} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-amber-100 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
        onClick={() => setShowPopup(true)}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src={image} alt={type} width={150} height={150} />
          </div>
          <p className="text-amber-300 font-bold">Ticket Type:</p>
          <h4 className="font-semibold text-xl">{type}</h4>
          <p className="text-amber-300 font-bold">Category:</p>
          <p className="text-amber-300 text-sm">{category}</p>
          <p className="text-amber-300 font-bold">Event:</p>
          <p className="text-amber-300 text-sm">{event}</p>
          <p className="text-amber-300 font-bold">Price:</p>
          <h4 className="font-semibold text-xl">${basePrice}</h4>
          <p className="text-amber-300 font-bold">Number of Places:</p>
          <p className="text-amber-300 text-sm">{numberOfPlaces}</p>
          <div className="mt-4 text-center">
            <p className="text-amber-300 font-bold">QR Code:</p>
            <div className="flex justify-center">
              <QRCode value={qrCode} size={96} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}