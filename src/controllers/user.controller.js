const catchError = require('../utils/catchError');
const User = require('../models/User');
const Track = require('../models/Track');
const Playlist = require('../models/Playlist');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({
        include: [
          // Product
          {
            model: Playlist,
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: {
              model: Track,
              attributes: ['name']
            }
          },
          {
            model:Track
          }
        ],
       
    
      });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id,{ include:[Track,Playlist]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setFavoriteTracks = catchError(async(req,res)=>{
    const { id } = req.params;
    const result = await User.findByPk(id);

    if (!result) return res.sendStatus(404)

    await result.addTracks(req.body)

    const tracks = await result.getTracks()

  return res.json(tracks)
})

const removeFavoriteTracks = catchError(async(req,res)=>{
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) return res.sendStatus(404)

    await result.removeTracks(req.body)

    const tracks = await result.getTracks()

  return res.json(tracks)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setFavoriteTracks,
    removeFavoriteTracks
}   