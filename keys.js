
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsInTown = {
  clientId: process.env.BANDS_IN_TOWN_SECRET
};

exports.ombd = {
  key: process.env.OMBD_KEY
}

// bands key 34ca1ba5-4e38-4d1f-bc68-89f3cee2c097
