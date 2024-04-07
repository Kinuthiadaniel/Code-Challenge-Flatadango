//declare variables for DOM manipulation.
const movieList = document.getElementById("films");
const poster = document.getElementById("poster");
const movieTitle = document.getElementById("title");
const runTime = document.getElementById("runtime");
const movieDescription = document.getElementById("film-info")
const showTime = document.getElementById("showtime");
const availableTickets = document.getElementById("ticket-num");
const buyTicketBtn = document.querySelector("div button");

//declare a variable to store films URL
let urlMovies = "http://localhost:3000/films"
// fetch and list movies
function getMovies() {
  movieList.innerHTML = ""// removes default list
  fetch(urlMovies)
    .then(res => res.json())
    .then((data) => {
      data.forEach((movie) => {
        //create a list to store the movielist
        const list = document.createElement("li");
        list.style.cousor = "pointer";
        list.id = movie.id;
        list.classList.add("film", "item")
        //set the innerHTML
        list.innerHTML = `
      ${movie.title}
      <button id="k${movie.id}" style ="background-color:lightblue; border:none; margin-left: 10px; border-radius: 30px; width:100px; padding:5px;" >Delete</button>`;
        //append list to the title list
        movieList.appendChild(list);
        onMovieClick(movie)
        deleteEachMovie(movie)
      })
      firstMovie(data[0])

    })
}
//call the function to fetch movie data and render film titles
getMovies();

// a reusable function to render the movie detail
function renderMovieDetail(movie) {
  availableTickets.textContent = `${movie.capacity - movie.tickets_sold}`;
  poster.src = movie.poster;
  poster.alt = movie.title;
  movieTitle.textContent = movie.title;
  runTime.textContent = `${movie.runtime} minutes`;
  movieDescription.textContent = movie.description;
  showTime.textContent = movie.showtime;
  // capture the available tickets and set the text buttons accordingly
  buyTicketBtn.textContent = availableTickets === 0 ? "Sold Out" : "Buy ticket";

}

function firstMovie(movie) {
  // render the first movie
  renderMovieDetail(movie)
  purchaseTicket(movie)
}

//add event to get specific information upon clicking
function onMovieClick(movies) {
  //grab the movie details by id and add a click event
  const movieDetail = document.getElementById(`${movies.id}`);
  movieDetail.addEventListener("click", () => {
    renderMovieDetail(movies)
    purchaseTicket(movies)
  })
 }

//define a function that deletes the movie
function deleteEachMovie(movie) {
  const deleteButton = document.getElementById(`k${movie.id}`);
  deleteButton.addEventListener("click", () => {
    fetch(`${urlMovies}/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then(res => res.json())
      .then((data) => console.log(data)
      )
      .catch((err) => {
        alert(err)
      });
  });
}

function purchaseTicket(movies) {
  buyTicketBtn.onclick = () => {
    if (availableTickets.textContent > 0) {
      availableTickets.textContent--
      // if(availableTickets.textContent === 0){
      //   buyTicketBtn.textContent = "Sold Out"
      // }
      movies.tickets_sold++;
      fetch(`${urlMovies}/${movies.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            tickets_sold: movies.tickets_sold
          })
        })
        .then((res)=>res.json())
        .then((data) => {
          availableTickets.textContent =`${data.capacity - data.tickets_sold}`
          if(availableTickets.textContent === 0){
            buyTicketBtn.textContent = "Sold Out"
          }
        });
        fetch("http://localhost:3000/ticket",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            film_id: movies.id,
            number_of_tickets: 1
          })
        })
        .catch(err => alert(err.message) )
        
    };

  }

}



