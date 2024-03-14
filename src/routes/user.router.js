const { getAll, create, getOne, remove, update, setFavoriteTracks, removeFavoriteTracks } = require('../controllers/user.controller');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)
    .post(create);

userRouter.route('/:id/setTracks')
    .post(setFavoriteTracks)    

userRouter.route('/:id/removeTracks')
    .post(removeFavoriteTracks)    

userRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = userRouter;