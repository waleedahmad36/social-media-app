import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Avatar } from "@chakra-ui/react";
import SoultionModel from "../components/SoultionModel";
import useShowToast from "../hooks/useShowToast";

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solutionImage, setSolutionImage] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch("/api/solutions");
        if (!response.ok) {
          throw new Error("Failed to fetch solutions");
        }
        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSolution = async () => {
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    const newSolution = {
      title,
      description,
      tags,
      imageUrl: solutionImage,
    };

    try {
      const response = await fetch("/api/solutions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSolution),
      });

      if (!response.ok) {
        throw new Error("Failed to create solution");
      }

      const savedSolution = await response.json();
      setSolutions([...solutions, savedSolution]);
      handleCloseModal();
      showToast("Success", "Solution deleted ✅", "success");
    } catch (error) {
      console.error("Failed to create solution:", error);
    }
  };

  const handleDeleteSolution = async (solutionId) => {
    try {
      const response = await fetch(`/api/solutions/${solutionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete solution");
      }

      setSolutions(solutions.filter((solution) => solution._id !== solutionId));
      showToast("Success", "Solution deleted ✅", "success");
    } catch (error) {
      console.error("Failed to delete solution:", error);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // If the search query is empty, fetch all solutions
      const response = await fetch("/api/solutions");
      const data = await response.json();
      setSolutions(data);
    } else {
      // Search solutions based on the query
      try {
        const response = await fetch("/api/solutions/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to search solutions");
        }

        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error("Failed to search solutions:", error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="my-3 p-3 bg-[rgba(0,0,140,0.3)] rounded-lg absolute top-[70vh] right-5"
      >
        <FaPlus />
      </button>
      <div className={`relative min-h-[80vh] rounded-md`}>
        <video
          src="https://videos.pexels.com/video-files/3129576/3129576-sd_640_360_30fps.mp4"
          className="absolute inset-0 border-none object-cover h-full w-full z-0"
          autoPlay
          loop
          muted
          style={{
            opacity: 0.1,
            maskImage:
              "linear-gradient(to bottom, transparent 10%, black 100%)",
          }}
        />
        <div className="relative z-10">
          <h2
            className={`text-white text-2xl mb-4 ${
              isModalOpen && "opacity-10 transition-opacity duration-300"
            }`}
          >
            Existing Solutions
          </h2>
          <input
            type="text"
            className={`w-[50%] h-[7vh] pl-[20px] bg-[rgba(0,0,30,0.3)] rounded-lg border outline-none flex items-center ${
              isModalOpen && "opacity-10 transition-opacity duration-300"
            }`}
            placeholder="Search your problem here"
            value={searchQuery} // Bind the search query state
            onChange={handleSearchChange} // Add onChange handler
          />
          <div className="bg-gray-800 bg-opacity-20 p-4 rounded-md">
            {loading ? (
              <Loader />
            ) :   (
              <div
                className={`flex flex-wrap gap-4 ${
                  isModalOpen
                    ? "opacity-10 transition-opacity duration-300"
                    : ""
                }`}
              >
                {solutions.map((solution) => (
                  <div
                    key={solution._id}
                    className="bg-[rgba(0,0,30,0.3)] p-4 rounded-md cursor-pointer flex  items-center  gap-2 relative"
                  >
                    {solution.imageUrl && (
                      <img
                        src={solution.imageUrl}
                        alt={solution.title}
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-white text-lg font-semibold mb-2 text-left ml-2">
                        {solution.title}
                      </h3>
                      <p className="text-gray-300 mb-2 text-left ml-2">
                        {solution.description}
                      </p>
                      <div className="flex items-center mt-auto ml-2">
                        {solution.author.profilePic ? (
                          <img
                            src={solution.author.profilePic}
                            alt={solution.author.username}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        ) : (
                          <Avatar
                            name={solution.author.username}
                            w={8}
                            h={8}
                            mr={2}
                          />
                        )}
                        <span className="text-gray-300">
                          {solution.author.username}
                        </span>
                      </div>
                      {/* Show delete icon if the solution belongs to the logged-in user */}
                      {user._id === solution.author._id && (
                         <div className="group absolute top-0 right-2">
                          <button
        onClick={() => handleDeleteSolution(solution._id)}
        className="ml-2 relative z-10 flex items-center justify-center w-8 h-8 bg-white text-red-500 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out group-hover:bg-red-500 group-hover:text-white group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:rotate-6 group-hover:skew-y-3"
      >
          D
                         </button>
                         <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 group-hover:bottom-16 transition-all duration-300 pointer-events-none">
                           <div className="bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2">
                             <div className="flex items-center gap-2">
                               <div className="w-10 h-10 flex items-center justify-center bg-white text-xl font-bold text-blue-500 rounded-md">
                                 Sol
                               </div>
                               <div>
                                 <div className="font-bold text-blue-500">User</div>
                                 <div className="text-gray-400">@{solution.author.username}</div>
                               </div>
                             </div>
                             <div className="text-gray-400 mt-2">Want to delete?</div>
                           </div>
                         </div>
                       </div>
                      )}
                    </div>
      
                  </div>
                ))}
              </div>
            ) }
          </div>
        </div>

        <SoultionModel
          isModalOpen={isModalOpen}
          handleCreateSolution={handleCreateSolution}
          handleCloseModal={handleCloseModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          solutionImage={solutionImage}
          setSolutionImage={setSolutionImage}
          tags={tags}
          setTags={setTags}
        />
      </div>
    </>
  );
};

export default Solutions;
