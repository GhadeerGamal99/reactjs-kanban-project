import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/slices/searchSlice";
import type { RootState } from "../../store";


const SearchBar = () => {
    const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  return (
    <div>
        <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      className="p-2 border rounded-md w-64"
    />
    </div>
  )
}

export default SearchBar