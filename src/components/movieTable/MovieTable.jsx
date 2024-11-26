import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../util/routes/routes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import httpFetch from "../../util/fetch/fetch";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { setMovies, setPage } from "../../util/store/moviesSlice";
import { TableHeader } from "../tableHeader/TableHeader";

export default function MovieTable() {
  const navigate = useNavigate();

  const toast = useRef(null);
  const store = useSelector((state) => state.movies);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLazyData();
  }, [store.lazyState.page, store.lazyState.globalFilter, store.lazyState.releasedYear, store.lazyState.type]);

  function params() {
    let params = "";
    params += store.lazyState.globalFilter ? "&s=" + store.lazyState.globalFilter : "";
    params += store.lazyState.releasedYear ? "&y=" + store.lazyState.releasedYear : "";
    params += store.lazyState.type ? "&type=" + store.lazyState.type : "";
    return params;
  }

  async function loadLazyData() {
    try {
      setLoading(true);
      const movies = await httpFetch(`&page=${store.lazyState.page + 1}${params()}`);
      dispatch(setMovies(movies));
    } catch (error) {
      errorToastr(error.message);
    }
    setLoading(false);
  }

  const errorToastr = (message) => {
    toast.current.show({ severity: "error", summary: "Error", detail: message });
  };

  const onPage = (event) => {
    dispatch(setPage(event));
  };

  const navigateDetailPage = (e) => {
    navigate(`/movie/${e.data.imdbID}`);
    if (queryClient.getQueryState(["movie", e.data.imdbID]).fetchStatus === "fetching") {
      setLoading(true);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <DataTable
        onRowClick={navigateDetailPage}
        rowHover
        rowClassName={"hover-pointer"}
        header={<TableHeader></TableHeader>}
        value={store.movies}
        lazy
        footer={`In total ${store.lazyState.totalRecords} results`}
        dataKey="imdbID"
        paginator
        first={store.lazyState.first}
        rows={10}
        filters={{ global: { value: store.lazyState.globalFilter, matchMode: "contains" } }}
        totalRecords={store.lazyState.totalRecords}
        onPage={onPage}
        loading={loading}
        emptyMessage="No found."
        globalFilterFields={["Title", "imbdID", "Released"]}
      >
        <Column field="Title" header="Name" />
        <Column field="Type" header="Type" />
        <Column field="imdbID" header="IMBD ID" />
        <Column field="Year" header="Released Year" />
      </DataTable>
    </div>
  );
}
