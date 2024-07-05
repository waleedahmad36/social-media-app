
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import Loader from './Loader';
const SoultionModel = ({handleCloseModal,handleCreateSolution,isModalOpen,title,setTitle,description,setDescription,tags,setTags,solutionImage,setSolutionImage}) => {
    const [imageTitle, setImageTitle] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const access_key = 'TjTIpJVAwbUSUQ73_Qlem4wTha_Wjl39Rz6iGghNTtc';
    const [loading,setLoading] = useState(false)
    const user = useRecoilValue(userAtom);
    const handleGetImage = async () => {
        if (!imageTitle) return;
        setLoading(true)
        try {
          const response = await fetch(`https://api.unsplash.com/search/photos?query=${imageTitle}&client_id=${access_key}`);
          if (!response.ok) {
            throw new Error('Failed to fetch images from Unsplash');
          }
          const data = await response.json();
          if (data.results.length > 0) {
            setSolutionImage(data.results[0].urls.regular);
          } else {
            console.error('No images found for the provided title');
          }
        } catch (error) {
          console.error('Failed to fetch images from Unsplash:', error);
        }finally{
          setLoading(false)
        }
      };
    const handleTagInput = (e) => {
        setCurrentTag(e.target.value);
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentTag.trim() !== '') {
          setTags([...tags, currentTag.trim()]);
          setCurrentTag('');
        }
      };
    
      const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
      };
   
  return (
    <AnimatePresence>
    {isModalOpen && (
      <motion.div className="fixed inset-0 z-50 overflow-scroll bg-smoke-light flex"
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100vh" }}
        transition={{ duration: 0.7 }}>
        <motion.div className="relative p-8 bg-[rgba(0,0,40,0.7)] w-full max-w-4xl m-auto flex-col flex rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <span className="absolute top-0 right-0 p-4">
            <button onClick={handleCloseModal} className='bg-[rgba(0,0,80,0.5)] p-3'>
              <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          <h2 className="text-2xl mb-4 text-gray-300">Post a Solution</h2>
          <div className="flex justify-center gap-1">
            <input type="text" placeholder='Title for solution' onChange={(e) => setTitle(e.target.value)} value={title} className='py-3 pl-5 bg-[rgba(0,0,30,0.3)] border border-gray-700 rounded-lg my-3 w-[50%]' />
            <input type="text" placeholder='Title for your generating image' onChange={(e) => setImageTitle(e.target.value)} value={imageTitle} className='py-3 pl-5 w-[50%] bg-[rgba(0,0,30,0.3)] border border-gray-700 rounded-lg my-3' />
          </div>
          <div className='w-full flex items-center justify-center'>
            <div className={`flex justify-center border ${solutionImage && 'w-[300px] h-[300px]'}`}>
              {solutionImage && !loading && (
                <img src={solutionImage} className='object-cover my-2 rounded-lg' alt='Solution' />
              )}
               {loading && (
                 <Loader/>
              )}
            </div>
          </div>
          <button className='py-3 px-5 bg-[rgba(0,0,30,0.3)] border border-gray-700 rounded-lg my-3' onClick={handleGetImage}>Get Suitable image?</button>
          <textarea
            placeholder='Describe the Solution'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full p-2 bg-[rgba(0,0,30,0.3)] pl-5 border border-gray-700 rounded-lg my-3"
          ></textarea>
          <input
            type="text"
            placeholder='Enter tags separated by Enter'
            value={currentTag}
            onChange={handleTagInput}
            onKeyPress={handleKeyPress}
            className='bg-[rgba(0,0,30,0.3)] border border-gray-700 rounded-lg my-3 pl-5 py-3'
          />
          <div className="flex flex-wrap">
            {tags?.map((tag, index) => (
              <div key={index} className="bg-[rgba(0,0,80,0.9)] text-white flex items-center justify-start px-4 py-2 rounded-lg mr-2 mb-2 relative">
                <span>{tag}</span>
                <button className="p-2 text-red-500 focus:outline-none absolute -top-2 -right-1 cursor-pointer" onClick={() => handleRemoveTag(index)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <button className="p-3 bg-[rgba(0,0,180,0.3)] text-white rounded-lg w-[200px] hover:bg-[rgba(0,0,100,0.3)]" onClick={handleCreateSolution}>Post Solution</button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  )
}

export default SoultionModel