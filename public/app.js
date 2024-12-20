document.getElementById('movieForm').addEventListener('submit', async (e) => { // Adds event listener on form submission
    e.preventDefault();
    const movieName = document.getElementById('movieName').value; // Retrieves the value entered into the input field w/movieName ID
    const response = await fetch(`/similar?movieName=${encodeURIComponent(movieName)}`);
    const data = await response.json();
    const resultsDiv = document.getElementById('results'); //Attaches to the results section in html doc to display results
    resultsDiv.innerHTML = '';

    if (data.similarMovies && data.similarMovies.length > 0) {
        data.similarMovies.forEach(movie => {
        const movieDiv = document.createElement('div'); // Shows the movie title and release date when found
        movieDiv.style.marginBottom = '20px';

        if (movie.poster_path) { // If movie has an image display it
            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.alt = `${movie.title} Poster`; // error case for no image 
            poster.style.width = '200px';
            movieDiv.appendChild(poster);
        }

        const title = document.createElement('h3');
        title.textContent = `${movie.title} (Release Date: ${movie.release_date})`;
        movieDiv.appendChild(title);

        const description = document.createElement('p'); // Creates paragraph text for movie desc.
        description.textContent = movie.overview || 'No description available.'; // error case
        movieDiv.appendChild(description);
        resultsDiv.appendChild(movieDiv);
        });

    } else {
        resultsDiv.innerHTML = '<p>No similar movies found.</p>'; // Message for when no movies are found
    }
});

console.log(data.similarMovies);

//dupe code inc of breakage
// resultsDiv.innerHTML += `<p>${movie.title} (Release Date: ${movie.release_date})</p>`; 

// if (data.similarMovies && data.similarMovies.length > 0) {
//     data.similarMovies.forEach(movie => {
//     const movieDiv = document.createElement('div'); // Shows the movie title and release date when found
//     movieDiv.style.marginBottom = '20px';

//     const title = document.createElement('h3');
//     title.textContent = `${movie.title} (Release Date: ${movie.release_date})`;
//     movieDiv.appendChild(title);

//     if (movie.poster_path) { // If movie has an image display it
//         const poster = document.createElement('img');
//         poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//         poster.alt = `${movie.title} Poster`; // error case for no image 
//         poster.style.width = '200px';
//         movieDiv.appendChild(poster);
//     }

//     const description = document.createElement('p'); // Creates paragraph text for movie desc.
//     description.textContent = movie.overview || 'No description available.'; // error case
//     movieDiv.appendChild(description);
//     resultsDiv.appendChild(movieDiv);
//     });