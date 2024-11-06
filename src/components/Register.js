import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("male");
    
    const [validated, setValidated] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username) {
            navigate("/");
        }
    }, [navigate]);

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        
        if (id === "" || id === null) {
            isproceed = false;
        }
        if (name === "" || name === null) {
            isproceed = false;
        }
        if (password === "" || password === null) {
            isproceed = false;
        }
        if (email === "" || email === null) {
            isproceed = false;
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            // Validate Email format
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isproceed = false;
                toast.warning('Please enter a valid email');
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email, phone, country, address, gender };
        
        // Set validated to true when form is submitted to trigger validation
        setValidated(true);

        if (IsValidate()) {
            fetch("http://localhost:8000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.');
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <div>
            <div className="offset-lg-3 col-lg-6 mt-5">
                <form className="container needs-validation" onSubmit={handlesubmit} noValidate>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* Username */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input
                                            value={id}
                                            onChange={e => idchange(e.target.value)}
                                            className={`form-control ${validated && !id ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        <div className="invalid-feedback">Username is required.</div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input
                                            value={password}
                                            onChange={e => passwordchange(e.target.value)}
                                            type="password"
                                            className={`form-control ${validated && !password ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        <div className="invalid-feedback">Password is required.</div>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input
                                            value={name}
                                            onChange={e => namechange(e.target.value)}
                                            className={`form-control ${validated && !name ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        <div className="invalid-feedback">Full name is required.</div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input
                                            value={email}
                                            onChange={e => emailchange(e.target.value)}
                                            className={`form-control ${validated && !email ? 'is-invalid' : ''}`}
                                            required
                                            type="email"
                                        />
                                        <div className="invalid-feedback">Please enter a valid email.</div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            value={phone}
                                            onChange={e => phonechange(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Country */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country <span className="errmsg">*</span></label>
                                        <select
                                            value={country}
                                            onChange={e => countrychange(e.target.value)}
                                            className="form-control"
                                            required
                                        >
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                        <div className="invalid-feedback">Country selection is required.</div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            value={address}
                                            onChange={e => addresschange(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br />
                                        <input
                                            type="radio"
                                            checked={gender === 'male'}
                                            onChange={e => genderchange(e.target.value)}
                                            name="gender"
                                            value="male"
                                            className="app-check"
                                        />
                                        <label>Male</label>
                                        <input
                                            type="radio"
                                            checked={gender === 'female'}
                                            onChange={e => genderchange(e.target.value)}
                                            name="gender"
                                            value="female"
                                            className="app-check"
                                        />
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                        <Link to={'/login'} className="btn btn-sm btn-outline-info">
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
