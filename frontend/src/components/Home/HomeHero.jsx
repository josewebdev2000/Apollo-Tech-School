/** Hero Component of the Home Page */
import { Link } from "react-router-dom";

function HomeHero({heroTypeClass, heroBgColor1, heroBgColor2, btnBgColor1, btnBgHoverColor, btnColor, title, content, btnText })
{
    return (
        <section className={`${heroTypeClass} bg-gradient-to-r ${heroBgColor1} ${heroBgColor2} text-white py-16`}>
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-lg mb-8">{content}</p>
                <Link to="/memberships" className={`btn-primary ${btnBgColor1} hover:${btnBgHoverColor} ${btnColor} py-2 px-4 rounded`}>
                    <span className="text-white">{btnText}</span>
                </Link>
            </div>
        </section>
    );
}

export default HomeHero;