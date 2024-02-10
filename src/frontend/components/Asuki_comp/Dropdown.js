import React from "react";
// import { useState, useEffect } from "react";
import "./Dropdown.css";
const { useState, useEffect } = React;

const data = [
  { id: 0, label: "line1" },
  { id: 1, label: "line2" },
];

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item) => item.id == selectedItem).label
          : "Status"}

        {/* <svg
          className={` icon ${isOpen && "open"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 36 36"
          fill="none">
          <path
            d="M22.8 15.735L19.845 12.78L15.03 7.96501C14.01 6.96001 12.27 7.68001 12.27 9.12001V18.465V26.88C12.27 28.32 14.01 29.04 15.03 28.02L22.8 20.25C24.045 19.02 24.045 16.98 22.8 15.735Z"
            fill="#fff1a0"></path>
        </svg> */}

        <svg
          className={` icon ${isOpen && "open"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none">
          <path
            d="M22.8 15.735L19.845 12.78L15.03 7.96501C14.01 6.96001 12.27 7.68001 12.27 9.12001V18.465V26.88C12.27 28.32 14.01 29.04 15.03 28.02L22.8 20.25C24.045 19.02 24.045 16.98 22.8 15.735Z"
            fill="#FFF1A0"
          />
        </svg>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <div
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id)}
            id={item.id}>
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}>
              •{" "}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
