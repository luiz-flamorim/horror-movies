'use strict';

const api = 'https://api.themoviedb.org/3/discover/movie?api_key=';
const genre = '&with_genres=27'
const url = api + apiKey + genre
const list = document.querySelector('#list')
let filmCount = 0;

let getPages = fetch(url)
    .then(res => res.json())
    .then(data => {
        let pagination = data.total_pages

        //testing with 2 pages only - replace with 'pagination' for the final version
        for (let i = 1; i <= 2; i++) {
            let getData = fetch(url + '&page=' + i)
                .then(res => res.json())
                .then(data => {
                    for (let j = 0; j < data.results.length; j++) {
                        
                        filmCount++

                        let title = data.results[j].original_title
                        let year = data.results[j].release_date
                        let overview = data.results[j].overview

                        //poster - cinfig size: "w92", "w154", "w185", "w342", "w500", "w780", "original"
                        let poster = 'https://image.tmdb.org/t/p/w92/' + data.results[j].poster_path;

                        let div = document.createElement('div');
                        list.appendChild(div);

                        let filmPoster = document.createElement('img');
                        filmPoster.setAttribute("src", poster);
                        div.appendChild(filmPoster);

                        let filmTitle = document.createElement('h3');
                        filmTitle.innerHTML = title + ' - ' + year;
                        div.appendChild(filmTitle);

                        let filmOverview = document.createElement('p');
                        filmOverview.innerHTML = overview;
                        div.appendChild(filmOverview);

                        
                    }
                    console.log(filmCount)
                })
            }
        })