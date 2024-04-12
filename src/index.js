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
let urlMovies = "https://json-server1-f66c.onrender.com/films"
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
      <button id="k${movie.id}" style ="background-color:lightblue; border:none; margin-left: 
      10px; border-radius: 30px; width:100px; padding:5px;" >Delete</button>`;
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
  // if (availableTickets.textContent == 0) {
  //   buyTicketBtn.textContent = "Sold Out"
  // } else { buyTicketBtn.textContent = "Buy Ticket" }
}

function firstMovie(movie) {
  // render the first movie
  renderMovieDetail(movie)
  purchaseTicket(movie)
  if (availableTickets.textContent === 0) {
    buyTicketBtn.textContent = "Sold Out"
  } else { buyTicketBtn.textContent = "Buy Ticket" }
}

//add event to get specific information upon clicking
function onMovieClick(movies) {
  //grab the movie details by id and add a click event
  const movieDetail = document.getElementById(`${movies.id}`);
  movieDetail.addEventListener("click", () => {
    renderMovieDetail(movies)
    purchaseTicket(movies)
    if (availableTickets.textContent == 0) {
      buyTicketBtn.textContent = "Sold Out"
    }else { buyTicketBtn.textContent = "Buy Ticket"}
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
        alert(err.message);
      });
  });
}
//define a function that handles the buy ticket button
function purchaseTicket(movies) {
  buyTicketBtn.onclick = () => {
    //checks if the number of tickets is greater than and incrementsand decrements the available tickets and tickets sold respectively
    if (availableTickets.textContent > 0) {
      availableTickets.textContent--
      movies.tickets_sold++;
      //fetches data from the database and updates the tickets sold uses patch method
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
        // uses the data object to check available tickets and switch the button inner text
        .then((res) => res.json())
        .then((data) => {
          availableTickets.textContent = `${data.capacity - data.tickets_sold}`
          if (availableTickets.textContent == 0) {
            buyTicketBtn.textContent = "Sold Out"
          }
        });
        // update an empty list of tickets using post method
      fetch("https://json-server1-f66c.onrender.com/ticket", {
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
        .catch(err => alert(err.message))

    };

  }

}



