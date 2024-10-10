import API_KEY from './config.js';

const apiKey = API_KEY; // Replace with your own TMDb API key


// Nav Bar Buttons
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('section-target');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.createElement('nav');
mobileNav.classList.add('mobile-nav');
mobileNav.innerHTML = `
        <button section-target="#now_playing">Now Playing</button>
        <button section-target="#popular">Popular</button>
        <button section-target="#top_rated">Top Rated</button>
        <button section-target="#upcoming">Upcoming</button>
`;

document.querySelector('.hamburger').appendChild(mobileNav);

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('show')
})

document.querySelectorAll('.mobile-nav button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('click');
        const targetId = button.getAttribute('section-target');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                mobileNav.classList.remove('show');
            }, 300);
        }
    });
});


// Fetch movies
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

// Display movies
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

