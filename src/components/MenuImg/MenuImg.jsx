/** @jsxImportSource @emotion/react */
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as s from "./style";
import {v4 as uuid} from "uuid"
import { useCallback} from 'react';
import { storage } from "../../apis/firebase/firebaseConfig";
import { useMutation } from "react-query";
import { updateImgUrlRequest } from "../../apis/api/menuManagentApi";
function ProfileImg({ adminId, menuImgUrl, menuId }) {

    const updateImgUrlMutation = useMutation({
        mutationKey: "updateImgUrlMutation",
        mutationFn: updateImgUrlRequest,
        onSuccess: response => {
          alert("정상적으로 등록되었습니다");
          window.location.reload();
        }
      });   
      
    
    const imgChangeClick = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/");
    
        input.onchange = async () => {
          const file = input.files[0];
          const storageRef = ref(storage, `project_image/${uuid()}_${file.name}`);
          console.log(storageRef)
          const uploadResponse = await uploadBytes(storageRef,file);
    
          const downloadUrl =  await getDownloadURL(uploadResponse.ref);
        
          const confirmUpload = window.confirm("이미지를 등록하시겠습니까?");
          if (confirmUpload) {
            
              const imgBoard = {
                adminId,
                menuId,
                menuImgUrl:downloadUrl
            };
            console.log(imgBoard);
            updateImgUrlMutation.mutate(imgBoard);
          }
        }
        input.click();
        
      }, []);

    
    return (
        
        <div css={s.MenuImgLayout}>
          {
            menuImgUrl === null ?
            (
              <div css={s.imgBox} onClick={imgChangeClick} >
                이미지를 추가해주세요
              </div>
            )
            :
            (
              <div css={s.imgBox} onClick={imgChangeClick} >
                <img src={menuImgUrl} alt="" />
              </div>
            )
          }
        </div> 
    );
}

export default ProfileImg;