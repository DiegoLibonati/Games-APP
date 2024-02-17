import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { OptionFilterListItem } from "./exports";
import { OptionFilterProps } from "../../../entities/entities";

export const OptionFilter = ({
  filterName,
  isFilterOpen,
  optionsArray,
  filter,
  headerFunctionManage,
}: OptionFilterProps): JSX.Element => {
  return (
    <article className="main_games_section_container_grid_options_option">
      <div
        className="main_games_section_container_grid_options_option_header"
        onClick={headerFunctionManage}
      >
        <h3>{filterName}</h3>
        {!isFilterOpen && (
          <FaChevronDown className="games_section_icon_header"></FaChevronDown>
        )}
        {isFilterOpen && (
          <FaChevronUp className="games_section_icon_header"></FaChevronUp>
        )}
      </div>

      {isFilterOpen && (
        <ul className="main_games_section_container_grid_options_list">
          {optionsArray.map((option) => (
            <OptionFilterListItem
              key={option}
              option={option}
              filterOption={filter}
            ></OptionFilterListItem>
          ))}
        </ul>
      )}
    </article>
  );
};
