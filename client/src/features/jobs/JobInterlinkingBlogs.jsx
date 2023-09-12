import React, { useState } from "react";

const JobInterlinkingBlogs = ({ interlinkingBlogsData }) => {
  const [interlinkingBlogs, setInterlinkingBlogs] = useState([
    { interlinkingBlogs: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...interlinkingBlogs];
    list[index][name] = value.trimLeft();
    setInterlinkingBlogs(list);
    interlinkingBlogsData(interlinkingBlogs);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...interlinkingBlogs];
    list.splice(index, 1);
    setInterlinkingBlogs(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInterlinkingBlogs([...interlinkingBlogs, { interlinkingBlogs: "" }]);
  };
  return (
    <>
      <div className="form__box mb-3">
        <label for="basic-url" class="form-label">
          Interlinking Blogs
        </label>
        {interlinkingBlogs.map((inB, i) => {
          return (
            <>
              <div class="input-group mb-2">
                <input
                  type="text"
                  className="form-control shadow-none"
                  name="interlinkingBlogs"
                  value={inB.interlinkingBlogs}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <div className="btn-box" style={{ display: "flex" }}>
                  {interlinkingBlogs.length !== 1 && (
                    <span
                      className="input-group-text rounded"
                      style={{ backgroundColor: "#F21E1E" }}
                      onClick={() => handleRemoveClick(i)}
                    >
                      <img
                        src="/images/icons/minus.svg"
                        alt="icon"
                        style={{ width: "14px" }}
                      />
                    </span>
                  )}
                  {interlinkingBlogs.length - 1 === i && (
                    <span
                      className="input-group-text rounded justify-content-center"
                      onClick={handleAddClick}
                    >
                      <img src="/images/icons/plus.svg" alt="icon" />
                    </span>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default JobInterlinkingBlogs;
