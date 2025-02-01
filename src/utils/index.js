const mapSongDbtoSongModel = ({ id, title, performer }) => ({
  id,
  title: title,
  performer: performer,
});

module.exports = { mapSongDbtoSongModel };
