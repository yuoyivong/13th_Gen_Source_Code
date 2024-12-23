"use client";
import { removeBookAction } from "@/actions/bookAction";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export default function ButtonComponent({ action, book }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // function to open the modal
  const handleOpen = () => {
    if (action === "delete") {
      onOpen();
    }
  };

  // handle delete book method
  const handleDelete = async () => {
    console.log("Book id : ", book?.bookId);
    const deletedBook = await removeBookAction(book?.bookId);
    console.log("Response : ", deletedBook);
  };

  return (
    <>
      <Button
        className={`${
          action === "edit"
            ? "border-2 border-blue-600 text-blue-700"
            : action === "delete"
            ? "border-2 border-red-600 text-red-600"
            : "border-2 border-yellow-500 text-yellow-500"
        }  px-6 uppercase text-base bg-white `}
        onPress={handleOpen}
      >
        {action}
      </Button>

      {/* modal popup */}
      <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Book
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete{" "}
                  <span className="text-primary font-semibold">
                    {book?.title}
                  </span>{" "}
                  ?
                </p>
                <p className="text-red-600">
                  * The action cannot be rolled back.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  onPress={onClose}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
