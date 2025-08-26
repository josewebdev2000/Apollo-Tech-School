/** React Component to represent Login Page */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import baseClient from "../../api/baseClient";

function Login()
{
    // Prepare login data form
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // Error in case it arrives
    const [error, setError] = useState(null);

    // Change application user
    const { setUser } = useContext(UserContext);

    // Handle login form data change
    const handleChange = e => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    // Handle login form submission
    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        try
        {
            const { data } = await baseClient.post("/user/login", {
                email: loginData.email,
                password: loginData.password
            });

            setUser(data);

            navigate("/dashboard/mylearning");
        }

        catch (err)
        {
            console.error("Login Failed");
            console.error(err);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <section className="login py-28 bg-gradient-to-r from-blue-800 to-indigo-700">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold mb-8 text-center text-white">Log in to your account</h2>
                <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
                            <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={loginData.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" name="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={loginData.password} onChange={handleChange} required/>
                        </div>

                        <div className="text-center mt-2 mb-2">
                            <p className="text-lg m-1">
                                Need an account? <Link to={"/register"} className="text-blue-600 hover:underline">Register Here</Link>
                            </p>
                            <p className="text-lg m-1">
                                Forgot your password? <Link to={"/forgot-password"} className="text-blue-600 hover:underline">Go here</Link>
                            </p>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;