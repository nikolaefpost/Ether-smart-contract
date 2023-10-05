"use client";
import React, { useState } from "react";

const ContributeForm = () => {
  const [contribution, setContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("The balance is how much money this campaign has left to spend. ");
  const [loading, setLoading] = useState(false);
  return (
    <div className="basis-2/5 pr-3">
      <h3 className="text-xl">Contribute to this campaign!</h3>
      <form className="flex py-3 gap-4 flex-col sm:flex-row">
        <div className="flex-1 border border-cyan-600 rounded-md flex">
          <input
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