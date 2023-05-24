/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurant } from "../reducers/restaurantSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header2";
import FoodCard from "../components/common/FoodCards";
import Footer from "../components/common/Footer";

function RestaurantDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { restaurantData, restaurantLoading, restaurantError } = useSelector(
    (state: any) => state.restaurant
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchRestaurant(id));
  }, [id]);
  return (
    <>
      <Header />
      {restaurantLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : restaurantError ? (
        <h3>something went wrong</h3>
      ) : (
        <div className="restaurant-detail">
          <div className="vendor-responsive-banner">
            <img
              className="vendor-responsive-banner__image"
              src={restaurantData?.imageSrc}
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold">{restaurantData?.name}</h2>
            <div className="tags flex items-center flex-wrap gap-3 my-2">
              {restaurantData?.tags.map((tag: string, idx: number) => (
                <span
                  className="inline-flex items-center rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700"
                  key={idx}
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                <svg
                  className="h-1.5 w-1.5 fill-green-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Open
              </span>
            </div>
            <div className="flex items-center">
              <div className="text-base text-yellow-500">
                {restaurantData?.price}
              </div>
            </div>
          </div>
          <div className="p-5">
            <FoodCard menuItems={restaurantData?.menuItems} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default RestaurantDetail;
