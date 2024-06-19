import { Artist } from "./artist";
import { PlaylistMusic } from "./playlistMusic";

export type Music = {
    id: number;
    name: string;
    album: string;
    artistId: number;
    duration: number;
    artist: Artist;
    img?: string;
    playlists?: PlaylistMusic[];
};




