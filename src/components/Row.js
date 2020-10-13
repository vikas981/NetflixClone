import React, { useState,useEffect } from 'react'
import axios  from '../axios'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'
import '../Row.css'

const base_url="https://image.tmdb.org/t/p/original/";

const Row = (props) =>{
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(() => {
      async function fetchData(){
          const request= await axios.get(props.fetchUrl);
          setMovies(request.data.results);
          return request;
         
      }
      fetchData();
    },[props.fetchUrl]);

    const opts={
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      },
    };
    const handleClick =(movie)=>{
      if(trailerUrl){
        setTrailerUrl("");

      }else{
        movieTrailer(movie?.name || "")
        .then(url =>{
          const urlParams=new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));

        }).catch((error)=>console.log(error))
      }
    };
   
        
    return(
         <div className="row">
           <h2>{props.title}</h2>
           <div className="row_posters">
               {
                   movies.map((val,ind)=>(  
                    <img 
                    key={val.id}
                    onClick={()=>handleClick(val)}
                    className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
                    src={`${base_url}${ props.isLargeRow ? val.poster_path :val.poster_path}`} 
                    alt={val.name} />     
                   ))}
           </div>
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
         </div>
      
    )
}
export default Row;