import {
  Box,
  Flex,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <Box bg="white" px={4} py={2} shadow="sm">
      <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          copyOS
        </Text>
        {user && (
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" name={user.email || undefined} src={user.user_metadata?.avatar_url} />
            </MenuButton>
            <MenuList>
              <Text px={3} py={2} color="gray.500">
                {user.email}
              </Text>
              <MenuItem onClick={signOut}>Sair</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
}
