import { Button } from "primereact/button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { queryClient } from "../../util/routes/routes";
import httpFetch from "../../util/fetch/fetch";

const MovieDetail = () => {
  const navigate = useNavigate();
  const movie = useLoaderData();

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <img
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
          className="w-full h-auto rounded-lg shadow-lg border-round-xl"
        />
      </div>

      <div className="w-full max-w-2xl p-6 mt-6 rounded-lg shadow-md bg-gray-400 border-round-right-2xl border-round-left-sm">
        <Button className="mb-4" rounded severity="secondary" onClick={() => navigate("/")}>
          &lt; Back
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{movie.Title}</h1>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Type:</span> {movie.Type}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Year:</span> {movie.Year}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">IMDB ID:</span> {movie.imdbID}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

export async function loader({ params }) {
  return await queryClient.fetchQuery({
    queryKey: ["movie", params.id],
    queryFn: () => httpFetch(`&i=${params.id}`)
  });
}
