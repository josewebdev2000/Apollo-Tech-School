/** Features Card for the About Page */

function AboutFeaturedCard({title, content})
{
    return (
        <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default AboutFeaturedCard;