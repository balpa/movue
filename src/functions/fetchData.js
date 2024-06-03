export async function getMovies (hash) {
    let result = {};
      
    await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${ import.meta.env.VITE_API_TOKEN }&language=en-US&page=1`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}