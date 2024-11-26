import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter, setFilterDate, setType } from "../../util/store/moviesSlice";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

let maxDate = new Date();
maxDate.setFullYear(2025);

const movieTypes = ["movie", "series", "episode", "game"];

export const TableHeader = React.memo(() => {
  const filterTimeout = useRef(null);
  const store = useSelector((state) => state.movies);

  const initialMovieName = store.lazyState.globalFilter ? store.lazyState.globalFilter : "Pokemon";
  const [filter, setFilter] = useState(initialMovieName);

  const dispatch = useDispatch();

  const onFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }
    filterTimeout.current = setTimeout(() => {
      dispatch(setGlobalFilter(value));
    }, 500);
  };

  const onDateFilter = (event) => {
    const fullDate = event.value;
    const year = fullDate instanceof Date ? fullDate.getFullYear() : null;
    dispatch(setFilterDate(year));
  };

  const onTypeFilter = (event) => {
    const type = event ? event : null;
    dispatch(setType(type));
  };

  return (
    <div className="flex justify-content-between">
      <div>
        <InputText value={filter} onChange={onFilter} placeholder="Keyword Search" />

        <Dropdown
          showClear
          value={store.lazyState.type}
          onChange={(e) => onTypeFilter(e.value)}
          options={movieTypes}
          placeholder="Select a Type"
          className="w-full md:w-14rem ml-4"
        />
      </div>

      <Calendar
        value={store.lazyState.releasedYear ? new Date(`${store.lazyState.releasedYear}-01-01`) : null}
        onChange={onDateFilter}
        view="year"
        dateFormat="yy"
        maxDate={maxDate}
        showButtonBar
        showIcon
        placeholder="Released Year Search"
      />
    </div>
  );
});
