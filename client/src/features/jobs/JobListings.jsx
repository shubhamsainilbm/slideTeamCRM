import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReactPaginate from "react-paginate";
import CsvUpload from "./CsvUpload";
import JobCreate from "./JobCreate";
import AllJobs from "./AllJobs";
import useAuth from "../../hooks/useAuth";

export default function JobListings() {
  const { permissions } = useAuth();
  const boxData = [
    {
      b_color: "#BB6BDD",
      shadow: "0px 0px 10px 0px #ECB9FF inset",
      value: "1",
      status: "In Progress",
    },
    {
      b_color: "#1D9013",
      shadow: "0px 0px 10px 0px #83FF75 inset",
      value: "1",
      status: "Complete",
    },
    {
      b_color: "#F21E1E",
      shadow: "0px 0px 10px 0px #FFBDBD inset",
      value: "4",
      status: "Awaiting Feedback",
    },
    {
      b_color: "#9A9A9A",
      shadow: " 0px 0px 10px 0px #D8D8D8 inset",
      value: "1",
      status: "On Hold",
    },
    {
      b_color: "#F58838",
      shadow: "0px 0px 10px 0px #FFDDC3 inset",
      value: "1",
      status: "Testing",
    },
    {
      b_color: "#28A6FA",
      shadow: "0px 0px 10px 0px rgba(40, 166, 250, 0.58) inset",
      value: "1",
      status: "Not Started",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <section className="create_job__sec py-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="table__job py-2 px-0">
                  <div className="table__head mb-3   px-ms-3 px-0 d-flex flex-wrap justify-content-between align-items-center">
                    <h6 className="mb-0">Jobs</h6>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        // justifyContent: "flex-end",
                      }}
                    >
                      {permissions?.view?.createJob && (
                        <>
                          <CsvUpload />
                          <JobCreate />
                        </>
                      )}
                    </div>
                  </div>
                  {/* 
                        <div className="d-sm-flex  d-block p-md-2 p-0  mb-4 justify-content-between job_info">
                       {boxData.map((val,i) => {
                        return(
                            <div className="job_info_box p-3 rounded text-center  mb-3 mb-md-0" key={i} style={{borderColor:val.b_color , boxShadow:val.shadow , flexBasis: '20%' }}>
                            <h4>{val.value}</h4>
                             <p className="mb-0">{val.status}</p>
                        </div>
                        )
                       })}
                        </div> */}

                  <div className="row p-md-2 p-0  mb-4 job_info">
                    {boxData.map((val, i) => {
                      return (
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2">
                          <div
                            className="job_info_box p-3 rounded text-center  mb-3"
                            key={i}
                            style={{
                              borderColor: val.b_color,
                              boxShadow: val.shadow,
                            }}
                          >
                            <h4>{val.value}</h4>
                            <p className="mb-0">{val.status}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <AllJobs />

               
                </div>
              </div>
              {/* ======JOB"S TABLE BOX====== */}
            </div>
          </div>
        </section>

        {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCreateJob" aria-controls="offcanvasCreateJob">Toggle right offcanvas</button> */}
      </DashboardLayout>
    </>
  );
}

// import React, { useState } from "react";

// function App() {
//   const [inputList, setInputList] = useState([{ firstName: "" }]);

//   // handle input change
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };

//   // handle click event of the Remove button
//   const handleRemoveClick = (index) => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };

//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, { firstName: "" }]);
//   };

//   return (
//     <div className="App">
//       {inputList.map((x, i) => {
//         return (
//           <div className="box">
//             <input
//               name="firstName"
//               placeholder="Enter First Name"
//               value={x.firstName}
//               onChange={(e) => handleInputChange(e, i)}
//             />
//             <div className="btn-box">
//               {inputList.length !== 1 && (
//                 <button className="mr10" onClick={() => handleRemoveClick(i)}>
//                   Remove
//                 </button>
//               )}
//               {inputList.length - 1 === i && (
//                 <button onClick={handleAddClick}>Add</button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//     </div>
//   );
// }

// export default App;
