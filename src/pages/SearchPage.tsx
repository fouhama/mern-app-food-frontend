import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurant } from "../api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import SearchBar, { SearchForm } from "../components/SearchBar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurant( searchState, city);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!results?.data || !city) {
    return <div> Not found</div>;
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };
  return (
    <div className='grid  grid-cols-1 flex-1  lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>insert cuisines list here :)</div>
      <div className='flex flex-col gap-5' id='main-content'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder='Search by cuisine or restaurant name'
          onRest={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} key={restaurant._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
