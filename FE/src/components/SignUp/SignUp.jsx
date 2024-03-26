import { Button, Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { validatePassword } from '../../utils/validatePassword';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/auth-services/service';

function SignUp() {
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userNameRef.current.value) {
      toast.error('User Name is required');
      return;
    }
    if (
      !userEmailRef.current.value ||
      !emailRegex.test(userEmailRef.current.value)
    ) {
      toast.error('Valid User Email is required');
      return;
    }
    const passwordError = validatePassword(passwordRef.current.value);
    if (passwordError) {
      toast.error(passwordError, {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error('Passwords do not match');
      return;
    }

    const formData = {
      f_userName: userNameRef.current.value,
      f_email: userEmailRef.current.value,
      f_pwd: passwordRef.current.value,
    };

    const signUpUser = signUp(formData);
    setIsLoading(true);
    toast.promise(
      signUpUser,
      {
        loading: 'Signing Up...',
        success: () => {
          // Reload the page after a 3 seconds delay
          setTimeout(() => {
            setIsLoading(true);
            navigate('/home/login');
          }, 3000);

          return 'User Signed Up Successfully'; // Return the success message
        },
        error: () => {
          setIsLoading(true);

          return 'Error Updating Lead';
        },
      },
      {
        duration: 3000,
        position: 'bottom-right',
      }
    );
  };
  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      navigate('/home');
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-full bg-default-100 grid place-content-center"
    >
      <Toaster position="bottom-right" />
      <div className="flex flex-col gap-5 w-96 border px-2 py-4 rounded-lg shadow-lg">
        <h2 className="font-bold">Sign Up</h2>
        <Input
          ref={userNameRef}
          type="text"
          label="User Name"
          labelPlacement="outside"
          size="sm"
          radius="sm"
          placeholder="Enter your user name..."
          isRequired
          variant="bordered"
          color="default"
          autoComplete="user-email"
          autoFocus
          classNames={{
            input: 'placeholder:text-xs',
          }}
        />
        <Input
          ref={userEmailRef}
          type="email"
          label="User Email"
          labelPlacement="outside"
          size="sm"
          radius="sm"
          placeholder="Enter your email..."
          isRequired
          variant="bordered"
          color="default"
          autoComplete="user-email"
          classNames={{
            input: 'placeholder:text-xs',
          }}
        />
        <Input
          ref={passwordRef}
          type="password"
          label="Password"
          labelPlacement="outside"
          variant="bordered"
          size="sm"
          radius="sm"
          placeholder="Enter your password..."
          isRequired
          color="default"
          autoComplete="user-password"
          classNames={{
            input: 'placeholder:text-xs',
          }}
        />
        <Input
          ref={confirmPasswordRef}
          type="password"
          label="Confirm Password"
          labelPlacement="outside"
          variant="bordered"
          size="sm"
          radius="sm"
          placeholder="Re enter your password..."
          isRequired
          color="default"
          autoComplete="user-password"
          classNames={{
            input: 'placeholder:text-xs',
          }}
        />
        <Button
          isLoading={isLoading}
          disableRipple
          variant="solid"
          color="primary"
          radius="sm"
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
