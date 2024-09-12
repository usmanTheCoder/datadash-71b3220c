'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold">
              DataDash
            </Link>
            <p className="mt-2">Visualize your data, transform your insights.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-4">
              <li>
                <a
                  href="https://github.com/your-username/datadash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FaLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DataDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;