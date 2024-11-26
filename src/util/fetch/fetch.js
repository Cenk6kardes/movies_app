const httpFetch = async (param) => {
  const response = await fetch(` http://www.omdbapi.com/?&apikey=d214a8ad${param}`);
  if (!response.ok) {
    const error = new Error("An error occured while fetching.");
    throw error;
  }
  const movies = await response.json();
  if (movies.Response === "False") {
    throw new Error(movies.Error);
  }
  return movies;
};

export default httpFetch;
