import { type FC } from "react";
import type { CompletedStatus } from "../../shared/interfaces";
import "./filters.css";
const Filters: FC<{
  currentFilter: CompletedStatus;
  setFilter: (status: CompletedStatus) => void;
}> = ({ currentFilter, setFilter }) => {
  const filterOptions: CompletedStatus[] = ["All", "Active", "Completed"];

  return (
    <div className="filters">
      {filterOptions.map((option) => (
        <button
          key={option}
          onClick={() => setFilter(option)}
          className={currentFilter === option ? "active" : ""}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Filters;
