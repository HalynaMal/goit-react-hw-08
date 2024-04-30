import { selectNameFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = (e) => dispatch(changeFilter(e.target.value));

  return (
    <div>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.inputFilter}
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchBox;
