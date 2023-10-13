import React from "react";
import { AddRequest} from "../../../../../components";
import { NextPage } from "next";
import { CampaignTypeProps } from "../../../../../types";
import Link from "next/link";




const NewRequest: NextPage<CampaignTypeProps> = ({ params: { id } }) => {

  return (
    <div className="pt-4 px-4 ">
      <div className="flex justify-between items-start">
        <h2 className=" text-2xl text-cyan-600 font-bold">Create a Request</h2>
        <Link
          className="mt-2 ml-3 px-6 py-2 bg-cyan-600 text-white rounded-md"
          href={`/campaigns/${id}/requests`}
        >Back</Link>
      </div>

      <AddRequest address={id}/>
    </div>
  );
};

export default NewRequest;