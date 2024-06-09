/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
// import * as s from "./style";
import { getMenuTotalSalesRequest } from "../../../apis/api/salesApi";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


function MenuSalesPage(props) {
	const [adminId, setAdminId] = useState(1);
	const [menuSales, setMenuSales] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const { menuId } = useParams();

	useEffect(() => {
		console.log(menuId);
	}, [menuId]);

	const selectSalesQuery = useQuery(
		"selectSalesQuery",
		getMenuTotalSalesRequest({
			adminId: adminId,
			menuId: menuId
		}),
		{
		  retry: 0,
		  refetchOnWindowFocus: false,
		  onSuccess: (response) => {
			console.log(response.data);
			setMenuSales(response.data);
		  },
		  onError: (error) => {
			console.log("에러 :", error);
		  },
		}
	  );
	
	return (
		<div>
			fsdfvdsf
		</div>
	);
}

export default MenuSalesPage;