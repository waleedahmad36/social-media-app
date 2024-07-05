import { Avatar, Box, Text, Flex, Spinner, VStack, Button, useColorMode, AvatarBadge } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const MotionText = motion(Text);// Wrap Box component with motion

const AllUsers = () => {
    const { colorMode } = useColorMode();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { socket, onlineUsers } = useSocket();
    console.log(onlineUsers)
     

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users/allusers'); // Adjust the endpoint as per your API
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    

    return (
        <Box 
        padding={8} 
        backgroundColor="rgba(26, 32, 44, 0.2)" 
        minHeight="100vh" 
        borderRadius={'md'}
    >
                        <MotionText 
            as="h1" 
            fontSize="4xl" 
            fontWeight="bold" 
            color={colorMode === 'light' ? "gray.800" : "white"} 
            marginBottom={8}
            initial={{ opacity: 0, y: -20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation state when component mounts
            transition={{ delay: 0.5, duration: 1.5 }} // Animation duration with a 2-second delay
        >
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                >
                    C
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.1, duration: 0.5 }} // Animation duration
                >
                    o
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.2, duration: 0.5 }} // Animation duration
                >
                    m
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.3, duration: 0.5 }} // Animation duration
                >
                    m
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.4, duration: 0.5 }} // Animation duration
                >
                    u
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.5, duration: 0.5 }} // Animation duration
                >
                    n
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.6, duration: 0.5 }} // Animation duration
                >
                    i
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.7, duration: 0.5 }} // Animation duration
                >
                    t
                </motion.span>
                <motion.span
                    whileHover={{ color: colorMode === 'light' ? "teal.500" : "teal.200" }} // Color change on hover
                    initial={{ opacity: 0, x: -20 }} // Initial animation state
                    animate={{ opacity: 1, x: 0 }} // Animation state when component mounts
                    transition={{ delay: 0.8, duration: 0.5 }} // Animation duration
                >
                    y
                </motion.span>
            </MotionText>
            <Flex wrap="wrap" justify="center">
                {loading ? (
                    <Flex justify="center" align="center" height="100vh">
                        <Spinner size="xl" />
                    </Flex>
                ) : error ? (
                    <Flex justify="center" align="center" height="100vh">
                        <Text fontSize="xl" color="red.500">{error}</Text>
                    </Flex>
                ) : (
                    users.map(user => (
                        <Box
                            key={user._id}
                            className="user-card"
                            padding={6}
                            background="rgba(255, 255, 255, 0.1)"
                            borderRadius="lg"
                            boxShadow="lg"
                            width="250px"
                            margin={4}
                            backdropFilter="blur(10px)"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }}
                        >
                            <VStack spacing={4}>
                                {user.profilePic ? (
                                    <Avatar src={user.profilePic} size="xl"  position={'relative'}  >
                                        {onlineUsers.includes(user._id) && <div className='online-dot' ></div>}
                                    </Avatar>
                                ) : (
                                    <Avatar size="xl"    name={user.name}  position={'relative'} >
                                        {onlineUsers.includes(user._id) && <div className='online-dot' ></div>}
                                    </Avatar>
                                )   
                                }
                                <Text fontSize="lg" fontWeight="bold" color={colorMode === 'light' ? "gray.700" : "white"}>{user.name}</Text>
                                <Text fontSize="md" color={colorMode === 'light' ? "gray.600" : "gray.300"}>@{user.username}</Text>
                                <Text fontSize="sm" textAlign="center" color={colorMode === 'light' ? "gray.600" : "gray.300"}>{user.bio}</Text>
                                <Button colorScheme="teal" variant="outline">{user.followers.length} {"->"} </Button>
                            </VStack>
                        </Box>
                    ))
                )}
            </Flex>
        </Box>
    );
};

export default AllUsers;
