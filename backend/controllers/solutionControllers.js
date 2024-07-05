import Solution from "../models/solutionModel.js";
import User from "../models/userModel.js";

// Create a new solution
const createSolution = async (req, res) => {
  try {
    const { title, description, tags, imageUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Automatically get the author from the logged-in user
    const author = req.user._id;

    // Create a new solution
    const newSolution = new Solution({
      title,
      description,
      tags,
      author,
      imageUrl, // Add imageUrl to the new solution
    });

    // Save the new solution to the database
    const savedSolution = await newSolution.save();

    res.status(201).json(savedSolution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Delete a solution by ID
const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    // Check if the logged-in user is the author of the solution
    if (solution.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to delete solution" });
    }

    await Solution.findByIdAndDelete(req.params.id);
    res.json({ message: "Solution deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





const searchSolutions = async (req, res) => {
    try {
      const { query } = req.body; // Retrieve query from the request body
  
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required and should be a string" });
      }
  
      // Find solutions that match the search query in title or description
      const solutions = await Solution.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).populate("author", "username profilePic");
  
      res.json(solutions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  



// Controller for getting all existing solutions
const getAllSolutions = async (req, res) => {
    try {
      // Find all solutions in the database and populate the author field
      const solutions = await Solution.find().populate("author", "username profilePic");
  
      // Return the list of solutions
      res.json(solutions);
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  };

// Export the controller function


//admin controllers


  
  






export { createSolution , deleteSolution  , searchSolutions , getAllSolutions};
