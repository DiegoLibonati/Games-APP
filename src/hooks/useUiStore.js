import { useDispatch, useSelector } from "react-redux";
import { manageCategoryFilter, manageNavbar } from "../store/ui/exports";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isNavbarOpen, isCategoryFilterOpen } = useSelector(
    (state) => state.ui
  );

  const handleNavbarMobile = () => {
    dispatch(manageNavbar());
  };

  const handleCategoryFilter = () => {
    dispatch(manageCategoryFilter());
  };

  return {
    isNavbarOpen,
    isCategoryFilterOpen,
    handleNavbarMobile,
    handleCategoryFilter,
  };
};
