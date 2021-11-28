
const searchForm= document.querySelector("#searchForm");
const searchBox= document.querySelector("#searchBox");
const showMovies=document.querySelector("#movies");
const showSelectedMovie=document.querySelector(".well");


searchForm.addEventListener("submit",event=>{
    event.preventDefault();
    searchInput= searchBox.value;
    getMovies(searchInput);
});


function getMovies(searchInput){

     axios.get('http://www.omdbapi.com/?s='+searchInput + '&apikey=9be27fce')
    .then(response=> {
        // handle success
        // console.log(response);
        let movies= response.data.Search;
       result='';
       movies.map(item=>{
           result+=`  
            <div class="col-md-3">
                <div class="well text-center">
                <img src="${item.Poster}" alt="${item.Title}" srcset="">
                <h5>${item.Title}</h5>
                  <button onclick="movieSelected('${item.imdbID}')" data-id=${item.imdbID} class="btn-primary movieBtn">Movie Details</button>
                </div>
            </div>
            `
       });
       showMovies.innerHTML=result;      
    })
    .catch(error=> {
        // handle error
        console.log(error);
    });
}

function movieSelected(id){
   sessionStorage.setItem("movieId",id);
   window.location="movie.html";
   return false

}
function getMovie(){
    let movieData= sessionStorage.getItem("movieId");
    axios.get('http://www.omdbapi.com/?i='+movieData+'&apikey=9be27fce')
    .then(response=>{
        let movie= response.data;
        let result= `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" alt="" srcset="">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Genre</strong> : ${movie.Genre}</li>
                                <li class="list-group-item"><strong>Released</strong> : ${movie.Released}</li>
                                <li class="list-group-item"><strong>Rate</strong> : ${movie.Rate}</li>
                                <li class="list-group-item"><strong>IMDB Rating</strong> : ${movie.imdbRating}</li>
                                <li class="list-group-item"><strong>Director</strong> : ${movie.Director}</li>
                                <li class="list-group-item"><strong>Writers</strong> : ${movie.Writer}</li>
                                <li class="list-group-item"><strong>Actors</strong> : ${movie.Actors}</li>
                               
                            </ul>
                        </div>

                     </div>
                     <div class="row my-5">
                        <div class="well">
                            <h3> plot</h3>
                            ${movie.Plot}
                        </div>
                     </div>
                      <hr>
                          <a href="http://imdb.com/title/${movieData}" class="btn btn-primary" target="_blank">View IMDB</a>
                         <a href="index.html" class="btn btn-default">Go back to Search</a>
                    `;
         showSelectedMovie.innerHTML=result;
    })

  

}
