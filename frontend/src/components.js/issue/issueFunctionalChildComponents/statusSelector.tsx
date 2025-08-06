import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useState } from "react";
import { API_URL } from "../../../DB/DBconfig";
import { useDispatch } from "react-redux";
import { putIssueInDB } from "../../../DB/issueHTTPmethods";

interface StatusItem {
  status: string;
  color: string;
}


interface statusSelectorProps {
  selectorName?:string;
  issueID:number;
  issueKeyID:string;
  status: number;
  statusTextArr?: StatusItem[];
  link:string;
  actionType?:string;
}

export const StatusSelector = ({selectorName, issueID, issueKeyID, status, statusTextArr, link, actionType }: statusSelectorProps) => {  
  const dispatch = useDispatch()
  const initialColor:string = statusTextArr[status - 1].color 
  const [backgrColorState, setBackgrColorState] = useState(initialColor)

  
  const changeStatusSelector = async (e: React.ChangeEvent<HTMLSelectElement>) => {   
    const selectedValue:number = Number(e.target.value)
    const selectedColor:string = statusTextArr[selectedValue].color 
    setBackgrColorState(selectedColor)
    putIssueInDB(`${API_URL}/issues/${issueID}/${link}`, selectedValue + 1, issueKeyID)
    actionType? dispatch({type:actionType, payload:selectedValue + 1}): null

  };

  return (
    <div>
      <FormControl sx={{ width: "auto" }}>
        {selectorName?
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {selectorName}
        </InputLabel>:
        <></>
        }
        <NativeSelect
          sx={{ backgroundColor: backgrColorState, paddingLeft: '0.5rem'}}
          defaultValue={status - 1}
          onChange={changeStatusSelector}
        >
          {statusTextArr.map((item, index) => (
            <option
              key={index}
              value={index}
              style={{backgroundColor:statusTextArr[index].color}}
            >
              {item.status}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};