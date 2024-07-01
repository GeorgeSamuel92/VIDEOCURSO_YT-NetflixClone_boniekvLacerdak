const API_KEY = "a2f120f7e9050581829cfb6787bbb97c";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

const Tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do NetFlix",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        items: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "toprated",
        title: "Em alta",
        items: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?with_genes=28&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(
          `/discover/movie?with_genes=35&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genes=27&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genes=10749&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentarios",
        items: await basicFetch(
          `/discover/movie?with_genes=99&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieID, type) => {
    let info = {};

    if (movieID) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${movieID}?language=pt-BR&api_key=${API_KEY}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${movieID}?language=pt-BR&api_key=${API_KEY}`);
          break;
          default:
            info = null;
          break;
      }
    }
    return info;
  },
};

export default Tmdb;
