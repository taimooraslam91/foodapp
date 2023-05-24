import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  removeFromCart,
  storeCartItems,
  increaseQuantity,
  decreaseQuantity,
} from "../../reducers/cartSlice";

type SetOpen = (value: boolean) => void;
interface CartProps {
  open?: boolean;
  setOpen: SetOpen;
}

export default function SideCart({ open, setOpen }: CartProps) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: any) => state.cart);
  const subtotal = cartItems.reduce((total: number, item: any) => {
    const itemSubtotal = item.quantity * item.product.price;
    return total + itemSubtotal;
  }, 0);

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item.product.id));
    dispatch(storeCartItems());
  };

  const increaseItem = (item: any) => {
    dispatch(increaseQuantity(item?.product.id));
    dispatch(storeCartItems());
  };

  const decreaseItem = (item: any) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item?.product.id));
      dispatch(storeCartItems());
    } else {
      handleRemoveItem(item);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems?.map((item: any, idx: number) => (
                              <li key={idx} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item?.product.image}
                                    alt={item?.product.description}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{item?.product.name}</p>
                                      </h3>
                                      <p className="ml-4">
                                        Rs.{" "}
                                        {item?.product.price * item?.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 truncate">
                                      {item?.product.restaurant}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center gap-2 my-1">
                                      <button
                                        className="font-medium rounded-md bg-pink-600 text-white h-6 w-6 leading-normal flex items-center justify-center"
                                        onClick={() => decreaseItem(item)}
                                      >
                                        <AiOutlineMinus />
                                      </button>
                                      <p>{item?.quantity}</p>
                                      <button
                                        className="font-medium rounded-md bg-pink-600 text-white h-6 w-6 leading-normal flex items-center justify-center"
                                        onClick={() => increaseItem(item)}
                                      >
                                        <AiOutlinePlus />
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-pink-600 hover:text-pink-500"
                                        onClick={() => handleRemoveItem(item)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs. {subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-pink-600 hover:text-pink-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
