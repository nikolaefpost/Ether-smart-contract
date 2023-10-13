"use client";
import React, { CSSProperties, FC, useState } from "react";
import { requestI } from "../../types";
import GetCampaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { HashLoader } from "react-spinners";
import cn from "classnames";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  top: "-10px",
  right: "22%"

};

const RequestsCard: FC<requestI> = (
  {
    id,
    approvalCount,
    description,
    amount,
    recipient,
    approve,
    finalize,
    address
  }) => {
  console.log(finalize);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const approveRequest = async () => {
    const campaign = GetCampaign(address);
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    try {
      await campaign.methods.approveRequest(id - 1).send({
        from: accounts[0]
      });
      setLoading(false);
      location.reload();
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  };

  const finalizeRequest = async () => {
    const campaign = GetCampaign(address);
    const accounts = await web3.eth.getAccounts();
    setLoading(true);
    try{
      await campaign.methods.finalizeRequest(id - 1).send({
        from: accounts[0]
      });
      setLoading(false);
      location.reload();
    }catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  };

  const ableFinalize = approve > .5;
  return (<>
      <div
        onClick={()=>setErrorMessage("")}
        className={cn("flex mt-2 relative",
          { ["text-green-600"]: (!finalize && ableFinalize) }, { ["text-slate-300"]: finalize })}
      >
        <div className="w-[3%] border-r">{id}</div>
        <div className="w-[23%] flex items-center pl-1 border-r ">{description}</div>
        <div className="w-[10%] border-r flex items-center justify-center ">{amount}</div>
        <div className="w-[25%] text-center pl-1 truncate border-r">{recipient}</div>
        <div className="w-[18%] flex items-center  justify-center border-r">{approvalCount}</div>
        <div className="w-[10%] border-r align-middle px-1">
          {!finalize ?
            <button
              className="w-full   py-1 bg-cyan-600 text-white rounded-md"
              onClick={approveRequest}
            >approve</button> : null}
        </div>
        <div className="w-[10%] align-middle px-1">
          {!finalize ?
            <button
              className="w-full   py-1 bg-green-600 text-white rounded-md"
              onClick={finalizeRequest}
            >finalize</button> : "finalized"}
        </div>
        <HashLoader
          color="#0891b2"
          loading={loading}
          cssOverride={override}
          size={50}
          speedMultiplier={1}
        />
      </div>
      {errorMessage &&
        <div className="text-pink-500  border border-pink-500 rounded-md p-5">
          {errorMessage}
        </div>
      }
    </>
  );
};

export default RequestsCard;