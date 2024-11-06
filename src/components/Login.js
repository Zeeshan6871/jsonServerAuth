import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username) {
            usenavigate("/");
        }
    }, [usenavigate]);

    const SubmitLogin = (e) => {
        e.preventDefault();

        // Reset error messages before validation
        setUsernameError('');
        setPasswordError('');

        if (validate()) {
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter a valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Login Successful');
                        sessionStorage.setItem('username', username);
                        usenavigate('/');
                    } else {
                        toast.error('Invalid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to: ' + err.message);
            });
        }
    };

    const validate = () => {
        let isValid = true;

        // Validate username
        if (username === '') {
            setUsernameError('Please enter a username');
            isValid = false;
        }

        // Validate password
        if (password === '') {
            setPasswordError('Please enter a password');
            isValid = false;
        }

        return isValid;
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={SubmitLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => usernameupdate(e.target.value)}
                                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                />
                                {usernameError && (
                                    <div className="invalid-feedback">{usernameError}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => passwordupdate(e.target.value)}
                                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                />
                                {passwordError && (
                                    <div className="invalid-feedback">{passwordError}</div>
                                )}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary me-2">Login</button>
                            <div className="vr h-100"></div>
                            <Link className="btn btn-outline-dark ms-2" to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
