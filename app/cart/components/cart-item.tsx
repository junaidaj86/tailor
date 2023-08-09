import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Shirt, Pant } from "@/types";
import QuantitySelector from "@/components/ui/QuantitySelector";

interface CartItemProps {
  data: Shirt | Pant;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeShirt(data.id);
  };
  const handleIncrement = () => {
    cart.incrementShirtCount(data.id);
    //cart.incrementItem(data.id); // Add your own logic to increment the item in the cart
  };

  const handleDecrement = () => {
   // cart.decrementItem(data.id); // Add your own logic to decrement the item in the cart
  };

  console.log("====="+ JSON.stringify(data, undefined ,2))

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <QuantitySelector
            quantity={data.quantity + 1} // Assuming you have a "quantity" property in your data object
            onIncrement={handleIncrement}
            onDecrement={onRemove}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.cuff}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.chestSize}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.fit}</p>
          </div>
          {/* <Currency value={data.price} /> */}
         
        </div>

      </div>
    </li>
  );
};

export default CartItem;
