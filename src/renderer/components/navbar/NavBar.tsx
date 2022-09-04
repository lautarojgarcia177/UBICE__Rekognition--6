import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton } from '@chakra-ui/react';
import { User } from 'react-feather';
import SettingsDrawer from '../settings-drawer/SettingsDrawer';

const NavBar = (props) => {
  return (
    <HStack justifyContent="end">
      <SettingsDrawer />
      {/* <IconButton aria-label="User" icon={<User />} /> */}
      {/* <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> */}
    </HStack>
  );
};

export default NavBar;
