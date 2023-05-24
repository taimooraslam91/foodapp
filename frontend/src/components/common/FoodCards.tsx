import { useDispatch } from "react-redux";
import { FoodCardProps, FoodItem } from "../../interfaces";
import { addToCart, storeCartItems } from "../../reducers/cartSlice";

export default function FoodCard({ menuItems }: FoodCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (item: FoodItem) => {
    dispatch(addToCart({ product: item, quantity: 1 }));
    dispatch(storeCartItems());
  };
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {menuItems?.map((foodItem: FoodItem) => (
        <li key={foodItem.id} className="col-span-1 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-lg font-medium text-gray-900">
                  {foodItem.name}
                </h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {foodItem.category}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {foodItem.description}
              </p>
              <div className="flex items-center">
                <p className="mt-1 truncate text-sm font-semibold text-gray-700 me-1.5">
                  Rs.
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-gray-700">
                  {foodItem.price}
                </p>
              </div>
            </div>
            <img
              className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-300 object-cover object-center"
              src={foodItem.image}
              alt=""
            />
          </div>
          <div className="p-6 pt-0">
            <button
              className="w-full only:rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              onClick={() => handleAddToCart(foodItem)}
            >
              Add to Cart
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
