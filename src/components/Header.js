import React, { useEffect, useState } from 'react';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        const newTheme = !isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-mode', newTheme === 'dark');
    };

    return (
        <header>
            <h1>My Application</h1>
            <button onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
};

export default Header;