import React from "react";
import { BsWindowDock } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { TiGroupOutline } from "react-icons/ti";

import AtomListElement from "../atoms/ListElement";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-sidebarblue pt-6 lg:block lg:w-64">
      <div className="h-full">
        <ul>
          <AtomListElement Icon={FiHome} route="/" text="Home" />
          <AtomListElement
            Icon={BsWindowDock}
            route="/reimbursement_requests"
            text="Requests"
          />
          <AtomListElement
            Icon={TiGroupOutline}
            route="/management"
            text="Management"
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
