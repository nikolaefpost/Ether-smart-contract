"use client";
import React, { CSSProperties, FC, useState } from "react";
import web3 from "../../ethereum/web3";
import { useRouter } from 'next/navigation';
import { HashLoader } from "react-spinners";
import GetCampaign from "../../ethereum/campaign";

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  bottom: "-80px",
  left: "45%"
};

interface IAddRequest {
  address: string
}

const AddRequest: FC<IAddRequest> = ({address}) => {
  const[ description, setDescription ] = useState("")
  const[ amount, setAmount ] = useState("")
  const[ recipient, setRecipient ] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  const requestsUrl = `/campaigns/${address}/requests`;

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const campaign = GetCampaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(amount, "ether"),
        recipient
      ).send({
        from: accounts[0],
      });
      router.push(requestsUrl);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <form className="w-full sm:w-[50%] mx-auto mt-4 relative" onSubmit={onSubmit}>
      <div>
        <label>Description</label>
        <input
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          onFocus={()=>setErrorMessage("")}
          type="text"
          className="w-full h-[40px] px-3 w-full border border-cyan-600 rounded-md flex  items-center text-cyan-600
                    focus:outline-cyan-600" />
      </div>
      <div>
        <label>Amount in Either</label>
        <input
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          onFocus={()=>setErrorMessage("")}
          type="text"
          className="w-full h-[40px] px-3 w-full border border-cyan-600 rounded-md flex  items-center text-cyan-600
                    focus:outline-cyan-600" />
      </div>
      <div>
        <label>Recipient</label>
        <input
          value={recipient}
          onChange={(e)=>setRecipient(e.target.value)}
          onFocus={()=>setErrorMessage("")}
          type="text"
          className="w-full h-[40px] px-3 w-full border border-cyan-600 rounded-md flex  items-center text-cyan-600
                    focus:outline-cyan-600" />
      </div>
      <button
        type="submit"
        className="w-full mt-3 text-center py-2 bg-cyan-600 text-white rounded-md"
      >Create</button>
      {errorMessage &&
        <div className="mt-4 text-pink-500  border border-pink-500 rounded-md p-5">
          {errorMessage}
        </div>
      }
      <HashLoader
        color="#0891b2"
        loading={loading}
        cssOverride={override}
        size={50}
        speedMultiplier={1}
      />
    </form>
  );
};

export default AddRequest;