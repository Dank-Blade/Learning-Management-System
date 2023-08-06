import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";

export default function ModuleNavbar(props) {
  const params = useParams();
  const id = params.id;

  const nav = useNavigate();
  const toast = useToast();


  const [links, setLinks] = useState([]);

  useEffect(() => {
    jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).user_type ===
    "Student"
      ? setLinks([
          {
            name: "Content",
            href: `/module/${id}/content/`,
          },
          {
            name: "Assignments",
            href: `/module/${id}/assignment/`,
          },
        ])
      : setLinks([
          {
            name: "Content",
            href: `/teacher/module/${id}/content/`,
          },
          {
            name: "Assignments",
            href: `/teacher/module/${id}/assignment/`,
          },
        ]);
  }, [id]);

  const color = useColorModeValue("gray.600", "gray.300");

  const logOutHandler = () => {
    localStorage.removeItem("tokens");
    nav("/login/");
    toast({
      title: "Logged out.",
      description: "Logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const { isOpen } = useDisclosure();

  return (
    <>
      <Box px={4} borderBottom={"1px"} borderColor={"gray.200"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <IconButton
              onClick={props.onOpen}
              size={"md"}
              icon={<HamburgerIcon />}
              aria-label={"Open Menu"}
            />
          </Flex>

          <Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => (
                <NavLink to={link.href} key={link.name}>
                  <NavItem>{link.name}</NavItem>
                </NavLink>
              ))}
            </HStack>
          </Flex>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://www.freepik.com/free-icon/user_14708064.htm#query=default%20user&position=33&from_view=keyword&track=ais"
                    // "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    nav("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={() => nav("/change-password")}>
                  Change Password
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
