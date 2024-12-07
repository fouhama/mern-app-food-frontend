import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurant } from "../api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginationSelector from "../components/PaginationSelector";
import CuisineFilter from "../components/CuisineFilter";

export type SearchState = {
  searchQuery: string;
  selectedCuisines: string[];
  page: number;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    selectedCuisines: [],
    page: 1,
  });

  const [expanded, setisExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurant(searchState, city);

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
      page: 1, // Reset page to 1 when search query changes
    }));
  };
  const handleChangeCuisines = (selectedCuisines: string[]) => {
    setSearchState((preventState) => ({
      ...preventState,
      selectedCuisines,
      page: 1,
    }));
  };
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1, // Reset page to 1 when search query changes
    }));
  };
  return (
    <div className='grid  grid-cols-1 flex-1  lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={handleChangeCuisines}
          isExpanded={expanded}
          onExpandedClick={() => setisExpanded(!expanded)}
        />
      </div>
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
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
