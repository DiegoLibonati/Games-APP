import { useSelector } from "react-redux";
import { manageCategoryFilter, manageNavbar } from "../store/ui/exports";
import { RootState, useAppDispatch } from "../store/store";
import { UseUiStore } from "../entities/entities";

export const useUiStore = (): UseUiStore => {
  const dispatch = useAppDispatch();

  const { isNavbarOpen, isCategoryFilterOpen } = useSelector(
    (state: RootState) => state.ui
  );

  const handleNavbarMobile = (): void => {
    dispatch(manageNavbar());
  };

  const handleCategoryFilter = (): void => {
    dispatch(manageCategoryFilter());
  };

  return {
    isNavbarOpen,
    isCategoryFilterOpen,
    handleNavbarMobile,
    handleCategoryFilter,
  };
};
