import { create } from "zustand";

type movieState = {
  movie: any;
  setMovie: (movie: any) => void;
};
const useSelectMovie = create<movieState>((set) => ({
  movie: null,
  setMovie: (movie: any) => set({ movie }),
}));

export default useSelectMovie;
