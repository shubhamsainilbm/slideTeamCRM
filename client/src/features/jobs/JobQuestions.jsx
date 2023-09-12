import React, { useState } from "react";

const JobQuestions = ({ questionsData, quesRef }) => {
  const [questionsList, setQuestionsList] = useState([{ questions: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionsList];
    list[index][name] = value.trimLeft();
    setQuestionsList(list);
    questionsData(questionsList);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...questionsList];
    list.splice(index, 1);
    setQuestionsList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setQuestionsList([...questionsList, { questions: "" }]);
  };
  return (
    <>
      <div className="form__box mb-3">
        <label for="basic-url" class="form-label">
          Questions
        </label>
        {questionsList.map((q, i) => {
          return (
            <>
              <div class="input-group mb-2">
                <input
                  ref={quesRef}
                  type="text"
                  className="form-control shadow-none"
                  name="questions"
                  value={q.questions}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <div className="btn-box" style={{ display: "flex" }}>
                  {questionsList.length !== 1 && (
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
                  {questionsList.length - 1 === i && (
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
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(questionsList)}</div> */}
    </>
  );
};

export default JobQuestions;
