import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";
import AllUsers from "./pages/AllUsers";
import SearchPage from "./pages/SearchPage";
import Solutions from "./pages/Solutions";
function App() {
	const user = useRecoilValue(userAtom);
	const { pathname } = useLocation();
	return (
		<Box position={"relative"} w='full'>
			<Container  maxW={
        pathname === "/"
            ? { base: "620px", md: "1000px" }
            : pathname === "/allusers" || pathname === "/solutions"
            ? { base: "620px", md: "1000px" }
            : { base: "620px", md: "700px" }
    }>
				<Header />
				<Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

					<Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
					<Route  path='/allusers'  element={user ? <AllUsers/> : <Navigate  to={"/auth"} />}  />
					<Route  path='/search'  element={user ? <SearchPage/> : <Navigate  to={"/auth"} />}  />
					<Route  path='/solutions'  element={user ? <Solutions/> : <Navigate  to={"/auth"} />}  />
				</Routes>
			</Container>
		</Box>
	);
}

export default App;
