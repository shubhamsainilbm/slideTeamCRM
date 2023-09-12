import React, { useState, useRef } from "react";
// import styles from './UploadImage.module.css'

const UploadImage = () => {
  const [file, setFile] = useState("images/cloud.png");
  // const [file, setFile] = useState("images/icons/cloud.svg");
  const imageRef = useRef();

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  const handleChange = (event) => {
    let id = event.target.id;
    const fileObject = event.target.files[0];
    if (!fileObject) return;
    setFile(URL.createObjectURL(event.target.files[0]));
    // uploadpic({fileObject,id})
  };

  console.log("first", file);

  return (
    <>
      <div className="upload__img d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="choose_image mb-md-4 mb-2"
            onClick={showOpenFileDialog}
          >
            <span className="placeholder" onChange={handleChange}>
              <div>
                <img
                  src={file}
                  id="input"
                  className="img-thumbnail p-0 border-0 bg-transparent "
                />
                <p className="mb-0 mt-2">
                  {" "}
                  Drop .CSV files to upload <br /> or <span>Browse</span>
                </p>
              </div>
            </span>

            <input
              type="file"
              ref={imageRef}
              id="input"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </div>

          <label>
            Please Upload only .CSV file
            <br /> (eg. example.csv)
          </label>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
