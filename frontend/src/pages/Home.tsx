import { useState, ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Loader from "../components/common/Loader";
import CardList from "../components/common/CardList";
import Footer from "../components/common/Footer";

function Home() {
  const { data, error, loading } = useFetch(
    "http://localhost:5000/api/restaurants"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = searchTerm
    ? data?.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return (
    <>
      <Header searchTerm={searchTerm} handleSearch={handleSearchChange} />
      <Hero />
      <div className="container mx-auto pt-16 px-3">
        <h3 className="text-3xl font-extralight mb-5">Cities</h3>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg">
            All
          </button>
          <button className="px-4 py-2 bg-pink-400 text-white rounded-lg">
            Lahore
          </button>
          <button className="px-4 py-2 bg-pink-400 text-white rounded-lg">
            Karachi
          </button>
        </div>
      </div>
      <div className="container mx-auto py-16">
        <h3 className="text-4xl font-extralight mx-3 mb-5">
          Saaray restaurants
        </h3>
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : error ? (
          <h3>something went wrong</h3>
        ) : (
          <CardList restaurants={filteredData} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
