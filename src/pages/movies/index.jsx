import React,{useState,useEffect} from "react";
import axios from 'axios'

const Movies = () => {
  const[results,setResults]=useState([])
  const [rest, setRest] = useState("");
  const [dataFilter] = useState(["title","original_title"]);

  const getData = async () => {
    try {
      await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=54cd1af69dd6dc43fcfdfc3a29bef89b&language=en-US')
      .then((res)=>{
        console.log(res.data.results)
        setResults(res.data.results)
      })
    } catch(error) {
      console.error(error)
    }
  }

  const searchMovie =(results)=>{
    return results.filter((item)=>{
      return dataFilter.some((filter)=>{
       return item[filter].toString().toLowerCase().indexOf(rest.toLowerCase())>-1
      })
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Movies search easy</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Movies</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <input 
                    type="search" 
                    className="form-control" 
                    name="search"
                        value={rest}
                        onChange={(e)=>setRest(e.target.value)}
                    placeholder="Search movie" />
                  </div>
                </div>
              </div>
              {searchMovie(results).map((movie)=>(
                <div className="col-md-2" key={movie.id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ movie.poster_path}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{movie.title.substring(0,15)}</h4>
                    <p className="card-text text-muted">
                      {movie.overview.substring(0, 30)}...
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
