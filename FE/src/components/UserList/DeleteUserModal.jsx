import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { deleteUser } from '../../services/user-services/service';
import { useState } from 'react';

function DeleteUserModal({
  isOpen,
  onOpen,
  onOpenChange,
  setShowDeleteUserModal,
  setShouldFetch,
  userDetails,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(userDetails);
  const handleDelete = () => {
    console.log(data);
    deleteUser(`email=${data?.f_email}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowDeleteUserModal(false);
          setShouldFetch((prev) => !prev),
            toast.success('Deleted Successfully');
          onOpenChange();
        }
        setIsLoading(false);
        onOpenChange;
      })
      .catch(() => {
        toast.error('Error deleting user');
        setIsLoading(false);
      });
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
        onClose={() => setShowDeleteUserModal(false)}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {() => (
            <>
              <ModalHeader className="flex justify-center bg-warning-500 text-background-200 py-2 text-sm font-normal">
                Are you sure you want to delete this record?
              </ModalHeader>
              <ModalBody className="text-red-500 text-sm text-center">
                Warning: This action can not be undone
              </ModalBody>
              <ModalFooter className="py-2 justify-between">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    setShowDeleteUserModal(false);
                    onOpenChange();
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="success"
                  variant="flat"
                  onPress={() => {
                    handleDelete();
                  }}
                  size="sm"
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

export default DeleteUserModal;
