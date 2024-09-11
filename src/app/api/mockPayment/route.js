import { Ticket } from "@/models/Ticket";
import { Reservation } from "@/models/Reservation";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import authOptions from "@/libs/authOptions";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Reservation.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  let totalPrice = 0;
  for (const cartProduct of cartProducts) {
    const productInfo = await Ticket.findById(cartProduct._id);

    if (!productInfo) {
      throw new Error(`Product with ID ${cartProduct._id} not found`);
    }

    let productPrice = productInfo.basePrice || 0;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
      if (size) {
        productPrice += size.price;
      }
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
        if (extraThingInfo) {
          productPrice += extraThingInfo.price;
        }
      }
    }

    totalPrice += productPrice;
  }

  orderDoc.paid = true;
  await orderDoc.save();

  return new Response(JSON.stringify({ success: true, orderId: orderDoc._id }), { status: 200 });
}
