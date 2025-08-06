import { useEffect, useState } from "react";
import { IssueHeader } from "./issueHeader";
import { IssuePageContent } from "./issuePageContent";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export interface issueProps {
  issueID: number
}

export const IssuePage = ({ issueID }: issueProps) => {
  const dispatch = useDispatch();
  const issueDataFromStore = useSelector((state: any) => state.issue.issue)
  const [loading, setLoading] = useState(true)
  const { issueData } = issueDataFromStore

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true)
      await dispatch({ type: "ASYNC_GET_ISSUE", payload: issueID }); 
      setLoading(false)
    }

    fetchIssue();
  }, [dispatch, issueID])

  if (loading || !issueDataFromStore) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  
  if (!issueData || issueData.length === 0) {
    return <div>Идёт загрузка...</div>
  }

  return (
    <>
      <IssueHeader
        issueID={issueID}
        theme={issueData[0].theme}
      />

      <IssuePageContent
        issueID={issueID}
      />
    </>
  )
}