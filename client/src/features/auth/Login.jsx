import { useNavigate, Link } from "react-router-dom";
import loginImg from "/images/login/login.svg";
import logoImg from "/images/logo.png";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import usePersist from "../../hooks/usePersist";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;

      const { accessToken } = await login({ email, password }).unwrap();

      dispatch(setCredentials({ accessToken }));
      if (accessToken) {
        toast.success("Login Successfully!");
      }
      setUser({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      if (!error.status) {
        toast.error("No response from server ");
      } else if (error.status === 400) {
        toast.error(error?.data?.message);
      } else if (error.status === 401) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.message);
      }
    }
  };
  const handleToggle = () => setPersist((prev) => !prev);

  const showHidePassword = () => {
    setShowPassword((t) => !t);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.error);
    }
  }, [isError]);

  return (
    <>
      <div className="login__page">
        <div className="login__container">
          <div className="login__box">
            <div className="img__box">
              <img src={loginImg} />
            </div>
          </div>
          <div className="login__box">
            <div className="login__form_box">
              <img src={logoImg} />
              <h6 className="form__title">Welcome Back</h6>
              <form onSubmit={handleSubmit} className="from__container">
                <div className="input__box ">
                  <label>Email</label>
                  <div className="input-group">
                    <input
                      type="email"
                      onChange={handleChange}
                      name={"email"}
                      value={user.email}
                      className="form-control shadow-none"
                    />
                  </div>
                </div>
                <div className="input__box ">
                  <label>Password</label>
                  <div className="input-group" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "password" : "text"}
                      onChange={handleChange}
                      name={"password"}
                      value={user.password}
                      className="form-control shadow-none"
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
                        width: "20px",
                        right: "18px",
                        top: "34%",
                        zIndex: "11",
                      }}
                      onClick={showHidePassword}
                    />
                  </div>
                </div>
                <div className="forgot__box">
                  <div className="check__box" style={{ display: "none" }}>
                    <input
                      type="checkbox"
                      onChange={handleToggle}
                      // checked={persist}
                      id="persist"
                      // required
                    />
                    <label htmlFor="persist">Keep me logged in</label>
                  </div>
                  <Link to={"/"}>Forgot your Password?</Link>
                </div>
                <button type="submit" className="btn_create">
                  {isLoading ? (
                    <>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
