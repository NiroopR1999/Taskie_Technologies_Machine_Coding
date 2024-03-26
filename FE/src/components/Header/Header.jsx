import Logo from '../../assets/taskie.png';
import { Link, useNavigate } from 'react-router-dom';
import { navigationProps } from '../props/navigationProps';
import { Button, Chip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      setUser(JSON.parse(localStorage.getItem('userDetails')));
    }
  }, []);
  return (
    <header className="flex items-center justify-between bg-default px-2 py-4">
      {/*Company  Logo */}
      <div>
        <img src={Logo} width={50} height={50} />
      </div>
      {/* Navigation */}
      <div className="flex gap-20">
        {navigationProps.map((item) => (
          <Chip
            key={item.name}
            variant="flat"
            color="primary"
            size="sm"
            className="rounded-md hover:bg-primary-200 hover:primary-500"
          >
            <Link to={item.route}>{item.name}</Link>
          </Chip>
        ))}
      </div>
      {/* User Details */}
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-1">
          <span className="font-bold">{user?.name}</span>
        </div>
        <Button
          variant="flat"
          color="danger"
          size="sm"
          onPress={() => {
            localStorage.removeItem('isLogged');
            localStorage.removeItem('userDetails');
            navigate('/home/login');
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
