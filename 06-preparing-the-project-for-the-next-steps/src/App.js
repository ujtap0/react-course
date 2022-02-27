import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-617c6-default-rtdb.firebaseio.com/movies.json');
      // /movies: 데이터 베이스에 새로운 node 생성
      // .json: request를 보낼 때 .json을 붙여줘야함
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-617c6-default-rtdb.firebaseio.com/movies.json',{
      //fetch의 default method는 get인데 post로 바꿔줄 수 있음
      method: 'POST',
      //JSON.stringfy: js 객체를 json 객체로 바꿔줌
      body: JSON.stringify(movie),
      headers:{
        //firebase에서 headeds는 따로 필요 없지만
        //보통 REST API로 데이터 보낼 때 내용에 대한 설명을 담은 header를 같이 보내야 할 경우가 많다
        'Content-Type': 'application/json'
      }
    })
    //위 코드는 데이터를 파이어베이스에 send
    //아래 코드는 데이터를 파이어베이스로부터 get
    let data = await response.json();
    console.log(data)
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
