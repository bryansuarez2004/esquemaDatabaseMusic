const express = require('express');
const userRouter = require('./user.router');
const trackRouter = require('./track.router');
const playlistRouter = require('./playlist.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',userRouter)
router.use('/tracks',trackRouter)
router.use('/playlists',playlistRouter)

module.exports = router;