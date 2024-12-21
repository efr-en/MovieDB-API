document.getElementById('movieForm').addEventListener('submit', async (e) => { // Adds event listener on form submission
    e.preventDefault();
    const movieName = document.getElementById('movieName').value; // Retrieves the value entered into the input field w/movieName ID
    const response = await fetch(`/similar?movieName=${encodeURIComponent(movieName)}`);
    const data = await response.json(); // To parse the server's response as JSON and store it into data
    const resultsDiv = document.getElementById('results'); //Attaches to the results section in html doc to display results
    resultsDiv.innerHTML = '';

    if (data.similarMovies && data.similarMovies.length > 0) {
        data.similarMovies.forEach(movie => { // Loops through each movie to create a movie card for each
        const movieCard = document.createElement('div'); // Shows the movie title and release date when found
        movieCard.className = 'movie-card';

        if (movie.poster_path) { // If movie has an image display it
            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Image source link from TMDB
            poster.alt = `${movie.title} Poster`; // error case for no image 
            poster.style.width = '200px';
            movieCard.appendChild(poster);
        }

        const title = document.createElement('h3');
        title.textContent = `${movie.title} (Release Date: ${movie.release_date})`;
        movieCard.appendChild(title);

        const description = document.createElement('p'); // Creates paragraph text for movie desc.
        description.textContent = movie.overview || 'No description available.'; // error case
        movieCard.appendChild(description);
        resultsDiv.appendChild(movieCard);
        });

    } else {
        resultsDiv.innerHTML = '<p>No similar movies found.</p>'; // Message for when no movies are found
    }
});

// console.log(data.similarMovies); used for error
