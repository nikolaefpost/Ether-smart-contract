import React, { FC } from "react";
import cn from "classnames";
import { headerRequestI } from "../../types";


const HeaderRequestCard: FC<headerRequestI> = (
  {
    id,
    approvalCount,
    description,
    amount,
    recipient,
    approve,
    finalize,
  }) => {
  return (
    <div
      className="flex mt-2  pb-2 border-b text-inherit"
    >
      <div className="w-[3%] border-r">{id}</div>
      <div className="w-[23%] flex items-center pl-1 border-r ">{description}</div>
      <div className="w-[10%] border-r flex items-center justify-center ">{amount}</div>
      <div className="w-[25%] text-center pl-1 truncate border-r">{recipient}</div>
      <div className="w-[18%] flex items-center  justify-center border-r">{approvalCount}</div>
      <div className="w-[10%] border-r align-middle px-1">{approve}</div>
      <div className="w-[10%] align-middle px-1">{finalize}</div>
    </div>
  );
};

export default HeaderRequestCard;