// API key for OMDB API
const apiKey = "c03dcf5e";

// DOM elements
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');

// Function to fetch movie data from OMDB API
async function fetchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display movie results
function displayMovies(movies) {
    movieList.innerHTML = '';

    if (movies.length === 0) {
        movieList.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieItem = document.createElement('a');
        movieItem.href = `https://www.imdb.com/title/${movie.imdbID}`;
        movieItem.classList.add('list-group-item', 'list-group-item-action');
        movieItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h5>${movie.Title} (${movie.Year})</h5>
                <span class="badge badge-primary">${movie.Type}</span>
            </div>
            <p>IMDb ID: ${movie.imdbID}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

// Event listener for search input
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    
    if (query.length >= 3) {
        const movies = await fetchMovies(query);
        displayMovies(movies);
    } else {
        movieList.innerHTML = '<p>Enter at least 3 characters to search.</p>';
    }
});
