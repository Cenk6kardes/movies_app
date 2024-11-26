import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  lazyState: {
    first: 0,
    page: 0,
    globalFilter: "Pokemon",
    releasedYear: null,
    totalRecords: 0,
    type: null
  }
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setMovies: (state, action) => {
      if (Array.isArray(action.payload.Search)) {
        return {
          movies: action.payload.Search,
          lazyState: { ...state.lazyState, totalRecords: action.payload.totalResults }
        };
      } else {
        return { movies: [action.payload], lazyState: { ...state.lazyState, totalRecords: 1 } };
      }
    },
    setFilterDate: (state, action) => {
      return { ...state, lazyState: { ...state.lazyState, releasedYear: action.payload } };
    },
    setGlobalFilter: (state, action) => {
      return { ...state, lazyState: { ...state.lazyState, globalFilter: action.payload } };
    },
    setPage: (state, action) => ({
      ...state,
      lazyState: { ...state.lazyState, page: action.payload.page, first: action.payload.first }
    }),
    setType: (state, action) => ({ ...state, lazyState: { ...state.lazyState, type: action.payload } })
  }
});

export const { setMovies, setFilterDate, setGlobalFilter, setPage, setType } = moviesSlice.actions;

export default moviesSlice.reducer;
