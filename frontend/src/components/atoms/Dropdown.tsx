import React, { ChangeEvent } from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface ValueProps {
  id: number;
  value: string;
}

interface DropdownProps {
  containerClass?: string;
  className?: string;
  label: string;
  items: ValueProps[];
  onSelectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const AtomDropdown: React.FC<DropdownProps> = ({
  containerClass,
  className,
  label,
  items,
  onSelectionChange,
}) => {
  return (
    <div className={containerClass}>
      <Select
        variant="bordered"
        label={label}
        placeholder={"Select a " + label}
        className={className}
        labelPlacement="outside"
        items={items}
        onChange={onSelectionChange}
      >
        {(item) => (
          <SelectItem key={item.id} value={item.value}>
            {item.value}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default AtomDropdown;
