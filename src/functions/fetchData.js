export async function getMovies(algorithm) {
    let result = {};

    const hash = (window.location.hash.slice(1) ?? '/').replace('/', '')

    const type = {
        '': 'movie',
        'movies': 'movie',
        'tvshows': 'tv'
    }[hash]

    const algo = {
        'popular': 'popular',
        'top rated': 'top_rated'
    }[algorithm] ?? 'popular'

    await fetch(
        `https://api.themoviedb.org/3/${ type }/${ algo }?api_key=${ import.meta.env.VITE_API_TOKEN }&language=en-US&page=1`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}

export async function search(keyword) {
    let result = {};

    await fetch(
        `https://api.themoviedb.org/3/search/keyword?query=${ keyword }&page=1&api_key=${ import.meta.env.VITE_API_TOKEN }`)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

    return result;
}