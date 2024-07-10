import { create } from "zustand";

interface MypageState {
  nickname: string;
  profileImage: string;
  favoritePokemons: string[];
  comments: string[];
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  setFavoritePokemons: (favoritePokemons: string[]) => void;
  setComments: (comments: string[]) => void;
}

const useMypage = create<MypageState>((set) => ({
  nickname: "string",
  profileImage: "/image/profile-pokemon.png",
  favoritePokemons: [],
  comments: [],
  setNickname: (nickname: string) => set({ nickname }),
  setProfileImage: (profileImage: string) => set({ profileImage }),
  setFavoritePokemons: (favoritePokemons: string[]) =>
    set({ favoritePokemons }),
  setComments: (comments: string[]) => set({ comments }),
}));

export default useMypage;
