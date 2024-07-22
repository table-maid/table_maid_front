/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import { sendMenu } from "../../../apis/api/order";
import {
  ShoppingCartState,
  TotalPriceState,
} from "../../../atoms/ShoppingCartAtom";
import { useSearchParams } from "react-router-dom";
import { getCompanyNameRequest } from "../../../apis/api/user";
import { FaRegTrashCan, FaPlus, FaMinus } from "react-icons/fa6";
import Image from "../../../assets/img/장바구니2.png";
import { tableNumberState } from "../../../atoms/UserNumberStateAtom";

function ShoppingBasketPage(props) {
  const [searchParams] = useSearchParams(); 
  const adminId = searchParams.get("adminId");
  const [cart, setCart] = useRecoilState(ShoppingCartState);
  const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);
  const [companyName, setCompanyName] = useState("");
  
  useEffect(() => {
    // handleAddToCart();
    console.log(cart)
  }, [])

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleIncreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const SEEsendMenus = useMutation({
    mutationKey: "SEEsendMenus",
    mutationFn: sendMenu,
    onSuccess: (response) => {
      console.log("주문성공");
      console.log(response);
    },
    onError: (Error) => {
      console.log("주문실패");
      console.log(Error);
    },
  });

  const getCompanyNameQuery = useQuery(
    ["getCompanyNameQuery"],
    () =>
      getCompanyNameRequest({
        adminId: adminId,
      }),
    {
      enabled: !!adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setCompanyName(response.data);
        console.log(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        const itemTotal =
          (item.menu.menuPrice +
            item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) *
          (item.quantity || 1);
        return total + itemTotal;
      }, 0);
    };

    const newTotalPrice = calculateTotalPrice();
    if (newTotalPrice !== totalPrice) {
      setTotalPrice(newTotalPrice);
    }
  }, [cart, totalPrice, setTotalPrice]);

  return (
    <div css={s.layout}>
      <h1>{companyName?.companyName}</h1>
      <div css={s.container}>
        {cart.length === 0 ? (
          <div css={s.noItem}>
            <img src={Image} alt="" />
            <p>장바구니가 텅 비어 있습니다.</p>
          </div>
        ) : (
          <div css={s.menuBox}>
            {cart.map((item, index) => (
              <div key={index}>
                <div css={s.menuList}>
                  <div css={s.menuItem}>
                    <h2>{item.menu.menuName}</h2>
                    <p>가격: {item.menu.menuPrice}</p>
                  </div>
                  <img src={item.menu.menuImgUrl} alt="메뉴 이미지" />
                  <div>
                    {item.options.map((opt, idx) => (
                      <div key={idx}>
                        <p>
                          {opt.optionName} ( + {opt.optionPrice} )
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div css={s.countBox}>
                  <div css={s.count}>
                    {item.quantity > 1 ? (
                      <button onClick={() => handleDecreaseQuantity(index)}>
                        <FaMinus />
                      </button>
                    ) : (
                      <button onClick={() => handleDeleteFromCart(index)}>
                        <FaRegTrashCan size={20} />
                      </button>
                    )}
                    <p>{item.quantity || 1}</p>
                    <button onClick={() => handleIncreaseQuantity(index)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div css={s.bottom}>
        <h2>총 가격 {totalPrice} 원</h2>
        <button onClick={() => SEEsendMenus.mutate(cart)}>주문하기</button>
      </div>
    </div>
  );
}

export default ShoppingBasketPage;
