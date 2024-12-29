import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../entities/entities";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
