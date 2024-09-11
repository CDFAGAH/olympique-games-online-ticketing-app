import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";  // Default import without braces
import Image from "next/image";
import QRCode from "qrcode.react";

export default function CartProduct({ product, index, onRemove, qrCode }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={''} />
        {/* Add QR code below the image */}
        <div className="flex justify-center mt-2">
          <QRCode value={qrCode} size={96} />
        </div> 
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} ${extra.price}</div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        ${cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2">
            <Trash />  {/* Trash icon */}
          </button>
        </div>
      )}
    </div>
  );
}
