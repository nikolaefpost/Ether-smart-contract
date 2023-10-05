import React, { FC } from "react";
import { ICampaignCardDetails } from "../../types";



const CampaignCardDetails:FC<ICampaignCardDetails> = ({header, meta, description}) => {
  return (
    <div className="border border-cyan-600 rounded sm:h-[150px] p-2">
      <span className="font-bold text-2xl">{header}</span><br />
      <span className=" text-cyan-600">{meta}</span><br />
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default CampaignCardDetails;