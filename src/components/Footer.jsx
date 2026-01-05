const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-headerGray border-t border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xl font-bold mb-3">TypingGym</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Where typing meets training, and your words become workouts. 
                            Improve your typing speed and accuracy with custom prompts and engaging challenges.
                        </p>
                    </div>

                    {/* Contact & Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Contact</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:alecnhance@gmail.com" className="text-gray-400 hover:text-navOrange text-sm transition-colors duration-200">
                                    alecnhance@gmail.com
                                </a>
                            </li>
                            <li className="pt-2">
                                <a href="https://github.com/alecnhance/TypingGymV2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-navOrange text-sm transition-colors duration-200">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} TypingGym. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a 
                            href="https://github.com/alecnhance/TypingGymV2" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-navOrange text-sm transition-colors duration-200"
                        >
                            Open Source
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;