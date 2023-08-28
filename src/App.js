import './App.css'
import Navbar from './components/Navbar';
import News from './components/News';
import React,{useState} from 'react'
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


 const App=()=> {
  const apikey=process.env.REACT_APP_NEWS_API
  // apikey="df932a8bbfd54ed6acf41d9ea6e56894"
  const pageSize=10
  const [progress, setProgress] = useState(10)

//   setProgress(progress)



//  state={
//   progress:10
//  }
//  setProgress=(progress)=>{
//   setState({progress:progress})
//  }

 
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
            
         />
          
          <Routes>
            <Route exact path="/" element={<News apikey={apikey} setProgress={setProgress} key="general" pageSize={pageSize} country='in' category="general"></News>}/>
            <Route exact path="/business" element={<News apikey={apikey} setProgress={setProgress} key="business" pageSize={pageSize} country='in' category="business"></News>}/>
            <Route exact path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country='in' category="entertainment"></News>}/>
            <Route exact path="/general" element={<News apikey={apikey} setProgress={setProgress} key="general" pageSize={pageSize} country='in' category="general"></News>}/>
            <Route exact path="/health" element={<News apikey={apikey} setProgress={setProgress} key="health" pageSize={pageSize} country='in' category="health"></News>}/>
            <Route exact path="/science" element={<News apikey={apikey} setProgress={setProgress} key="science" pageSize={pageSize} country='in' category="science"></News>}/>
            <Route exact path="/sports" element={<News apikey={apikey} setProgress={setProgress} key="sports" pageSize={pageSize} country='in' category="sports"></News>}/>
            <Route exact path="/technology" element={<News apikey={apikey} setProgress={setProgress} key="technology" pageSize={pageSize} country='in' category="technology"></News>}/>

          </Routes>
        </Router>
      </div>
    )
  
}

export default App
