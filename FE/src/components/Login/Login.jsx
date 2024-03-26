import { Button, Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth-services/service';

function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userNameRef.current.value) {
      toast.error('User Name is required');
      return;
    }
    if (!passwordRef.current.value) {
      toast.error('Password is required');
      return;
    }

    const formData = {
      f_userName: userNameRef.current.value,
      f_pwd: passwordRef.current.value,
    };

    setIsLoading(true);
    try {
      const loginUser = await login(formData);
      if (loginUser.status === 200) {
        localStorage.setItem('isLogged', true);
        localStorage.setItem(
          'userDetails',
          JSON.stringify(loginUser.data.userDetails)
        );
        navigate('/home');
      } else {
        toast.error(loginUser.response.data.error);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <h4>Welcome Back!!</h4>
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
        <Button
          isLoading={isLoading}
          disableRipple
          variant="solid"
          color="primary"
          radius="sm"
          type="submit"
        >
          Login
        </Button>
        <div className="flex justify-between text-xs">
          <span>Do not have an account yet?</span>
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              navigate('/home/sign-up');
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </form>
  );
}

export default Login;
