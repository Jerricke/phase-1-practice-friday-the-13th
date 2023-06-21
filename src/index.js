 //fetcher
function initiator() {
    fetch("http://localhost:3000/movies")
        .then(res => res.json())
        .then(data => pageLoader(data))
        .catch(e => console.log(e))
}

//Main function block
function pageLoader(data) {

    //Runner
    imageLoader(data)

    //on load, display first movie
    movieLoader(data[0])

    //Function banks
    function imageLoader(data) {
        data.forEach( movie => { //Iterate thru entire data array

            //DOM select 
            const movieList = document.querySelector("#movie-list")
            const movieImg = document.createElement("img")
            let imgURL = movie.image;
            movieImg.src = imgURL;

            //Event Listener Code 
            movieImg.addEventListener('click', () => movieLoader(movie)) //When the image is clicked, it will populate the detail panel
    
            movieList.appendChild(movieImg)
        })
    }

    function movieLoader(data) {

        //DOM select
        const movieTitle = document.querySelector("#title");
        const movieYear = document.querySelector("#year-released");
        const movieDesc = document.querySelector("#description");
        const movieAmount = document.querySelector("#amount");
        const movieImg = document.querySelector("#detail-image");
        const movieWatched = document.querySelector("#watched");

        movieTitle.textContent = data.title;
        movieYear.textContent = data.release_year;
        movieDesc.textContent = data.description;
        movieAmount.textContent = `${data.blood_amount}`;
        movieImg.src = data.image;

        if (data.watched) {
            movieWatched.textContent = "Watched"
            // console.log("flip to true");
        } else {
            movieWatched.textContent = "Unwatched"
            // console.log("flip to false");
        }
    }

    //Toggler for watched button
    const movieWatched = document.querySelector("#watched");
    movieWatched.addEventListener('click', () => {

        //finding the watched data for the current movie
        const currentTitle = document.querySelector("#title")
        currentMovieData = data.find(item => item.title === currentTitle.textContent);

        //watched toggler
        currentMovieData.watched = !currentMovieData.watched

         //watched display textcontent updater
        if (currentMovieData.watched) {
            movieWatched.textContent = "Watched"
            // console.log("flip to true");
        } else {
            movieWatched.textContent = "Unwatched"
            // console.log("flip to false");
        }
    })

    //BloodAmount Forms 
    const bloodInput = document.querySelector("#blood-form")
    bloodInput.addEventListener("submit", (e) => {
        e.preventDefault();

        //finds the data object for the current displaying movie
        const currentTitle = document.querySelector("#title")
        currentMovieData = data.find(item => item.title === currentTitle.textContent);

        //add's the return value
        currentMovieData.blood_amount += parseInt(e.target[0].value);
        // console.log(typeof currentMovieData.blood_amount);
        const movieAmount = document.querySelector("#amount");
        movieAmount.textContent = `${currentMovieData.blood_amount}`;
    })

}

//Page Runner
document.addEventListener("DOMContentLoaded", initiator())