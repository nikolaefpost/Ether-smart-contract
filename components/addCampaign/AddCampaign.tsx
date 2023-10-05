"use client";
import React, { useState, CSSProperties, useEffect } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { HashLoader } from "react-spinners";
import { useRouter } from 'next/navigation'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  position: "absolute",
  top: "250px"
};

const AddCampaign = () => {
  const [contribution, setContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const router = useRouter();



  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    try {
       await factory.methods.createCampaign(contribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
    setLoading(false);
  };
  return (
    <form
      className="flex justify-center items-center "
      onSubmit={onSubmit}
    >
      <div className="basis-3/4 relative pt-6">
        {!errorMessage && <span className="absolute left-0 top-0">Minimum Contribution</span>}
        {errorMessage && <span className="absolute right-0 top-0 text-pink-500 text-xs">{errorMessage}</span>}
        <input
          className="h-[40px] px-3 w-full border border-cyan-600 rounded-md flex  items-center text-cyan-600
                    focus:outline-cyan-600"
          type="text"
          value={contribution}
          onChange={(event) => {
            setContribution(event.target.value);
          }}
          onFocus={() => setErrorMessage("")}
          placeholder="enter minimum contribution"
        />

      </div>
      <div className="basis-1/4 flex justify-center h-full pt-6">
        <button disabled={loading} type="submit"
                className="bg-cyan-600 text-white rounded-md h-[40px] w-[80px] flex justify-center items-center">Create!
        </button>
      </div>

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

export default AddCampaign;