import React, { useEffect, useState } from "react";
import Tmdb from "./API/Tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

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
        let originals = list.filter((i) => i.slug === "originals");
        console.log("Originals: ", originals);
        if (originals.length > 0 && originals[0].items.results.length > 0) {
          let randomChosen = Math.floor(
            Math.random() * originals[0].items.results.length
          );
          let chosen = originals[0].items.results[randomChosen];
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
          setFeatureData(chosenInfo);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        setBlackheader(true);
      } else {
        setBlackheader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featureData && <FeaturedMovie item={featureData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <p>
          Feito originalmente com{" "}
          <span role="img" aria-label="coração">
            ❤️
          </span>{" "}
          por Boniekv Lacerda.
        </p>
        <p>replicado como aprendizado de React por Jorge Samuel</p>
        <p>Direitos de imagem para Netfix</p>
        <p>Dados pegos no site themoviedb.org</p>
        <p>
          Fonte: <a href="https://www.themoviedb.org/">TheMovieDB</a>
        </p>
        <p>
          Api: <a href="https://developers.themoviedb.org/3/">TMDB</a>
        </p>
      </footer>
      {movieList.length <= 0 && 
        <div className="loading">
          <img
            src="https://tenor.com/pt-BR/view/netflixhttps://cdn-blog.seedly.sg/wp-content/uploads/2020/01/17101249/Netflix-Logo-Unfurlinghttps://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif.gif-gif-2170283377868013570"
            alt="Carregando"
          />
        </div>
      }
    </div>
  );
};

export default App;
