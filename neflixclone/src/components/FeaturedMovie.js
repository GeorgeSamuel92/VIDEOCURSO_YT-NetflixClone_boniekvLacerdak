import React from "react";
import "./FeaturedMovie.css";

const FeaturedMovie = ({ item }) => {
  console.log(item);
  if (!item) return null;

  // const truncate = (str, n) => {
  //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // };

  let description = item.overview;
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }
  let firstDate = new Date(item.first_air_date);
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}{" "}
            </div>
          </div>
          <div className="featured--description">
            {description}
            {/* {truncate(item.overview, 200)} */}
          </div>
          <div className="featured--buttons">
            <a href={`/whach/${item.id}`} className="featured--watchButton">
              {" "}
              ► Assistir
            </a>
            <a href={`/list/add/${item.id}`} className="featured--myListButton">
              {" "}
              + Minha Lista
            </a>
          </div>
          <div className="featured--genres">
            <strong>Gêneros: </strong>
            {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;