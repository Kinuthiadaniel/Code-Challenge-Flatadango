 //declare variables for DOM manipulation.
const movieList = document.getElementById("films");
const poster = document.getElementById("poster");
const movieTitle =document .getElementById("title");
const runTime = document.getElementById("runtime");
const movieDescription = document.getElementById("film-info")
const showTime = document.getElementById("showtime");
const availableTickets = document.getElementById("ticket-num");
const buyTicketBtn = document.querySelector("div button");

//declare a variable to store films URL
let urlMovies = "http://localhost:3000/films"
 // fetch and list movies
 function getMovies(){
  movieList.innerHTML =""// removes default list
  fetch(urlMovies)
  .then(res=>res.json())
  .then((data)=>{
    data.forEach((movie)=>{
      //create a list to store the movielist
      const list = document.createElement("li");
      list.style.cousor = "pointer";
      list.id = movie.id;
      list.classList.add("film", "item")
      //set the innerHTML
      list.innerHTML= `
      ${movie.title}`;
      //append list to the title list
      movieList.appendChild(list);
      renderMovieDetail(movie)
    })
    firstMovie(data[0])
  })
 }
 //call the function to fetch movie data and render film titles
 getMovies();

// a reusable function to render the movie detail
function renderMovieDetail(movie){
  availableTickets.textContent = movie.capacity - movie.ticket_sold;
  poster.src = movie.poster;
  poster.alt = movie.title;
  movieTitle.textContent = movie.title;
  runTime.textContent = `${movie.runtime} minutes`;
  movieDescription.textContent = movie.description;
  showTime.textContent = movie.showtime;
  // capture the available tickets and set the text buttons accordingly
  buyTicketBtn.textContent = availableTickets === 0? "Sold Out": "Buy ticket";

}
//// render the first movie
function firstMovie(movieData){
  renderMovieDetail(movieData)
}
