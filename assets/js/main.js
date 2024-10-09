import API_KEY from './config.js';

const apiKey = API_KEY; // Replace with your own TMDb API key

const hamburger = document.getElementById('hamburger');
const mobileNav = document.createElement('nav');
mobileNav.classList.add('mobile-nav');
mobileNav.innerHTML = `
    <a href="#now_playing">Now Playing</a>
    <a href="#popular">Popular</a>
    <a href="#top_rated">Top Rated</a>
    <a href="#upcoming">Upcoming</a>
`;

document.querySelector('.hamburger').appendChild(mobileNav);

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('show')
})

async function fetchAndDisplayMovies(url, sectionId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results.slice(0, 4);

        displayMovies(movies, sectionId);
    } catch (error) {
        console.error(`Error fetching movies for section ${sectionId}:`, error);
    }
}

function displayMovies(movies, sectionId) {
    const movieGrid = document.querySelector(`#${sectionId} .movies-grid`);

    const template = document.getElementById('movie-template');

    movieGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieClone = template.content.cloneNode(true);

        const img = movieClone.querySelector('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const title = movieClone.querySelector('.movie-title');
        title.textContent = movie.title || "No title available";

        const description = movieClone.querySelector('.movie-description');
        description.textContent = movie.overview || "No description available.";

        const releaseDate = movieClone.querySelector('.release-date');
        releaseDate.textContent = `Release Date: ${movie.release_date || "No release date available."}`;

        const voteRating = movieClone.querySelector('.vote-rating');
        voteRating.textContent = `User Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : "No rating available."}`;

        movieGrid.appendChild(movieClone);
    });
}

// URLs
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;


fetchAndDisplayMovies(nowPlayingUrl, 'now_playing');
fetchAndDisplayMovies(popularUrl, 'popular');
fetchAndDisplayMovies(topRatedUrl, 'top_rated');
fetchAndDisplayMovies(upcomingUrl, 'upcoming');

