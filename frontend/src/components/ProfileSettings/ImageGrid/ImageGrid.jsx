/** Grid that shows ImageOptions */
import { useState } from "react";
import ImageOption from "../ImageOption/ImageOptions";

function ImageGrid({ images, selectedImage, onSelect })
{
    // Index of Selected Image
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Handle when Image is Selected
    const handleSelect = (index) => {
        setSelectedIndex(index);
        onSelect(images[index]); // Notify Parent Component
    };

    // Return Grid
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-6 place-items-center justify-items-center gap-4">
            {
                images.map((img, i) => (
                    <ImageOption 
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        selected={selectedImage?.src === img.src}
                        onClick={() => handleSelect(i)}
                    />
                ))
            }
        </div>
    );
}

export default ImageGrid;