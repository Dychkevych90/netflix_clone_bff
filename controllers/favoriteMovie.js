const express = require('express');
const router = express.Router();

const FavoriteMovie = require('../models/favoriteMovie');
const User = require('../models/user');

// Get all favorite movies for a specific user
router.get('/users/:userId/favorite-movies', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const favoriteMovies = await FavoriteMovie.find({ user });
    res.json(favoriteMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a favorite movie for a specific user
router.post('/users/:userId/favorite-movies', async (req, res) => {
  const userId = req.params.userId;

  const favoriteMovie = new FavoriteMovie({
    title: req.body.title,
    original_title : req.body.original_title,
    backdrop_path : req.body.backdrop_path,
    genre_ids : req.body.genre_ids,
    id : req.body.id,
    overview : req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    vote_average: req.body.vote_average,
    user: userId
  });
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const savedFavoriteMovie = await favoriteMovie.save();
    res.status(201).json(savedFavoriteMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a favorite movie for a specific user
router.patch('/users/:userId/favorite-movies/:favoriteMovieId', async (req, res) => {
  const userId = req.params.userId;
  const favoriteMovieId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const favoriteMovie = await FavoriteMovie.findOneAndUpdate({ _id: favoriteMovieId, user: userId }, req.body, { new: true });
    if (!favoriteMovie) {
      return res.status(404).json({ message: 'Favorite movie not found' });
    }
    res.json(favoriteMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a favorite movie for a specific user
router.delete('/users/:userId/favorite-movies/:favoriteMovieId', async (req, res) => {
  const userId = req.params.userId;
  const favoriteMovieId = req.params.favoriteMovieId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedFavoriteMovie = await FavoriteMovie.findOneAndDelete({ id: favoriteMovieId, user: userId });
    if (!deletedFavoriteMovie) {
      return res.status(404).json({ message: 'Favorite movie not found' });
    }
    res.json(deletedFavoriteMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
