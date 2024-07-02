/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import OptionRegisterModal from "../../../components/Menu/OptionSelectModal/OptionSelectModal";
import * as s from "./style";
import useUserApis from "../../../hooks/useUserApis";
import { useRecoilState } from "recoil";
import {
  ShoppingCartState,
  TotalPriceState,
} from "../../../atoms/ShoppingCartAtom";
import { useMutation } from "react-query";
import { sendMenu } from "../../../apis/api/order";
import { FaRegTrashCan, FaPlus, FaMinus } from "react-icons/fa6";
import Image from "../../../assets/img/장바구니2.png";
import { IoClose } from "react-icons/io5";

function ShoppingBasketPage(props) {
  const { adminInfo } = useUserApis();
  const [cart, setCart] = useRecoilState(ShoppingCartState);
  const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleIncreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, count: (item.count || 1) + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
          : item
      )
    );
  };

  const handleOptionChange = (index) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  const handleApplyOptions = (options) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === selectedItemIndex
          ? { ...item, options: [...item.options, ...options] }
          : item
      )
    );
    closeModal();
  };

  const handleRemoveOption = (itemIndex, optionIndex) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              options: item.options.filter((_, idx) => idx !== optionIndex),
            }
          : item
      )
    );
  };

  console.log(cart);

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

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        const itemTotal =
          (item.menu.menuPrice +
            item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) *
          (item.count || 1); // 수량 반영
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
      <h1>{adminInfo?.companyName}</h1>
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
                    <p>{item.menu.menuPrice} 원</p>
                  </div>
                  <img src={item.menu.menuImgUrl} alt="" />
                </div>
                <div css={s.option}>
                  {item.options.map((opt, idx) => (
                    <div key={idx} css={s.Xbutton}>
                      <p>
                        {opt.optionName} ( + {opt.optionPrice} )
                      </p>
                      <button onClick={() => handleRemoveOption(index, idx)}>
                        <IoClose size={23} />
                      </button>
                    </div>
                  ))}
                </div>
                <div css={s.countBox}>
                  {item.options.length > 0 && (
                    <button onClick={() => handleOptionChange(index)} css={s.optionChange}>
                      옵션 변경
                    </button>
                  )}
                  <div css={s.count}>
                    {item.count > 1 ? (
                      <button onClick={() => handleDecreaseQuantity(index)}>
                        <FaMinus />
                      </button>
                    ) : (
                      <button onClick={() => handleDeleteFromCart(index)}>
                        <FaRegTrashCan size={20} />
                      </button>
                    )}
                    <p>{item.count || 1}</p>
                    <button onClick={() => handleIncreaseQuantity(index)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div css={s.bottom}>
          <h2>총 가격 {totalPrice} 원</h2>
          <button onClick={() => SEEsendMenus.mutate(cart)}>주문하기</button>
        </div>
      </div>

      {isModalOpen && selectedItemIndex !== null && (
        <OptionRegisterModal
          closeModal={closeModal}
          menuId={cart[selectedItemIndex].menu.menuId}
          onApply={handleApplyOptions}
        />
      )}
    </div>
  );
}

export default ShoppingBasketPage;
