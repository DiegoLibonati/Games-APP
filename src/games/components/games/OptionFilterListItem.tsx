import { OptionFilterListItemProps } from "../../../entities/entities";

export const OptionFilterListItem = ({
  option,
  filterOption,
}: OptionFilterListItemProps): JSX.Element => {
  return (
    <li
      className="main_games_section_container_grid_options_list_item"
      onClick={() => filterOption(option)}
    >
      {option}
    </li>
  );
};
