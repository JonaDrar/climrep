export const PlusIcon = () => {
  return (
    <>
      <div
        className="flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-red-500 via-purple-500 to-blue-500 rounded-full cursor-pointer
        transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
        >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};
