document.getElementById('movieForm').addEventListener('submit', async (e) => { // Adds event listener on form submission
    e.preventDefault();
    const movieName = document.getElementById('movieName').value; // Retrieves the value entered into the input field w/movieName ID
    const response = await fetch(`/similar?movieName=${encodeURIComponent(movieName)}`);
    const data = await response.json();
    const resultsDiv = document.getElementById('results'); //Attaches to the results section in html doc to display results
    resultsDiv.innerHTML = '';

    if (data.similarMovies && data.similarMovies.length > 0) {
        data.similarMovies.forEach(movie => {
            resultsDiv.innerHTML += `<p>${movie.title} (Release Date: ${movie.release_date})</p>`; // Shows the movie title and release date when found
        });
    } else {
        resultsDiv.innerHTML = '<p>No similar movies found.</p>'; // Message for when no movies are found
    }
});