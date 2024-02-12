
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
 

  let [movielist,setmovielist]= useState([])
  let [title,settitle]=useState('');
  let getmoviedata=()=>{
    let apiurl;
    if(title===''){
      apiurl=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
    }else{
      apiurl=`https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`
    }
    axios.get(apiurl)
    .then((res)=>res.data)
    .then((finalres)=>{
      setmovielist (finalres.results)
    })
  }
  let mitems = movielist.map((v,i)=>{
    return(
     <Moviecard v={v} key={i}/>
    )
 })


  useEffect(()=>{
    getmoviedata();
  },[title])
  return (
    <>
    <div className='container'>
      <div className='row'>
        <h1 className='text-center py-5'>Movie App</h1>

        
        <div className='row'>
          <div className='col-12'>

            <input type='text' placeholder='search by name ...' onChange={(event)=>settitle(event.target.value)} className='w-100' style={{height:'50px'}}/>
          </div>
        </div>


        {movielist.length>1 ? 


        mitems
      
      
      :
      ''
      }
      


      </div>
    </div>
    
    
    </>
  );
}

export default App;
function  Moviecard({v}){
  return(  <div className='col-lg-3 gy-3'>
  <div class="card">
     <img src={'https://image.tmdb.org/t/p/w1280/'+v.poster_path} class="card-img-top" alt="..."/>
     <div class="card-body">
       <h5 class="card-title">{v.original_title}</h5>
       <p class="card-text">{v.overview.slice(0,50)}.....</p>
       <a href="#" class="btn btn-primary">Go somewhere</a>
   </div>
</div>
  </div> )
}
