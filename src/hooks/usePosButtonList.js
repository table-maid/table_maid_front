import { useState } from "react"

const usePosButtonList = () => {
  const [buttons] = useState([
    "3X2",
    "3X3",
    "4X3",
    "4X4",
    "5X3",
    "5X4",
    "5X5",
    "5X6"
  ]);
  return buttons;
}

export default usePosButtonList
