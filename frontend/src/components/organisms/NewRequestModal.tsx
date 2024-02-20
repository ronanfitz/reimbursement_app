import React from "react";
import { FormData } from "@/app/reimbursement_requests/columns";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import AtomButton from "../atoms/Button";

interface NewRequestModalProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
}

const NewRequestModal: React.FC<NewRequestModalProps> = ({
  setFormData,
  onSubmit,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <AtomButton className="mb-5" onPress={onOpen}>
        Submit new request
      </AtomButton>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Request
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="reason"
                  label="Reason"
                  placeholder="Enter the reason"
                  variant="underlined"
                  labelPlacement="outside-left"
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="amount"
                  label="Amount"
                  placeholder="0.00"
                  variant="underlined"
                  labelPlacement="outside-left"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  onChange={handleInputChange}
                />
                <Input
                  name="transaction_date"
                  label="Transaction Date"
                  placeholder="Enter the transaction date"
                  variant="underlined"
                  labelPlacement="outside-left"
                  onChange={handleInputChange}
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
                    onSubmit();
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

export default NewRequestModal;
