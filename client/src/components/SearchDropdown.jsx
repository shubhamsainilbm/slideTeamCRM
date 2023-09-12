import { useEffect, useRef, useState } from "react";

const SearchDropdown = ({
  options,
  name,
  email,
  id,
  selectedVal,
  handleChange,
  labelName,
  placeholder,
  disabled,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[(name, email)]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    disabled === false && setIsOpen(e && e.target === inputRef.current);
  }
  // console.log("first", disabled);
  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options?.filter(
      (option) =>
        option[name]?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option[email]?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  return (
    <>
      <div className="select__dropdown mb-3">
        <label>{labelName}</label>
        <div className="control">
          <div className="selected-value ">
            <input
              ref={inputRef}
              type="text"
              value={getDisplayValue()}
              placeholder={placeholder}
              name="searchTerm"
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
              }}
              onClick={toggle}
              autoComplete="off"
              disabled={disabled}
            />
          </div>
          <div className={`arrow ${isOpen ? "open" : ""}`}></div>
        </div>

        <div className={`options ${isOpen ? "open" : ""}`}>
          {filter(options)?.map((option, index) => {
            return (
              <div
                onClick={() => selectOption(option)}
                className={`option ${
                  option[(name, email)] === selectedVal ? "selected" : ""
                }`}
                key={`${id}-${index}`}
              >
                {option[name]} - {option[email]}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchDropdown;
