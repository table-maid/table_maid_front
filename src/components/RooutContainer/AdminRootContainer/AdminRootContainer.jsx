/**@jsxImportSource @emotion/react */
import { useState } from "react";
import SideBar from "../../Sidebar/Sidebar";
import * as s from "./style";
import { useQuery } from "react-query";
import { getPrincipalRequest } from "../../../apis/api/principal";

function AdminRootContainer({ children }) {
  const [isShow, setIsShow] = useState(false);

  const principalQuery = useQuery("principalQuery", getPrincipalRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      console.log("프린스퍼");
      console.log(response.data);
      if (response.data) {
        setIsShow(true);  
      } else {
        setIsShow(false); 
      }
    },
    onError: (error) => {
      console.log(error);
      setIsShow(false); 
    },
  });

  return (
    <div css={s.layout}>
      {isShow && (
        <div css={s.sideBar}>
          <SideBar />
        </div>
      )}
      <div css={s.content(isShow)}>
        {children}
      </div>
    </div>
  );
}

export default AdminRootContainer;