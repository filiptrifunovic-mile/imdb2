import { Film } from "./interfaces";
import { MediaType } from "./types";

export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + " " + (val2 || "");
};

export const formatResult = (mediaType: MediaType, obj: any): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    genreIds: obj.genre_ids || [],
    mediaType,
    seasons: obj.seasons || [],
  };
};
