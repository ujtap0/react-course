import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

//sizeEffect(http request)는 useEffect사용

function App() {
  const [movies, setMovies] = useState([]);
  //데이터를 받아오는데 걸리는 로딩시간
  const [isLoading, setIsLoadng] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler =useCallback(async ()=>{
    setIsLoadng(true);
    setError(null);
    try{
      //request할 url을 넣어줌
      //fetcy(URL,{
      // 다양한 option을 설정할 수 있음
      // 예를 들어 http method를 수정할 수도 있는데 default method는 GET
      //})
      //fetch는 promise를 return = object
      //then의 역할은 앞의 response와 완료되면 그다음 코드를 실행시킬 수 있도록
      //.catch는 에러발생 시 어떻게 처리할 지
      const response = await fetch('https://swapi.dev/api/films/');

      console.log(response)
      
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data= await response.json();

      const transformedMovies = data.results.map(movieData=>{
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
        setMovies(transformedMovies);
        
        //response는 data 객체
        //이 api는 데이터를 json 객체로 보냄
        //데이터를 쓰기 위해 traslation step이 필요함
        //response 객체 안에 Json 응답 body를 js 객체로 translate해주는 built-in method가 있음
        //data는 JSON객체를 자바스크립트 객체로 transformed된 데이터
    }catch(error){
      setError(error.message)
    }
    setIsLoadng(false);
  },[])

  useEffect(()=>{
    fetchMovieHandler();
  }, [fetchMovieHandler])

  let content = <p>Found no movies</p>;
  if(movies.length>0){
    content = <MoviesList movies={movies}/> 
  }
  if(error){
    content=<p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

// how to interact with db
//리액트와 데이터베이스가 바로 연결되면 안됨 - 매우 불안정하고 
//데이터베이스에 접근할 수 있도록 하는 인증서가 브러우저에 노출될 수 있음 - 모든 자바스크립트 코드는 브라우저 상에서 접근가능하고 읽을 수 있음
//performance issue 발생
//그래서 리액트에서 바로 백엔드와 연결하려는 것보다 다른 루트를 통해서 백엔드와 연결을 시도해야함
//backend application running on another machine - 브라우저에서 작동하는 것이 아니라 다른 서버에서 돌아가도록 예를 들어 데이터 베이스와 같은 서버라던지 아니면 완전 다른 서버라던지

//backend app의 언어는 php, node js등 다양하게 쓸 수 있음 안정적으로 데이터 베이스 인증서등 저장해야하고 유저가 코드를 볼 수 없어야함

//react server는 backend api(backend app)와 통신 
//api = application programming interface

//REST, Graph QL: 서버가 데이터를 어떻게 내보낼건지
//REST: URLs
//URL로 request를 보내면 데이터가 특정한 형식으로 get back
//URL을 어떻게 보내느냐에 따라 받아올 수 있는 data가 다름

//Fetch API : 브라우저 내장 : data를 fetch/send 하도록 만들어 주는 method


//Promise란?
//프로미스는 자바스크립트 비동기 처리에 사용되는 객체
//비동기 처리? 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스클비트의 특성
//프로미스틑 서버에서 받아온 데이터를 화면에 표시할 때 사용

//프로미스의 연결은 then()메서로 이어줌 then을 호출하면 새로운 프로미스 객체가 반환됨


//---------------------------------------------------------
//fetch data를 브라우저가 로딩되자마자 할 수 있도록 useEffect()써줌
//http request를 요청하는 것은 side effect에 속한다
//만약 main component function안에서 fetch 함수를 어떤 조건 변화에 의해(update state -> re-evaluate -> re- excute -> 함수 재호출->다시 update state) 다시 호출한다면 무한 루프 발생
//useEffect의 장점중 하나는 컴포넌트가 렌더링 되는 사이클에서 함수가 호출될 때
//useEffect의 dependencies가 [](빈arr)이면 컴포넌트가 처음 로드될 때 한번만 실행됨
//dependencies에 함수가 다시 실행될 변경상황일 될 변수를 넣어주는 연습을 하는 것은 매우 중요한데
//dependencis에 fetchMovieHandler를 넣어줌
