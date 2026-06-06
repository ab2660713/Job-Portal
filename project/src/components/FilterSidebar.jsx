import { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    category: []
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      jobType: [],
      experience: [],
      location: [],
      category: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Los Angeles, CA', 'Boston, MA', 'Austin, TX'];
  const categories = ['Technology', 'Design', 'Marketing', 'Data Science', 'Product', 'Content', 'Security', 'Human Resources'];

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={handleClearFilters} className="clear-filters-btn">
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <h4>Job Type</h4>
        {jobTypes.map(type => (
          <label key={type} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.jobType.includes(type)}
              onChange={() => handleFilterChange('jobType', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Experience Level</h4>
        {experienceLevels.map(level => (
          <label key={level} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.experience.includes(level)}
              onChange={() => handleFilterChange('experience', level)}
            />
            <span>{level}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Location</h4>
        {locations.map(loc => (
          <label key={loc} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.location.includes(loc)}
              onChange={() => handleFilterChange('location', loc)}
            />
            <span>{loc}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Category</h4>
        {categories.map(cat => (
          <label key={cat} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleFilterChange('category', cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
