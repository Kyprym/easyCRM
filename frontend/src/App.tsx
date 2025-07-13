import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { IssuesTable } from './components.js/issues/issuesTable';
import { IssuePage } from './components.js/issue/issuePage';
import { AuthorizationPage } from './components.js/authorization/authorizationPage';

const PrivateRoute = () => {
  const authValid = (): boolean => {
    const localToken = Number(localStorage.getItem('id'));
    return localToken > 0;
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

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;