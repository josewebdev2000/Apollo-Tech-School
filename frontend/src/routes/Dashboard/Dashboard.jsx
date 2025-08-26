/** Dashboard the authenticated user will see as soon as he/she logs in or registers */

import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard()
{
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // If no user is logged in, get back to home page
    useEffect(() => {
        if (user.id == null)
        {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex h-screen bg-slate-800 text-white">
            <Sidebar />

            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;