import { useEffect, useState } from "react";
import { getCategoriesRequest, getCompanyNameRequest, getMenusRequest } from "../apis/api/user";
import { useQuery } from "react-query";

const useUserApis = (props) => {
  const [adminInfo, setAdminInfo] = useState({ adminId: 1 });
  const [categoryId, setCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (categoryList.length > 0) {
      setCategoryId(categoryList[0].menuCategoryId);
    }
  }, [categoryList]);


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
    ["getMenusQuery", categoryId],
    () =>
      getMenusRequest({
        adminId: adminInfo.adminId,
        menuCategoryId: categoryId,
      }),
    {
      enabled: !!adminInfo.adminId && !!categoryId,
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

  const getCategoriesQuery = useQuery(
    ["getCategoriesQuery"],
    () =>
      getCategoriesRequest({
        adminId: adminInfo.adminId,
      }),
    {
      enabled: !!adminInfo.adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setCategoryList(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { adminInfo, menuList, categoryId, categoryList, setCategoryId };
};

export default useUserApis;
