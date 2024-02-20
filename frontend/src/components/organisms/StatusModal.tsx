import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import AtomDropdown from "../atoms/Dropdown";

interface StatusModalProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  description?: string;
  submit: (status: string) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onOpenChange,
  description,
  submit,
}) => {
  // Move to constants file
  const values = [
    {
      id: 1,
      value: "Pending",
    },
    {
      id: 2,
      value: "Approved",
    },
    {
      id: 3,
      value: "Denied",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    const selectData = values.find((value) => value.id === index);
    const selectValue = selectData ? selectData?.value : "";
    setSelectedStatus(selectValue);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {description}
              </ModalHeader>
              <ModalBody>
                <AtomDropdown
                  className="max-w mb-5"
                  label="Status"
                  items={values}
                  onSelectionChange={onSelectionChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth={true}
                  color="primary"
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth={true}
                  color="primary"
                  onPress={() => {
                    const newStatus = selectedStatus ? selectedStatus : "";
                    submit(newStatus);
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StatusModal;
