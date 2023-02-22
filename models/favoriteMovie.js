const mongoose = require('mongoose');

const FavoriteMovieSchema = new mongoose.Schema({
  title: {type: String},
  original_title: {type: String},
  backdrop_path: {type: String},
  poster_path: {type: String},
  genre_ids : {type: Array},
  id : {type: Number},
  overview : {type: String},
  vote_average : {type: Number},
  release_date : {type: String},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('FavoriteMovie', FavoriteMovieSchema);
