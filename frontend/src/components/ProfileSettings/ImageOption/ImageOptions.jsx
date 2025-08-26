/** Show ImageOption for the user to select profile picture */

function ImageOption({ src, alt, selected, onClick })
{
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer transition ${selected ? "border-4 border-blue-600" : "border-2 border-transparent hover:border-blue-400"} transition-all ease-in-out duration-300 rounded-full inline-block`}
        >
            <img
                src={src}
                alt={alt}
                className="w-16 object-cover rounded-full"
            />
        </div>
    );
}

export default ImageOption;