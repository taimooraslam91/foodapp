import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header2";
import Footer from "../components/common/Footer";

function RestaurantDetail() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `http://localhost:5000/api/restaurants/${id}`
  );
  return (
    <>
      <Header />
      {loading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : error ? (
        <h3>something went wrong</h3>
      ) : (
        <div className="restaurant-detail">
          <div className="vendor-responsive-banner">
            <img
              className="vendor-responsive-banner__image"
              src={data?.imageSrc}
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold">{data?.name}</h2>
            <div className="tags flex items-center flex-wrap gap-3 my-2">
              {data.tags.map((tag: string) => (
                <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
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
              <div className="text-base text-yellow-500">{data.price}</div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default RestaurantDetail;
