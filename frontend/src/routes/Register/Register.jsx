/** React Component for Register Page */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import baseClient from "../../api/baseClient";
import { UserContext } from "../../context/UserContext";

function Register()
{
    // Prepare register data form
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Error in case it arrives
    const [error, setError] = useState(null);

    // Navigation to other link
    const navigate = useNavigate();

    // Change application user
    const { setUser } = useContext(UserContext);

    // Handle register form data change
    const handleChange = e => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    // Handle register form submission
    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        if (registerData.password !== registerData.confirmPassword)
        {
            setError("Passwords do not match");
            return;
        }

        try
        {
            const { data } = await baseClient.post("/user/register", {
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                password: registerData.password
            });

            setUser(data);

            navigate("/dashboard/mylearning");
        }

        catch (err)
        {
            console.error("Registration Failed");
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <section className="register py-20 bg-gradient-to-r from-blue-800 to-indigo-700">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold mb-8 text-center text-white">Create a New Account</h2>
                <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                        <div className="mb-4">
                            <label htmlFor="first-name" className="block text-lg font-medium">First Name</label>
                            <input type="text" name="firstName" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={registerData.firstName} onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="last-name" className="block text-lg font-medium">Last Name</label>
                            <input type="text" name="lastName" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={registerData.lastName} onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
                            <input type="email" name="email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={registerData.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" name="password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={registerData.password} onChange={handleChange} required/>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirm-password" className="block text-lg font-medium">Confirm Password</label>
                            <input type="password" name="confirmPassword" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" value={registerData.confirmPassword} onChange={handleChange} required />
                        </div>

                        <div className="mb-4 text-center">
                            <p className="text-lg">Already have an account? <Link to={"/login"} className="text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-600">Login here</Link></p>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;