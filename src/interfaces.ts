import { ReactNode } from "react";
import { MediaType } from "./types";

export interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface Season {
  id: number;
  seasonNumber: number;
}

export interface Film {
  id: number;
  title: string;
  mediaType: MediaType;
  description: string;
  posterPath: string;
  coverPath: string;
  genreIds: number[];
  seasons: Season[];
}

export interface Cast {
  id: number;
  name: string;
  characterName: string;
  profilePath: string;
}

export interface Trailer {
  id: number;
  key: string;
}

export interface Genre {
  id: number;
  name: string;
}
