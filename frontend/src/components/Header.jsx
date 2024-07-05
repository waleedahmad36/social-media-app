import { Button, Flex, Image,  useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link, Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import {  BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { MdPersonSearch } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom);
	const logout = useLogout();
	const setAuthScreen = useSetRecoilState(authScreenAtom);

	return (
		<Flex justifyContent={"space-between"} mt={6} mb='12'  >
			{user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} />
				</Link>
			)}
			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
					Login
				</Link>
			)}

			{/* <Image
				
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				
			/> */}

			<Flex gap={3}    alignItems={'center'}  >
				<Button size={"xs"} p={4}   onClick={toggleColorMode} >
			{colorMode === 'dark' ? <BsFillSunFill fontSize={'20px'} fontWeight={'bold'}  cursor={"pointer"}  /> : <BsFillMoonFill  cursor={"pointer"} fontSize={'20px'} fontWeight={'bold'}   />  }
			</Button>

			<Link  to={`/allusers`}  >
			<MdPersonSearch   size={20}    />
			</Link>

			<Link  to={'/search'}  >
				<Button  size={"xs"}  p={4} >
				< FiSearch  size={20} />
				</Button>
			</Link>

			
			</Flex>

			

			

			{user && (
				<Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/${user.username}`}>
						<MdOutlineDashboardCustomize  size={24} />
					</Link>
					<Link as={RouterLink} to={`/chat`}>
						<HiOutlineChatAlt2  size={20} />
					</Link>
					<Link as={RouterLink} to={`/settings`}>
						<MdOutlineSettings size={20} />
					</Link>
					<Button size={"xs"} onClick={logout}>
						<FiLogOut size={20} />
					</Button>
				</Flex>
			)}

			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
					Sign up
				</Link>
			)}
		</Flex>
	);
};

export default Header;
