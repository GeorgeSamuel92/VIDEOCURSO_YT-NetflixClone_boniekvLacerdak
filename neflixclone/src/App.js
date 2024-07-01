import React, { useEffect, useState } from "react";
import Tmdb from "./API/Tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header"

const App = () => {
  const [movieList, setMovielist] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackheader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        // pegando a lista total
        let list = await Tmdb.getHomeList();
        console.log("Movie List: ", list); // Log para verificar a lista de filmes
        setMovielist(list);

        // pegando o feature
        let originals = list.filter(i => i.slug === 'originals');
        console.log("Originals: ", originals);
        if (originals.length > 0 && originals[0].items.results.length > 0) {
          let randomChosen = Math.floor(Math.random() * originals[0].items.results.length);
          let chosen = originals[0].items.results[randomChosen];
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setFeatureData(chosenInfo);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadAll();
  }, []);

  useEffect (() => {
    const scrollListener = () => {
      if(window.scrollY > 100) {
        setBlackheader(true);
      }else{
        setBlackheader(false);
      }
    }

    window.addEventListener("scroll", scrollListener)
    return () => {
        window.removeEventListener("scroll", scrollListener);
      }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featureData && <FeaturedMovie item={featureData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};

export default App;


// import React, { useEffect, useState } from "react";
// import Tmdb from "./API/Tmdb";
// import "./App.css";
// import MovieRow from "./components/MovieRow";
// import FeaturedMovie from "./components/FeaturedMovie";

// export default () => {
//   const [movieList, setMovielist] = useState([]);
//   const [featureData, setFeatureData] = useState(null);

//   useEffect(() => {
//     const loadAll = async () => {
//       // pegando a lista total
//       let list = await Tmdb.getHomeList();
//       setMovielist(list);

//       // pegando o feature

//       let originals = list.filter(i=>i.slug === 'originals');
//       let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
//       let chosen = originals[0].items.results[randomChosen];

//       console.log(chosen)
//     }
//     loadAll();
//   }, []);

//   return (
//     <div className="page">

//       {featureData && 
//       <FeaturedMovie item={featureData} />
//       }
//       <section className="list">
//         {movieList.map((item, key) => (
//           <MovieRow key={key} title={item.title} items={item.items} />
//         ))}
//       </section>
//     </div>
//   );
// };
