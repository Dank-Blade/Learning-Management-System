import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import React from "react";
import { NavLink } from "react-router-dom";

const DrawerModule = (props) => {
  const user_type = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).user_type;
  
  const home_href = user_type === "Student" ? "/" : "/teacher";
  const grade = user_type === "Student" ? "/grade" : "/teacher/grade";

  const linkItems = [
    { name: "Home", href: home_href },
    { name: "Grade", href: grade },
  ];

  const color = useColorModeValue("gray.600", "gray.300");

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

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          Educanva
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {linkItems.map((link) => (
          <NavLink to={link.href} key={link.name}>
            <NavItem>{link.name}</NavItem>
          </NavLink>
        ))}

        {/* <NavItem onClick={integrations.onToggle}>
          Integrations
          <Icon
            a
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem> */}
        {/* <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        <NavItem>Changelog</NavItem> */}
        {/* <NavItem>Settings</NavItem> */}
      </Flex>
    </Box>
  );

  return (
    <Drawer placement={"left"} onClose={props.onClose} isOpen={props.isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody>
          <SidebarContent w="full" borderRight="none" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerModule;
