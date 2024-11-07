import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from '../services/auth.api.services';

const Login = () => {
  const [formData, setFormData] = useState({username: "",password: ""});
  const [errors, setErrors] = useState({username: "",password: "",});
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const usenavigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username) {
      usenavigate("/");
    }
  }, [usenavigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true); // Trigger validation when form is submitted
  
    setErrors({ username: "", password: "" });
  
    if (validate()) {
      const { username, password } = formData;
  
      loginUser(username, password)
        .then((resp) => {
          toast.success(resp.message); // success message from API
          sessionStorage.setItem("username", username);
          usenavigate("/"); // Redirect after successful login
        })
        .catch((err) => {
          toast.error("Login Failed: " + err.message); // Error message from API
        });
    }
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Please enter a username.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Please enter a password.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="card">
              <div className="card-header text-center">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                {/* Username Field */}
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-control ${validated && errors.username ? "is-invalid" : ""}`}
                    required
                  />
                  {validated && errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control ${validated && errors.password ? "is-invalid" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "🫣" : "👁️"}
                    </button>
                  </div>
                  {validated && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-primary me-2">
                  Login
                </button>
                <div className="vr h-100"></div>
                <Link className="btn btn-outline-dark ms-2" to="/register">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
