import React, {useState} from 'react';
import {Button, Input} from "reactstrap";
import adminService from "../../services/adminService";

const PatchUrl = () => {
  const [url, setUrl] = useState("");
  const handleClick =  async () => {
    console.log("asdf", url)
    const re = await adminService.patchUrl(url);
    alert("patch status: " + re)
  }
  return (
      <div>
        URL
        <Input onChange={(e)=>setUrl(e.target.value)}/>
        <Button onClick={handleClick}>Patch</Button>
      </div>
  );
};

export default PatchUrl;
