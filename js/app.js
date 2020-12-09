'use strict';


//selectors
const domBody = document.querySelector('body')
const filmsContainer = document.querySelector('#filmsDiv')
const searchButton = document.querySelector('#searchButton')
const searchField = document.querySelector('#userInput')
// const filmsDivSelector = document.querySelector('#filmsDiv .row')

// URLs & End Point
const endPoint = 'https://api.themoviedb.org/3/'
const pagination = '&page='
const urlDiscover = endPoint + 'discover' + apiKey + '&with_genres=27'
const urlSearch = endPoint + 'search' + apiKey + '&language=en-US&query='


discoverFilms(urlDiscover)

searchFilm(urlSearch)


// functions

function discoverFilms(url) {
    let getPages = fetch(url)
        .then(res => res.json())
        .then(data => {
            let numberOfPages = data.total_pages
            filmsDataParser(url)
        })
}

function searchFilm(url) {
    searchButton.addEventListener('click', (event) => {
        if (searchField.value != '') {
            // console.log('search field value: ' + searchField.value)
            filmsContainer.innerHTML = ''
            filmsDataParser(url + (searchField.value) + '&with_genres=27')
        }
    })
}

function filmsDataParser(url){

    for (let i = 1; i <= 10; i++) { //replace '10' with 'numberOfPages' for the final version
        let getData = fetch(url + pagination + i)
            .then(res => res.json())
            .then(data => {
                for (let j = 0; j < data.results.length; j++) {

                    //check if the film is classified as horror with this loop
                    for(let h = 0; h < data.results[j].genre_ids.length; h++){
                        if(data.results[j].genre_ids[h] === 27){

                            let id = data.results[j].id
                            let title = data.results[j].title
                            let year = (data.results[j].release_date).split('-').reverse().join('/')
                            let overview = data.results[j].overview
                            let poster = 'https://image.tmdb.org/t/p/w200/' + data.results[j].poster_path; //sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original"
                            
                            if(data.results[j].poster_path == null){
                                //replace this image by a random from Unsplash API
                                poster = 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80'
                            }
        
                            cardBuilder(id, title, year, overview, poster);
                        }
                    }  
                }
            })
    }
}


function cardBuilder(id, title, year, overview, poster) {

    let wrapper = document.createElement('div');
    wrapper.setAttribute("class", "col-sm-3 col-md-4 col-lg-2 h-100");
    wrapper.setAttribute("style", "card");
    wrapper.setAttribute("id", id);
    filmsContainer.appendChild(wrapper);

   
    let filmPoster = document.createElement('img');
    filmPoster.setAttribute("src", poster);
    filmPoster.setAttribute("class", "card-img-top img-fluid");
    filmPoster.addEventListener('click', (event) => {
        filmDetail(id, title, year, overview, poster);
    })
    wrapper.appendChild(filmPoster);

    let cardInfo = document.createElement('div');
    cardInfo.setAttribute("class", "card-body flex-column");
    wrapper.appendChild(cardInfo);

    let filmTitle = document.createElement('h5');
    filmTitle.setAttribute("class", "card-title")
    filmTitle.innerHTML = title
    cardInfo.appendChild(filmTitle);

    let filmYear = document.createElement('small');
    filmYear.setAttribute("class", "text-muted")
    filmYear.innerHTML = 'Released on ' + year;
    cardInfo.appendChild(filmYear);

    let footer = document.createElement('div')
    footer.setAttribute("class","d-grid gap-2 d-md-block")
    wrapper.appendChild(footer)

    let buttonWhishlist = document.createElement('button')
    buttonWhishlist.setAttribute('class', 'btn btn-primary me-md-2 btn-sm')
    buttonWhishlist.setAttribute('href', '#')
    buttonWhishlist.innerHTML = '+ Add'
    footer.appendChild(buttonWhishlist)

    let buttonWatched = document.createElement('button')
    buttonWatched.setAttribute('class', 'btn btn-primary me-md-2 btn-sm')
    buttonWatched.setAttribute('href', '#')
    buttonWatched.innerHTML = 'watched'
    footer.appendChild(buttonWatched)

}

function filmDetail(id) {
    const urlId = endPoint + 'movie/' + id + '?' + key2 + '&language=en-GB'

    let getPages = fetch(urlId)
        .then(res => res.json())
        .then(data => {
          
            let title = data.title
            let originalTitle = data.original_title
            let overview = data.overview
            let year = (data.release_date).split('-').reverse().join('/')
            let poster = 'https://image.tmdb.org/t/p/w200/' + data.poster_path;

            if(data.poster_path == null){
                //replace this image by a random from Unsplash API
                poster = 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
            }


            filmPopUp(id,title,originalTitle,overview,year,poster)
        })
}


function filmPopUp(id,title,originalTitle,overview,year,poster){

    console.log('clicked on: ' + id + ' ' + title + ' | ' + overview)
 
    //Modal: entire window
    let popUp = document.createElement('div')
    popUp.setAttribute('class','pop__up modal-dialog-centered')
    popUp.setAttribute('id',('pop-up'+id))
    domBody.appendChild(popUp)

    //pop up
    let popUpContent = document.createElement('div')
    popUpContent.setAttribute('class','row popup__content  g-0')
    popUp.appendChild(popUpContent)

    //buttons
    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class','row')
    popUpContent.appendChild(buttonDiv)

    let closeBtn = document.createElement('button')
    closeBtn.setAttribute('class','btn-close')
    closeBtn.addEventListener('click',(event) => {
        popUp.style.display = 'none'
    })
    popUpContent.appendChild(closeBtn)

    window.addEventListener('click', (clickOutside)=>{
        if(clickOutside.target == popUp){
            popUp.style.display = 'none';
            }
    })
    popUp.style.display = 'block';

    // Image Div
    let imgDiv = document.createElement('div')
    imgDiv.setAttribute('class','col-md-4 col-lg-2')
    popUpContent.appendChild(imgDiv)

    let popUpPoster = document.createElement('img')
    popUpPoster.setAttribute("src", poster)
    imgDiv.appendChild(popUpPoster)

    // Content Div
    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class','row gx-2 align-content-center col-md-8')
    popUpContent.appendChild(contentDiv)

    let popUpTitle = document.createElement('h3')
    popUpTitle.setAttribute('class','col-12')
    popUpTitle.innerHTML = title
    contentDiv.appendChild(popUpTitle)

    let popUpOtitle = document.createElement('h5')
    popUpOtitle.setAttribute('class','col-12')
    popUpOtitle.innerHTML = 'Original title: ' + originalTitle
    contentDiv.appendChild(popUpOtitle)

    let popUpYear = document.createElement('h6')
    popUpYear.setAttribute('class','col-auto')
    popUpYear.innerHTML = 'Film released on ' + year
    contentDiv.appendChild(popUpYear)
    
    let popUpOverview = document.createElement('p')
    popUpOverview.setAttribute('class','col-auto')
    popUpOverview.innerHTML = '<b>Overview: </b>' + overview
    contentDiv.appendChild(popUpOverview)



}
