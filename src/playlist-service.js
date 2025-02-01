const { Pool } = require("pg");
const { mapSongDbtoSongModel } = require("./utils");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    console.log("getSongsFromPlaylist");
    const query = {
      text: "SELECT p.id AS playlist_id, p.name AS name, s.id AS id, s.title AS title, s.performer AS performer FROM playlist_songs AS ps INNER JOIN songs AS s ON s.id = ps.song_id INNER JOIN playlists AS p ON p.id = ps.playlist_id WHERE ps.playlist_id = $1",
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const songs = result.rows.map(mapSongDbtoSongModel);

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      songs: songs,
    };

    console.log(playlist);

    return playlist;
  }
}

module.exports = PlaylistService;
