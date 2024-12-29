import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { OptionFilterListItem } from "../OptionFilterListItem/OptionFilterListItem";

interface OptionFilterProps {
  name: string;
  isOpen: boolean;
  arr: string[];
  handleClickFilter: (value: string) => void;
  handleClickOpenAndClose: React.MouseEventHandler<HTMLDivElement>;
}

export const OptionFilter = ({
  name,
  isOpen,
  arr,
  handleClickFilter,
  handleClickOpenAndClose,
}: OptionFilterProps): JSX.Element => {
  return (
    <article className="main_games_section_container_grid_options_option">
      <div
        className="main_games_section_container_grid_options_option_header"
        onClick={handleClickOpenAndClose}
      >
        <h3>{name}</h3>
        {!isOpen && (
          <button type="button" aria-label="open filter">
            <FaChevronDown className="games_section_icon_header"></FaChevronDown>
          </button>
        )}
        {isOpen && (
          <button type="button" aria-label="close filter">
            <FaChevronUp className="games_section_icon_header"></FaChevronUp>
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="main_games_section_container_grid_options_list">
          {arr.map((option) => (
            <OptionFilterListItem
              key={option}
              filter={option}
              handleClickFilter={handleClickFilter}
            ></OptionFilterListItem>
          ))}
        </ul>
      )}
    </article>
  );
};
