const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

//CREATE
router.get("/movies/create", async (req, res, next) => {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", {celebrities: allCelebrities});
  });
  

router.post("/movies/create", async (req, res, next) => {
    try {
    const {title, genre, plot, cast} = req.body;
    const movie = req.body
    const newMovie = await Movie.create(movie);
      console.log('Movie created:', newMovie.title);
      res.redirect('/movies')
    } catch (error) {
      next(error);
    }
});

//READ
router.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies});
    } catch (error) {
        next(error)
    }
});


router.get("/:moviesId", async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await movie.findById(movieId).populate('movies');
    const moviesList = await Movie.find()
    const {_id, title, genre, plot, cast} = movie;
    res.render("movies/movie-details", {movie});
  } catch (error) {
    next(error);
  }
});


//UPDATE
router.get('/movies/:moviesId/edit', async (req, res, next) => {
    try {
    const {movieId} = req.params
    const movie = await Movie.findById(movieId);
    const celebrity = await Celebrity.find(allCelebrities);
    res.render('movies/edit-movie', movie)
    } catch(error) {
        next(error)
    }
})


router.post('/movies/:moviesId/edit', async (req, res, next) => {
    try {
        const {movieId} = req.params;
        const {title, genre, plot, cast} = req.body;
        const updateMovie = await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast});
        res.redirect('movies/movie-details');

    } catch(error) {
        next(error)
    }
});


//DELETE
router.post('/movies/:moviesId/delete', async (req, res, next) => {
    try {
        const {moviesId} = req.params;
        await Movie.findByIdAndDelete(movieId);
        res.redirect('/movies');
    } catch(error) {
        next(error);
    }
});



module.exports = router;