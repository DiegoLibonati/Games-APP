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
    <article className="option__filter">
      <div
        className="option__filter-header"
        onClick={handleClickOpenAndClose}
      >
        <h3>{name}</h3>
        {!isOpen && (
          <button type="button" aria-label="open filter">
            <FaChevronDown className="icon__option-filter-header"></FaChevronDown>
          </button>
        )}
        {isOpen && (
          <button type="button" aria-label="close filter">
            <FaChevronUp className="icon__option-filter-header"></FaChevronUp>
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="sub-filter__options">
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
