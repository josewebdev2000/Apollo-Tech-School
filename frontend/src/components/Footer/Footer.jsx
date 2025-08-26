
function Footer()
{
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r bg-gray-900 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; <span id="current-year">{currentYear} Apollo-Tech School. All rights reserved.</span></p>
            </div>
        </footer>
    );
}

export default Footer;