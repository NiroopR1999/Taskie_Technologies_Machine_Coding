import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
  SelectItem,
  Select,
  Textarea,
} from '@nextui-org/react';
import { Add } from '@mui/icons-material';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { createUser } from '../../services/user-services/service';
const designationList = [
  { name: 'Developer' },
  { name: 'Manager' },
  { name: 'Lead' },
  { name: 'HR' },
];
const departMenList = [
  { name: 'Tech' },
  { name: 'Sales' },
  { name: 'Marketing' },
];
function CreateUserModal({ setShouldFetch }) {
  // Modal State
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  //   User Details
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const [role, setRole] = useState(null);
  const [dob, setDob] = useState(null);
  const [doj, setDoj] = useState(null);
  const [department, setDepartment] = useState(null);
  const [description, setDescription] = useState(null);

  function handleSubmit() {
    // Validation
    if (!nameRef.current.value) {
      toast.error('Name is required');
      return;
    }

    if (!emailRef.current.value) {
      toast.error('Email is required');
      return;
    }

    if (!mobileRef.current.value) {
      toast.error('Mobile number is required');
      return;
    }

    if (!role) {
      toast.error('Designation is required');
      return;
    }

    if (!dob) {
      toast.error('Date of Birth is required');
      return;
    }

    if (!doj) {
      toast.error('Date of Joining is required');
      return;
    }

    if (!department) {
      toast.error('Department is required');
      return;
    }

    if (!description) {
      toast.error('Description is required');
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailRef.current.value)) {
      toast.error('Invalid email format');
      return;
    }

    // Mobile number validation
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileRef.current.value)) {
      toast.error('Invalid mobile number format');
      return;
    }

    const userData = {
      f_name: nameRef.current.value,
      f_email: emailRef.current.value,
      f_mobile: mobileRef.current.value,
      f_role: role,
      f_dob: dob,
      f_doj: doj,
      f_department: department,
      f_description: description,
    };
    setIsLoading(true);

    createUser(userData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success('User Created Successfully');
          setShouldFetch((prev) => !prev);
          onOpenChange();
        } else if (res.response.status === 400) {
          toast.error(res.response.data.error);
        }
        setIsLoading(false);
        onOpenChange;
      })
      .catch(() => {
        toast.error('Error creating user');
        setIsLoading(false);
      });
  }

  return (
    <>
      <Tooltip content="Create User" color="success" size="sm">
        <Button
          onPress={onOpen}
          color="success"
          variant="flat"
          size="sm"
          startContent={<Add />}
        >
          Create User
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create User</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2 flex-wrap" id="lead-form">
                  {/* First Name */}

                  <Input
                    isDisabled={isLoading}
                    size="sm"
                    radius="sm"
                    isRequired
                    label={'Name'}
                    labelPlacement="outside"
                    placeholder="Enter Your Name"
                    variant="bordered"
                    classNames={{
                      label: 'text-xs',
                      input: 'text-xs placeholder:text-xs',
                    }}
                    ref={nameRef}
                    type="text"
                  />

                  {/* Email */}
                  <Input
                    isDisabled={isLoading}
                    size="sm"
                    radius="sm"
                    isRequired
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter Your Email"
                    variant="bordered"
                    classNames={{
                      label: 'text-xs',
                      input: 'text-xs placeholder:text-xs',
                    }}
                    ref={emailRef}
                    type="email"
                  />
                  {/* Phone*/}
                  <Input
                    isDisabled={isLoading}
                    size="sm"
                    radius="sm"
                    isRequired
                    label={'Phone'}
                    labelPlacement="outside"
                    placeholder="Enter Your Mobile Number"
                    variant="bordered"
                    classNames={{
                      label: 'text-xs',
                      input: 'text-xs placeholder:text-xs',
                    }}
                    ref={mobileRef}
                    type="tel"
                    pattern="[0-9]{10}"
                  />
                  {/* Date of Birth */}
                  <div>
                    <span className="text-xs after:content-['*'] after:text-danger after:ml-1">
                      Date of Birth
                    </span>
                    <Input
                      isDisabled={isLoading}
                      size="sm"
                      radius="sm"
                      isRequired
                      aria-label="dob"
                      variant="bordered"
                      classNames={{
                        label: 'text-xs',
                        input: 'text-xs placeholder:text-xs max-h-8',
                        inputWrapper: 'p-0 pl-1 min-h-unit-8 h-8',
                      }}
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                      type="date"
                    />
                  </div>
                  {/* Date of Joining */}
                  <div>
                    <span className="text-xs after:content-['*'] after:text-danger after:ml-1">
                      Date of Joining
                    </span>
                    <Input
                      isDisabled={isLoading}
                      size="sm"
                      radius="sm"
                      isRequired
                      aria-label="dob"
                      variant="bordered"
                      classNames={{
                        label: 'text-xs',
                        input: 'text-xs placeholder:text-xs max-h-8',
                        inputWrapper: 'p-0 pl-1 min-h-unit-8 h-8',
                      }}
                      onChange={(e) => {
                        setDoj(e.target.value);
                      }}
                      type="date"
                    />
                  </div>
                  {/* Role */}
                  <Select
                    isDisabled={isLoading}
                    isRequired
                    label="Role"
                    labelPlacement="outside"
                    aria-label="role"
                    placeholder="Select Role"
                    selectionMode="single"
                    size="md"
                    radius="sm"
                    variant="bordered"
                    classNames={{
                      mainWrapper: 'h-5 min-h-unit-8',
                      trigger: 'h-5 min-h-unit-8  py-0 ',
                      value: 'text-xs',
                      label: 'text-xs', //w-64
                      base: 'flex items-center ',
                    }}
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setRole(null);
                        return;
                      }
                      setRole(e.target.value);
                    }}
                  >
                    {designationList.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* Department */}
                  <Select
                    isDisabled={isLoading}
                    isRequired
                    label="Department"
                    labelPlacement="outside"
                    aria-label="role"
                    placeholder="Select Department"
                    selectionMode="single"
                    size="md"
                    radius="sm"
                    variant="bordered"
                    classNames={{
                      mainWrapper: 'h-5 min-h-unit-8',
                      trigger: 'h-5 min-h-unit-8  py-0 ',
                      value: 'text-xs',
                      label: 'text-xs', //w-64
                      base: 'flex items-center ',
                    }}
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setDepartment(null);
                        return;
                      }
                      setDepartment(e.target.value);
                    }}
                  >
                    {departMenList.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Textarea
                    isRequired
                    variant="bordered"
                    label="Description"
                    labelPlacement="outside"
                    maxRows={3}
                    classNames={{
                      label: 'text-xs',
                      input: 'text-xs',
                      base: 'w-full',
                    }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </form>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="success"
                  variant="flat"
                  onPress={handleSubmit}
                  size="sm"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateUserModal;
