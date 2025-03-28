"use client";

import styles from "./FilterSidebar.module.css";

type FilterSidebarProps = {
  onFilterChange: (filters: any) => void;
};

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const handleFilterChange = () => {
    onFilterChange({});
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
      <h3 className={styles.title}>Filter By:</h3>
      <button className={styles.resetBtn} onClick={handleFilterChange}>Reset</button>
      </div>

      <div className={styles.section}>
        <h4>Rating</h4>
        <ul>
          <li>
            <input type="checkbox" /> Show all
          </li>
          <li>
            <input type="checkbox" /> 1 Star
          </li>
          <li>
            <input type="checkbox" /> 2 Star
          </li>
          <li>
            <input type="checkbox" /> 3 Star
          </li>
          <li>
            <input type="checkbox" /> 4 Star
          </li>
          <li>
            <input type="checkbox" /> 5 Star
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h4>Experience</h4>
        <ul>
          <li>
            <input type="checkbox" /> 16+ years
          </li>
          <li>
            <input type="checkbox" /> 10-15 years
          </li>
          <li>
            <input type="checkbox" /> 5-10 years
          </li>
          <li>
            <input type="checkbox" /> 3-5 years
          </li>
          <li>
            <input type="checkbox" /> 1-3 years
          </li>
          <li>
            <input type="checkbox" /> 0-1 years
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h4>Gender</h4>
        <ul>
          <li>
            <input type="checkbox" /> Show all
          </li>
          <li>
            <input type="checkbox" /> Male
          </li>
          <li>
            <input type="checkbox" /> Female
          </li>
        </ul>
      </div>

    </aside>
  );
};

export default FilterSidebar;
