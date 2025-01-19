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
      className="option__filter-item"
      onClick={() => handleClickFilter(filter)}
    >
      {filter}
    </li>
  );
};
