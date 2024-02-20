import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="mb-3 flex items-center border-b bg-white p-1.5">
      <Image
        src="/Bart-logo.svg.png"
        width={82}
        height={50}
        alt="Picture of Bay Area Rapid Transit logo"
      />
      {/* Add button on small screensize to open the sidepanel */}
    </header>
  );
};

export default Header;
