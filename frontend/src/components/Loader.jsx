import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-left-color: #ffffff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;
