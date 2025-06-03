import { Route, Routes } from 'react-router-dom'
import { IssuesTable } from './components.js/issues/issuesTable'
import { IssuePage } from './components.js/issue/issuePage'


function App() {
 




  return (
    <>   
    <Routes>
        <Route path='/issues/' element={<IssuesTable/>}/>
        
        <Route path='/issues/1' element={<IssuePage issueID='1'/>}/> 
    </Routes>
    </>
  )
}

export default App
