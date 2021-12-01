import React from "react";

import Button from '../Button/';


const FilterBy = ({handleFilter, filterBy}) => {
  return (
    <div className="filter">
      <Button 
        nameClass={`button-filter ${(filterBy === "All") && "active"}`} 
        nameButton="All" 
        handleFilter={handleFilter} 
      />
      <Button
        nameClass={`button-filter ${(filterBy === "Done") && "active"}`}
        nameButton="Done"
        handleFilter={handleFilter}
      />
      <Button
        nameClass={`button-filter ${(filterBy === "Undone") && "active"}`}
        nameButton="Undone"
        handleFilter={handleFilter}
      />
    </div>
  )
}

export default FilterBy;