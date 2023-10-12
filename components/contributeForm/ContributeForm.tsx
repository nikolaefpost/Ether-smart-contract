"use client";
import React, { CSSProperties, FC, useState } from "react";
import { IContributeForm } from "../../types";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { HashLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  left: "45%",
  position: "absolute",
  bottom: "-80px"
};

const ContributeForm: FC<IContributeForm> = ({ address }) => {
  const [contribution, setContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether')
      })
      setLoading(false);
      location.reload()
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="basis-2/5 pr-3">
      <h3 className="text-xl">Contribute to this campaign!</h3>
      <form className="flex py-3 gap-4 flex-col sm:flex-row relative" onSubmit={onSubmit}>
        <div className="flex-1 border border-cyan-600 rounded-md flex">
          <input
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            onFocus={()=>setErrorMessage("")}
            type="text"
            className="flex-1 flex  items-center text-cyan-600 rounded-md
             focus:outline-cyan-600 px-3"
          />
          <div className=" px-4 py-2 bg-cyan-600 text-white">ether</div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 text-white rounded-md"
        >
          Contribute!
        </button>
        <HashLoader
          color="#0891b2"
          loading={loading}
          cssOverride={override}
          size={50}
          speedMultiplier={1}
        />
      </form>
      {errorMessage &&
        <div className="text-pink-500  border border-pink-500 rounded-md p-5">
          {errorMessage}
        </div>
      }

    </div>
  );
};

export default ContributeForm;