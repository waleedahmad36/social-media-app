import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Spinner,
  Text,
  Avatar,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: searchQuery }),
      });
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Error searching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputBorderColor = useColorModeValue("gray.400", "gray.600");

  return (
    <Container maxW="xl" centerContent>
      <Box mt={8} textAlign="center" w="100%">
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          Search Users
        </Text>
        <Flex mb={4} w="100%">
          <Input
            type="text"
            placeholder="Enter name to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            flex="1"
            mr={2}
            borderColor={inputBorderColor}
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            colorScheme="blue"
            size="lg"
          >
            Search
          </Button>
        </Flex>

        {loading && (
          <Center mt={8}>
            <Spinner size="xl" />
          </Center>
        )}

        {searchResult.length > 0 ? (
          <Box mt={8} w="100%">
            {searchResult.map((user) => (
              <Box
                key={user._id}
                bg={useColorModeValue("gray.100", "gray.800")}
                p={6}
                mb={6}
                rounded="md"
                boxShadow="md"
                w="100%"
                cursor={"pointer"}
              >
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Flex alignItems="center">
                    <Box mr={4}>
                      {user.profilePic ? (
                        <Avatar src={user.profilePic} alt={user.name} size="lg" />
                      ) : (
                        <Avatar name={user.name} size="lg" />
                      )}
                    </Box>
                    <Box textAlign={"justify"}>
                      <Text fontSize="2xl" fontWeight="bold">
                        {user.name}
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        {user.username}
                      </Text>
                      {user.bio && (
                        <Text fontSize="sm" color="gray.500">
                          {user.bio}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                  <Box>
                    <Badge colorScheme={'cyan'} mr={2} p={2} borderRadius={"md"}>
                      Followers: {user.followers.length}
                    </Badge>
                    <Badge colorScheme="white" p={2} borderRadius={"md"}>
                      Following: {user.following.length}
                    </Badge>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          !loading && (
            <Text fontSize="xl" fontWeight="bold" mt={8}>
              No users found.
            </Text>
          )
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;
