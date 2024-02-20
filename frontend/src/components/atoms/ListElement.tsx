import React from "react";
import Link from "next/link";

type AtomListElementProps = {
  Icon: React.ComponentType;
  route: string;
  text: string;
};

const AtomListElement = ({ Icon, route, text }: AtomListElementProps) => {
  return (
    <li className="hover:bg-sidebarhoverblue flex h-8 w-full py-6">
      <Link
        href={route}
        className="flex w-full self-center pl-10 text-base font-semibold"
      >
        <div className="mr-2 flex self-center">
          <Icon />
        </div>
        {text}
      </Link>
    </li>
  );
};

export default AtomListElement;
