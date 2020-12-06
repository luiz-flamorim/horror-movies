'use strict';


//selectors
const domBody = document.querySelector('body')

filmsGrid()



// functions

function filmsGrid() {
    const urlHorror = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&with_genres=27'

    let getPages = fetch(urlHorror)
        .then(res => res.json())
        .then(data => {
            let pagination = data.total_pages

            for (let i = 1; i <= 10; i++) { //replace 'i' with 'pagination' for the final version
                let getData = fetch(urlHorror + '&page=' + i)
                    .then(res => res.json())
                    .then(data => {
                        for (let j = 0; j < data.results.length; j++) {

                            let id = data.results[j].id
                            let title = data.results[j].title
                            let year = (data.results[j].release_date).split('-').reverse().join('/')
                            let overview = data.results[j].overview
                            let poster = 'https://image.tmdb.org/t/p/w500/' + data.results[j].poster_path; //sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original"

                            cardBuilder(id, title, year, overview, poster);
                        }
                    })
            }
        })
}

function cardBuilder(id, title, year, overview, poster) {

    let filmsDivSelector = document.querySelector('#filmsDiv')

    let card = document.createElement('div');
    card.setAttribute("class", "card")
    card.setAttribute("class", "col-md-2")
    card.setAttribute("id", id)
    filmsDivSelector.appendChild(card);

    let cardImg = document.createElement('div');
    card.appendChild(cardImg);

    let filmPoster = document.createElement('img');
    filmPoster.setAttribute("src", poster);
    filmPoster.setAttribute("class", "card-img-top");
    filmPoster.addEventListener('click', (event) => {
        filmDetail(id, title, year, overview, poster)
    })
    cardImg.appendChild(filmPoster);

    let filmTitle = document.createElement('h4');
    filmTitle.setAttribute("class", "card-title")
    filmTitle.innerHTML = title
    card.appendChild(filmTitle);

    let filmYear = document.createElement('p');
    filmYear.setAttribute("class", "card-subtitle")
    filmYear.setAttribute("class", "text-muted")
    filmYear.innerHTML = 'Released on ' + year;
    card.appendChild(filmYear);

    let buttonsDiv = document.createElement('div')
    card.appendChild(buttonsDiv)

    let buttonWhishlist = document.createElement('a')
    buttonWhishlist.setAttribute('class', 'col-sm-5')
    buttonWhishlist.setAttribute('class', 'btn btn-primary')
    buttonWhishlist.setAttribute('href', '#')
    buttonWhishlist.innerHTML = '+ wishlist'
    buttonsDiv.appendChild(buttonWhishlist)

    let buttonWatched = document.createElement('a')
    buttonWatched.setAttribute('class', 'col-sm-5')
    buttonWatched.setAttribute('class', 'btn btn-primary')
    buttonWatched.setAttribute('href', '#')
    buttonWatched.innerHTML = 'watched'
    buttonsDiv.appendChild(buttonWatched)

    // let filmOverview = document.createElement('p');
    // filmOverview.setAttribute('class', 'card-text')
    // filmOverview.innerHTML = overview;
    // card.appendChild(filmOverview);
}

function filmDetail(id) {

    const urlId = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=en-GB'

    let getPages = fetch(urlId)
        .then(res => res.json())
        .then(data => {

            let title = data.title
            let originalTitle = data.original_title
            let overview = data.overview
            let year = (data.release_date).split('-').reverse().join('/')
            let poster = 'https://image.tmdb.org/t/p/w500/' + data.poster_path;

            console.log(id + ' ' + title + ' | ' + overview)

            popUp(id, title, originalTitle, overview, year, poster)

            let filmPopUp = document.createElement('div')
            filmPopUp.setAttribute('class', 'modal fade')
            filmPopUp.setAttribute('id', 'pop-up' + id)
            filmPopUp.setAttribute('role', 'dialog')
        })
}

function popUp(id, title, originalTitle, overview, year, poster) {

    let filmPopUp = document.createElement('div')
    filmPopUp.setAttribute('class', 'modal fade')
    filmPopUp.setAttribute('id', 'pop-up' + id)
    filmPopUp.setAttribute('role', 'dialog')

}