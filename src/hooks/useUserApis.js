import { useState } from 'react';
import { getCompanyNameRequest, getMenusRequest } from '../apis/api/user';
import { useQuery } from 'react-query';

const useUserApis = (props) => {
    const [adminInfo, setAdminInfo] = useState({ adminId: 1 });
      const [selectedCategoryId, setSelectedCategoryId] = useState(null);
      const [menuList, setMenuList] = useState([]);


      const getCompanyNameQuery = useQuery(
        ["getCompanyNameQuery"],
        () =>
          getCompanyNameRequest({
            adminId: adminInfo.adminId,
          }),
        {
          enabled: !!adminInfo.adminId,
          retry: 0,
          refetchOnWindowFocus: false,
          onSuccess: (response) => {
            setAdminInfo(response.data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );

        const getMenusQuery = useQuery(
          ["getMenusQuery", selectedCategoryId],
          () =>
            getMenusRequest({
              adminId: adminInfo.adminId,
              menuCategoryId: selectedCategoryId,
            }),
          {
            enabled: !!adminInfo.adminId && !!selectedCategoryId,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
              setMenuList(response.data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );

    return { adminInfo, menuList, setSelectedCategoryId };
};

export default useUserApis;