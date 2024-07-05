import { Box, Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { useColorModeValue } from "@chakra-ui/react";
import {  Link, Link as RouterLink } from "react-router-dom";

export const SettingsPage = () => {
	const showToast = useShowToast();
	const logout = useLogout();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Text my={1} fontWeight={"bold"}>
				Freeze Your Account
			</Text>
			<Text my={1}>You can unfreeze your account anytime by logging in.</Text>
			<Button size={"sm"} bg={useColorModeValue("white", "rgba(0, 0, 120, 0.6)")} onClick={freezeAccount}
			>
				Freeze
			</Button>

			<Box>
				<Button  mt={2} >
					<Link to='/solutions'  >Want To Help Community ?</Link>
				</Button>
			</Box>
		</>
	);
};
