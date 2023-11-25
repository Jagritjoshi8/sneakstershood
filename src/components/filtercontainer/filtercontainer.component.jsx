import "./filtercontainer.styles.scss";
import SearchIcon from "@mui/icons-material/Search";
import {
  addCategories,
  addPrice,
  addRatings,
  addSearch,
  addSort,
  resetFilters,
} from "../../features/productfiltersSlice";

import { useDispatch, useSelector } from "react-redux";
const FilterContainer = () => {
  const dispatch = useDispatch();
  const productfilters = useSelector((state) => state.productfilters);
  return (
    <div
      className="filter-container"
      data-aos="fade-up"
      data-aos-duration="2500"
    >
      <div className="filter-header">
        <h1>Filters</h1>
        <button className="reset-btn" onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>
      <div className="filter-types-container">
        <div className="search-container bg">
          <input
            type="search"
            placeholder="🔎 Search By Name "
            id="inputsearch"
            name="inputserach"
            value={productfilters.inputSearch}
            onChange={(e) => dispatch(addSearch(e.target.value))}
          />
        </div>
        <div className="price-container bg">
          <h3>Price :</h3>
          <div className="price-input-container">
            <label htmlFor="below-200">
              Below $200
              <input
                checked={productfilters.price.find((price) =>
                  price.min === 0 ? true : false
                )}
                onChange={() => dispatch(addPrice({ min: 0, max: 200 }))}
                id="below-200"
                type="checkbox"
              />
            </label>

            <label htmlFor="201-999">
              $201 - $999
              <input
                checked={productfilters.price.find((price) =>
                  price.min === 201 ? true : false
                )}
                onChange={() => dispatch(addPrice({ min: 201, max: 999 }))}
                id="201-999"
                type="checkbox"
              />
            </label>

            <label htmlFor="1000-1999">
              $1000 - $1999
              <input
                checked={productfilters.price.find((price) =>
                  price.min === 1000 ? true : false
                )}
                onChange={() => dispatch(addPrice({ min: 1000, max: 1999 }))}
                id="1000-1999"
                type="checkbox"
              />
            </label>

            <label htmlFor="above 2000">
              Over $2000
              <input
                checked={productfilters.price.find((price) =>
                  price.min === 2000 ? true : false
                )}
                onChange={() => dispatch(addPrice({ min: 2000, max: 5000 }))}
                id="above 2000"
                type="checkbox"
              />
            </label>
          </div>
        </div>
        <div className="ratings-container bg">
          <h3>Ratings (min) :</h3>
          <div className="input-range">
            <datalist id="markers">
              <option label="0" value="0">
                0
              </option>
              <option label="2.5" value="2.5">
                2.5
              </option>
              <option label="5.0" value="5">
                5
              </option>
            </datalist>
            <input
              step="0.1"
              onChange={(e) => dispatch(addRatings(Number(e.target.value)))}
              list="markers"
              id="price"
              type="range"
              min="0"
              max="5.0"
              value={productfilters.rating}
            />
          </div>
        </div>

        <div className="category-container bg">
          <h3>Categories</h3>
          <div className="category-input-container">
            <label>
              Men's wear
              <input
                checked={productfilters.categories.includes("men")}
                onChange={() => dispatch(addCategories("men"))}
                id="category-mens"
                type="checkbox"
              />
            </label>
            <label>
              Women's wear
              <input
                checked={productfilters.categories.includes("women")}
                onChange={() => dispatch(addCategories("women"))}
                id="category-mens"
                type="checkbox"
              />
            </label>
            <label>
              Kid's wear
              <input
                checked={productfilters.categories.includes("kid")}
                onChange={() => dispatch(addCategories("kid"))}
                id="category-mens"
                type="checkbox"
              />
            </label>
          </div>
        </div>

        <div className="sorting-container bg">
          <h3>Sort by price</h3>

          <div className="sorting-input-container">
            <label htmlFor="high-to-low">
              High To Low 📉{" "}
              <input
                checked={productfilters.sort === "HighToLow"}
                onChange={() => dispatch(addSort("HighToLow"))}
                name="sort"
                id="high-to-low"
                type="radio"
              />
            </label>

            <label htmlFor="low-to-high">
              Low To High 📈
              <input
                checked={productfilters.sort === "LowToHigh"}
                onChange={() => dispatch(addSort("LowToHigh"))}
                name="sort"
                id="low-to-high"
                type="radio"
              />
            </label>
          </div>
        </div>
      </div>
      {/* //innerfiltercontainer */}
    </div>
  );
};

export default FilterContainer;
