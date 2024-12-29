import axios from "axios";

import { CONFIG } from "../constants/config";

export const gamesApi = axios.create({
  baseURL: "https://free-to-play-games-database.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": CONFIG.xRapid.apiKey,
    "X-RapidAPI-Host": CONFIG.xRapid.apiHost,
  },
});
