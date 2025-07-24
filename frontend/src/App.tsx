import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { IssuesTable } from './components.js/issues/issuesTable';
import { IssuePage } from './components.js/issue/issuePage';
import { AuthorizationPage } from './components.js/authorization/authorizationPage';

const PrivateRoute = () => {
  const authValid = (): boolean => {
    const localUserID:number = Number(localStorage.getItem('id'));
    const localSessionToken:string = String(localStorage.getItem('sessionToken'));
 
    if(localUserID >0 && localSessionToken.length > 10){
      return true
    }else return false
  };

  return authValid() ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/issues" element={<IssuesTable />} />
        <Route path="/issues/1" element={<IssuePage issueID="1" />} />
      </Route>

      <Route path="*" element={<AuthorizationPage />} />
    </Routes>
  );
}

export default App;