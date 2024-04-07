document.addEventListener("DOMContentLoaded", (event)=>{

})
//declare variables for DOM manipulation.
const movieList = document.getElementBy("films");
const poster = document.getElementById("poster");
const movieTitle =document .getElementById("title");
const runTime = document.getElementById(`"${runtime}  minutes"`);
const movieDescription = document.getElementById("film-info")
const showTime = document.getElementById("showtime");
// let ticketsRemaining = document.getElementById("ticket-num");
// ticketsRemaining = `(${capacity})- (${ticket_sold})`
const buyTicketBtn = document.getElementById("buy-ticket");
// fetched data goes here
let movie = [];

