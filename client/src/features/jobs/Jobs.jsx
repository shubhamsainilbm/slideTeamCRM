import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllJobs, selectJobById } from "./jobsApiSlice";

const Jobs = ({ jobId }) => {
  const job = useSelector((state) => selectJobById(state, jobId));
  const navigate = useNavigate();
  console.log("dsfsdfdsfdsffsdfsdf", jobId);
  let content;

  if (job) {
    const date = new Date(job?.createdAt).toLocaleDateString("en-us");

    // const handleEdit = () =>  navigate(`/edit-user/${userId}`);
    content = (
      <tr>
        {/* <td>
          <div className="form-check ms-2">
            <input
              className="form-check-input shadow-none"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
        </td> */}
        <td>#{job?._id?.slice(-4)}</td>
        <td>{job?.blogTitle}</td>
        <td>{job?.pendingOnDesk}</td>
        <td>{job?.status}</td>
        <td>{date}</td>
        <td>{job?.dateOfPublishing}</td>
        <td>{job?.createdBy?.name}</td>
        <td>
          <span
            className={`${
              job.priority === "medium"
                ? "blue_box"
                : job.priority === "high"
                ? "red_box"
                : "green_box"
            } px-2 py-1`}
          >
            {job.priority}
          </span>
        </td>
        <td>
          <Link className="view_link" to={`/view-job/${jobId}`}>
            View
          </Link>
        </td>
      </tr>
      //  <tr>
      //    <td>{job.id}</td>
      //    <td>{job.name}</td>
      //    <td>{job.email}</td>
      //    <td>{job.mobile}</td>
      //    <td>{job.role}</td>
      //    {/* ACTIVE BOX */}
      //    <td>
      //      <Link
      //        className={`${
      //          user.activeUser ? "green_box" : "red_box"
      //        } py-1 px-2 text-decoration-none`}
      //        to="/all-users"
      //      >
      //        {user.activeUser ? "Active" : "Inactive"}
      //      </Link>
      //    </td>
      //    <td>
      //      <Link to={`/edit-user/${userId}`}>View/Edit</Link>
      //    </td>

      //    {/* INACTIVE BOX */}
      //    {/* <td><span className="red_box py-1 px-2">{val.action}</span></td> */}
      //  </tr>
    );
  } else return null;

  return content;
};

export default Jobs;
