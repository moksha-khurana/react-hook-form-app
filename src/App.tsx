import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BookList } from './BookList'
import { XList } from './XList'

import { FileTree } from './file-manager/FileTree';
import {Accordion} from './accordion/Accordion'
import { useDebounce } from "./debounce/useDebounce";
import { useThrottle } from "./throttle/useThrottle";



// function App() {

//   return (
//     <>
//      {/* <div className='flex justify-center items-center h-screen text-3xl text-red-500'>Hello</div> */}
//      {/* <BookList/> */}
//       {/* <div className="min-h-screen bg-gray-100 p-4">
//         <h1 className="text-lg font-bold mb-4">📁 File Manager Tree</h1>
//         <FileTree />
//       </div> */}
//       <Accordion/>
//     </>
//   )
// }

// export default App




function App() {
  const debouncedSearch = useDebounce((query : any) => {
    console.log("Debounced Search:", query);
  }, 500);

  const throttledScroll = useThrottle(() => {
    console.log("Throttled Scroll Y:", window.scrollY);
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [throttledScroll]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Debounce & Throttle (Custom Hooks)</h1>

      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => debouncedSearch(e.target.value)}
        style={{ padding: "8px", width: "100%", maxWidth: "400px" }}
      />

      <div style={{ height: "2000px", marginTop: "2rem" }}>
        <p>Scroll to test throttling logs.</p>
      </div>
    </div>
  );
}

export default App;

