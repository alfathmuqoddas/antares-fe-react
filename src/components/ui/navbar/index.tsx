// src/components/SkeuoNavbar.jsx
import { useState } from "react";

// You might want to use icons for a more authentic VHS feel
// For example, from react-icons:
// import { FaPlay, FaPause, FaStop, FaEject, FaFastForward, FaRewind } from 'react-icons/fa';

const VhsButton = ({
  children,
  onClick,
  isActive,
  className = "",
}: {
  children: any;
  onClick: any;
  isActive: boolean;
  className: string;
}) => {
  // Base classes for the button
  const baseClasses = `
    px-4 py-2 m-1 rounded
    font-mono font-bold text-sm tracking-wider
    border-t-2 border-l-2 border-gray-500 
    border-b-2 border-r-2 border-gray-800
    bg-gray-700 text-gray-300
    shadow-[2px_2px_3px_rgba(0,0,0,0.5),inset_1px_1px_1px_rgba(255,255,255,0.1)]
    hover:bg-gray-600
    active:bg-gray-800
    active:border-t-2 active:border-l-2 active:border-gray-800
    active:border-b-2 active:border-r-2 active:border-gray-500
    active:shadow-[inset_2px_2px_3px_rgba(0,0,0,0.5)]
    active:translate-y-px active:translate-x-px
    transition-all duration-75 ease-in-out
    select-none cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
  `;

  // Classes for when the button is "active" (e.g., play is pressed)
  // This makes it look like it's latched down
  const activeClasses = `
    bg-gray-800 
    border-t-2 border-l-2 border-gray-800
    border-b-2 border-r-2 border-gray-500
    shadow-[inset_2px_2px_3px_rgba(0,0,0,0.5)]
    translate-y-px translate-x-px
    text-green-400
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : ""} ${className}`}
    >
      {children}
    </button>
  );
};

const SkeuoNavbar = () => {
  const [activeButton, setActiveButton] = useState<string | null>("STOP"); // e.g., 'PLAY', 'PAUSE', 'STOP'

  const handleButtonClick = (buttonName: string) => {
    console.log(`${buttonName} pressed`);
    // Basic logic: Stop usually cancels others. Play/Pause toggle.
    if (buttonName === "STOP") {
      setActiveButton("STOP");
    } else if (buttonName === "PLAY") {
      setActiveButton("PLAY");
    } else if (buttonName === "PAUSE") {
      setActiveButton("PAUSE");
    } else {
      // For other buttons like FF, REW, EJECT, they might not stay "latched"
      // Or you might want different logic
      setActiveButton(null); // Or some other state
    }
  };

  return (
    <nav
      className="
        bg-gradient-to-b from-gray-600 to-gray-800 
        p-3 sm:p-4
        rounded-lg 
        border-2 border-t-gray-500 border-l-gray-500 border-b-gray-900 border-r-gray-900
        shadow-[5px_5px_10px_rgba(0,0,0,0.5),inset_2px_2px_5px_rgba(255,255,255,0.1)]
        flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2
      "
      aria-label="VHS Controls"
    >
      {/* Optional: A "brand" or status indicator */}
      <div
        className="
          hidden sm:block
          bg-gray-900 text-green-400 font-mono text-xs
          px-3 py-1 rounded border border-black 
          shadow-[inset_1px_1px_2px_rgba(0,0,0,0.7)]
          mr-2 sm:mr-4
        "
      >
        VCR MODE
      </div>

      <VhsButton
        onClick={() => handleButtonClick("REW")}
        isActive={activeButton === "REW"}
        className="text-blue-400" // Example specific color
      >
        {/* <FaRewind className="inline mr-1"/>  */}
        REW
      </VhsButton>
      <VhsButton
        onClick={() => handleButtonClick("PLAY")}
        isActive={activeButton === "PLAY"}
        className={activeButton === "PLAY" ? "text-green-400" : "text-gray-300"}
      >
        {/* <FaPlay className="inline mr-1"/> */}
        PLAY
      </VhsButton>
      <VhsButton
        onClick={() => handleButtonClick("FF")}
        className="text-blue-400"
        isActive={activeButton === "FF"}
      >
        {/* <FaFastForward className="inline mr-1"/> */}
        FF
      </VhsButton>
      <VhsButton
        onClick={() => handleButtonClick("PAUSE")}
        isActive={activeButton === "PAUSE"}
        className={
          activeButton === "PAUSE" ? "text-yellow-400" : "text-gray-300"
        }
      >
        {/* <FaPause className="inline mr-1"/> */}
        PAUSE
      </VhsButton>
      <VhsButton
        onClick={() => handleButtonClick("STOP")}
        isActive={activeButton === "STOP"}
        className={activeButton === "STOP" ? "text-red-400" : "text-gray-300"}
      >
        {/* <FaStop className="inline mr-1"/> */}
        STOP
      </VhsButton>
      <VhsButton
        onClick={() => handleButtonClick("EJECT")}
        className="text-orange-400"
        isActive={activeButton === "EJECT"}
      >
        {/* <FaEject className="inline mr-1"/> */}
        EJECT
      </VhsButton>
    </nav>
  );
};

export default SkeuoNavbar;
