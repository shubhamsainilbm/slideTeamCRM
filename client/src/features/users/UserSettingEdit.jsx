import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextAreaField";
import { useUpdateOwnUserMutation } from "./usersApiSlice";
import { toast } from "react-toastify";

const UserSettingEdit = ({ user }) => {
  const [updateOwnUser, { isSuccess, isLoading, isError, error }] =
    useUpdateOwnUserMutation();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [file, setFile] = useState("images/user.svg");
  const [fileData, setFileData] = useState();
  console.log("usersdsds", user);
  const [userData, setUserData] = useState({
    id: user?._id,
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    password: "",
    facebook: user?.facebook,
    twitter: user?.twitter,
    linkedin: user?.linkedin,
    authorBio: user?.authorBio,
    address: user?.address,
    bankAccountNumber: user?.bankAccountNumber,
    ifseCode: user?.ifseCode,
    panNumber: user?.panNumber,
    image: user?.image,
  });

  // const buttonClickInActive = (e) => {
  //   const { value } = e.target;
  //   setInActive(value);
  // };
  // console.log("object", userData);
  console.log("asdadewdebgjolop", userData.image.name);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //   console.log("object", fileData);
  const showOpenFileDialog = () => {
    imageRef.current.click();
  };
  const handleImgChange = (event) => {
    const fileObject = event.target.files[0];
    if (!fileObject) return;
    setFile(URL.createObjectURL(event.target.files[0]));
    setUserData({ ...userData, image: fileObject });
  };
  console.log("sadasdasdsd", userData?.image);
  const formSubmitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //     console.log("sdasds", userData.name);
    formData.append("userImg", userData?.image);
    //     setUserData({ ...userData, image: formData });
    formData.append("name", userData?.name);
    formData.append("email", userData?.email);
    formData.append("mobile", userData?.mobile);
    formData.append("facebook", userData?.facebook);
    formData.append("linkedin", userData?.linkedin);
    formData.append("twitter", userData?.twitter);
    userData.password !== "" && formData.append("password", userData?.password);
    formData.append("authorBio", userData?.authorBio);
    formData.append("bankAccountNumber", userData?.bankAccountNumber);
    formData.append("ifseCode", userData?.ifseCode);
    formData.append("panNumber", userData?.panNumber);
    formData.append("address", userData?.address);
    //     console.log("DSfsdfs", formData);
    try {
      await updateOwnUser(formData);
    } catch (error) {
      console.log("dsdsd", error.status);
    }
  };
  // localStorage.setItem("userImage", user?.image);
  const [showPassword, setShowPassword] = useState(true);
  const showHidePassword = () => {
    setShowPassword((t) => !t);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Update SuccessFully");
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <DashboardLayout>
      <section className="all_user_sec rounded py-3">
        <div className="row">
          <div className="col-md-12">
            <div className="head">
              <div className="all__user_link px-3 d-flex flex-wrap gap-2 align-items-center">
                <Link to="/users-list" className="text-decoration-none">
                  Your Role
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 16 15"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.74522 14.6336C7.51448 14.399 7.38486 14.0808 7.38486 13.749C7.38486 13.4172 7.51448 13.0989 7.74522 12.8643L13.0291 7.49245L7.74522 2.1206C7.52102 1.8846 7.39696 1.56852 7.39977 1.24043C7.40257 0.912345 7.53201 0.598501 7.76022 0.3665C7.98842 0.134498 8.29712 0.00289945 8.61984 4.79922e-05C8.94255 -0.00280251 9.25345 0.123322 9.48559 0.351257L15.6396 6.60778C15.8704 6.84243 16 7.16065 16 7.49245C16 7.82425 15.8704 8.14246 15.6396 8.37712L9.48559 14.6336C9.25478 14.8682 8.94177 15 8.6154 15C8.28904 15 7.97603 14.8682 7.74522 14.6336ZM0.360362 14.6336C0.129621 14.399 -1.82699e-06 14.0808 -1.79798e-06 13.749C-1.76897e-06 13.4172 0.129621 13.0989 0.360362 12.8643L5.64423 7.49245L0.360363 2.1206C0.136161 1.8846 0.0121023 1.56852 0.0149071 1.24043C0.017711 0.912344 0.147155 0.598501 0.375357 0.366499C0.603559 0.134497 0.912262 0.0028988 1.23498 4.73466e-05C1.55769 -0.00280316 1.8686 0.123321 2.10073 0.351256L8.25478 6.60778C8.48552 6.84243 8.61514 7.16065 8.61514 7.49245C8.61514 7.82425 8.48552 8.14246 8.25478 8.37712L2.10073 14.6336C1.86992 14.8682 1.55691 15 1.23055 15C0.904179 15 0.591173 14.8682 0.360362 14.6336Z"
                    fill="black"
                  />
                </svg>
                <span>{user?.role}</span>
              </div>
              <hr className="mb-0" />
            </div>
          </div>

          <div className="col-md-12 col-lg-4 col-xl-4 cus_right_border">
            <div className="p-md-4 p-xl-5 p-0 mb-4 mb-md-0">
              <div className="user-profile text-center">
                <span
                  className="d-flex mx-auto mb-3 imgSpan"
                  onClick={showOpenFileDialog}
                >
                  <img
                    src={
                      userData.image.name
                        ? URL.createObjectURL(userData.image)
                        : user.image !== ""
                        ? userData.image
                        : file
                    }
                    alt="profile-img"
                    id="fileInput"
                  />
                </span>

                <p className="address_box">{user?.address}</p>

                <p>
                  Status:{" "}
                  <span className="green_box">
                    {user?.activeUser && "Active"}
                  </span>
                </p>
                <p>
                  {user.role === "author" && (
                    <span className="green_box">{`Your Score is: ${user?.defaultPayOut}`}</span>
                  )}
                </p>

                {/* <div className="mt-5">
                  <p>if you want to change user permissions</p>
                  <Link to={`/role-permissions/${user?._id}`}>Click here</Link>
                  <p
                    className="red_box mt-5"
                    style={{ cursor: "pointer" }}
                    onClick={handleDelete}
                  >
                    {isLoadingDelete ? "loading..." : "Force Delete User"}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-8 col-xl-8">
            <div className="p-md-4 p-3">
              <form
                onSubmit={formSubmitData}
                method="POST"
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  name="userImg"
                  ref={imageRef}
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImgChange}
                  hidden
                />
                <div className="row ">
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Name"}
                      type={"text"}
                      placeholder={"Enter user name"}
                      isRequired={true}
                      name={"name"}
                      value={userData?.name}
                      handleChange={handleChange}
                    />
                    {/* Name*/}
                  </div>

                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Email"}
                      type={"email"}
                      placeholder={"Enter user email"}
                      isRequired={true}
                      name={"email"}
                      value={userData?.email}
                      handleChange={handleChange}
                    />
                    {/* email*/}
                  </div>
                </div>
                {/* ============================================== */}
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                    <InputField
                      label={"Mobile (Number's Only)"}
                      type={"text"}
                      placeholder={"Enter user mobile"}
                      isRequired={true}
                      name={"mobile"}
                      value={userData?.mobile}
                      minlength={"10"}
                      maxlength={"10"}
                      pattern={"[0-9]*"}
                      handleChange={handleChange}
                    />
                    {/* mobile*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    {/* <InputField
                     label={"Role"}
                     type={"text"}
                     placeholder={"Enter user role"}
                     isRequired={true}
                     name={"role"}
                     value={userData?.role}
                     handleChange={handleChange}
                     disabled
                   /> */}
                    {/* <SelectField
                      label={"Role"}
                      value={userData.role}
                      mapsItem={rolesArrList}
                      isRequired={true}
                      handleChange={handleSelectChange}
                    /> */}
                    {/* role*/}
                  </div>
                </div>

                {/* ============================================== */}
                <div className="row ">
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Facebook"}
                      type={"text"}
                      placeholder={"Enter user facebook url"}
                      name={"facebook"}
                      value={userData?.facebook}
                      handleChange={handleChange}
                    />
                    {/* facebook*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Linkedin"}
                      type={"text"}
                      placeholder={"Enter user linkedin url"}
                      name={"linkedin"}
                      value={userData?.linkedin}
                      handleChange={handleChange}
                    />
                    {/* linkedin*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Twitter"}
                      type={"text"}
                      placeholder={"Enter user twitter url"}
                      name={"twitter"}
                      value={userData?.twitter}
                      handleChange={handleChange}
                    />
                    {/* twitter*/}
                  </div>

                  <div
                    className={`col-md-12 col-lg-6 col-xl-6`}
                    style={{ position: "relative" }}
                  >
                    <InputField
                      label={"Password"}
                      type={showPassword ? "password" : "text"}
                      placeholder={"Enter user password"}
                      name={"password"}
                      value={userData?.password}
                      handleChange={handleChange}
                    />
                    <img
                      src={
                        showPassword
                          ? "/images/icons/eye-regular.svg"
                          : "/images/icons/eye-slash-regular.svg"
                      }
                      alt="eye-slash-regular"
                      style={{
                        position: "absolute",
                        width: "18px",
                        right: "26px",
                        top: "50%",
                        zIndex: "11",
                      }}
                      onClick={showHidePassword}
                    />
                    {/* password*/}
                  </div>

                  <div className="col-md-12 col-lg-12 col-xl-12">
                    <TextAreaField
                      label={"User Bio"}
                      placeholder={"Enter user bio"}
                      rows={4}
                      name={"authorBio"}
                      value={userData?.authorBio}
                      handleChange={handleChange}
                    />
                    {/* userBio*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Bank Account No."}
                      type={"text"}
                      placeholder={"Enter user bank account"}
                      name={"bankAccountNumber"}
                      value={userData?.bankAccountNumber}
                      handleChange={handleChange}
                    />
                    {/* Bank Account No*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"IFSE Code"}
                      type={"text"}
                      placeholder={"Enter user IFSE Code"}
                      name={"ifseCode"}
                      value={userData?.ifseCode}
                      handleChange={handleChange}
                    />
                    {/* Bank IFSE Code*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"PAN No"}
                      type={"text"}
                      placeholder={"Enter user PAN No"}
                      name={"panNumber"}
                      value={userData?.panNumber}
                      handleChange={handleChange}
                    />
                    {/* PAN No*/}
                  </div>
                  <div className="col-md-12 col-lg-6 col-xl-6">
                    <InputField
                      label={"Address"}
                      type={"text"}
                      placeholder={"Enter user Address"}
                      name={"address"}
                      value={userData?.address}
                      handleChange={handleChange}
                    />
                    {/* Address*/}
                  </div>

                  <div className="col-md-12">
                    <div className="d-flex gap-3 py-3">
                      <button type="submit" className="btn_edit">
                        {isLoading ? (
                          <>
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </>
                        ) : (
                          "Update"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn_reset"
                        onClick={() => navigate("/users-list")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default UserSettingEdit;
