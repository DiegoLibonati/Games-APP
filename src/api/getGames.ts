import { Game } from "../entities/entities";

import { gamesApi } from "./gamesApi";

export const getGames = async (): Promise<Game[]> => {
  const response = await gamesApi.get("/api/games", {
    method: "GET",
    params: { id: "452" },
  });

  const data: Game[] = await response.data;

  return data;
};
