/** Collapsable Card that shows a module for a course */

function CourseDetailsSyllabusModule({ collapseId, moduleTitle, moduleDescription })
{
    return (
        <div className="collapse collapse-arrow">
            <input type="checkbox" className="collapse-input" id={collapseId} />
            <div className="collapse-title text-xl text-white py-4 px-6 cursor-pointer">
                {moduleTitle}
            </div>
            <div className="collapse-content bg-gray-700 text-gray-300 py-4 px-6">
                <p>{moduleDescription}</p>
            </div>
        </div>
    ); 
}

export default CourseDetailsSyllabusModule;