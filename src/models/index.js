const Playlist = require("./Playlist");
const Track = require("./Track");
const User = require("./User");


Playlist.belongsTo(User)
User.hasMany(Playlist)


Playlist.belongsToMany(Track,{through:'playlistsTracks'})
Track.belongsToMany(Playlist,{through:'playlistsTracks'})


User.belongsToMany(Track,{through:'UsersTracks'})
Track.belongsToMany(User,{through:'UsersTracks'})



