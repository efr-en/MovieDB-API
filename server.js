const express = require('express'); // Import express
const fetch = global.fetch; // Import fetch to FETCH data from the TMDB API
const path = require('path'); // Provides utils for working with file/directory paths - Node.js module 

const app = express(); // Initializes express
const PORT = process.env.PORT || 3000; // Helps ensure hosting compatability and gives the hosting service a fallback port 
const API_KEY = '0b1030e9e8b3906f01731b4f4f2fb4ac'; // My API key
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for API
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjEwMzBlOWU4YjM5MDZmMDE3MzFiNGY0ZjJmYjRhYyIsIm5iZiI6MTczNDM3MzE3NC41NjksInN1YiI6IjY3NjA2ZjM2ZjllZmIwMDk3MjIwNjY1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iEVisOqUrtaV-7JBKsfqv5Z7RgFgN5_6-6d3jiBG2e4'

// Function to fetch TMDB configuration, straight from TMDB Docs
async function fetchTMDBConfiguration() {
    const url = 'https://api.themoviedb.org/3/configuration';
    const options = {
        method: 'GET', // HTTP method for request
        headers: {
            accept: 'application/json', 
            Authorization: `Bearer ${ACCESS_TOKEN}` // Use your API key here
        }
    };

    try {
        const response = await fetch(url, options);
        const configData = await response.json(); // Parse's the JSON response.
        console.log('TMDB Configuration:', configData); // Log the configuration data
        return configData;
    } catch (error) {
        console.error('Error fetching TMDB configuration:', error); // Logs error case for fetch failure 
        return null;
    }
}

// Tells express to serve static files from the public directory/folder (html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// Calls the TMDB configuration when the server starts
fetchTMDBConfiguration();

// Example route to get similar movies
app.get('/similar', async (req, res) => {
    const movieName = req.query.movieName.trim();
    if (!movieName) {
        return res.status(400).json({ error: 'Movie name is required' });
    }

    try {
        // Get movie ID
        const searchResponse = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`);
        const searchData = await searchResponse.json();
        console.log('Search Data:', searchData); // Log the search data
        const movies = searchData.results;

        if (movies.length === 0) {
            console.log('No movies found for the search query.');
            return res.json({ similarMovies: [] });
        }

        const movieId = movies[0].id;

        // Get similar movies
        const similarResponse = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
        const similarData = await similarResponse.json();
        console.log('Similar Data:', similarData); // Log the similar movies data

        res.json({ 
            similarMovies: similarData.results.map(movie => ({
            title: movie.title,
            release_date: movie.release_date,
            overview: movie.overview,
            poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        })) 
    });

    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
