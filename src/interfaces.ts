import { ReactNode } from "react";
import { MediaType } from "./types";

export interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface Season {
  id: number;
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
