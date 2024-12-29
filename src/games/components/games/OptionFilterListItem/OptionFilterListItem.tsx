interface OptionFilterListItemProps {
  filter: string;
  handleClickFilter: (value: string) => void;
}

export const OptionFilterListItem = ({
  filter,
  handleClickFilter,
}: OptionFilterListItemProps): JSX.Element => {
  return (
    <li
      className="main_games_section_container_grid_options_list_item"
      onClick={() => handleClickFilter(filter)}
    >
      {filter}
    </li>
  );
};
