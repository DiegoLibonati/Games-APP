import { Game } from "../entities/entities";

import { gamesApi } from "./gamesApi";

export const getGamesByCategory = async (category: string): Promise<Game[]> => {
  const response = await gamesApi.get(`/api/games?category=${category}`, {
    method: "GET",
    params: { id: "452" },
  });

  const data: Game[] = response.data;

  return data;
};
