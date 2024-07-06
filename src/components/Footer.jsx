import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-300 shadow-xl">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <Link to={'/'} className="flex-shrink-0 text-3xl font-bold ">
            <span className='text-red-500'>Quadb </span> Tech
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-800">
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-800">
          © 2024{" "}
          <Link to={'/'} className="hover:underline">
            Ecommerce™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
