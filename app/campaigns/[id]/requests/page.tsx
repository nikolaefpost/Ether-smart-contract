import React from "react";
import Link from "next/link";
import { RequestsCard } from "../../../../components";
import { NextPage } from "next";
import { CampaignTypeProps } from "../../../../types";
import GetCampaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import HeaderRequestCard from "../../../../components/requestsCard/HeaderRequestCard";

const headerRequest = {
  id: "ID",
  description: "Description",
  amount: "Amount",
  recipient: "Recipient",
  approvalCount: "Approval Count",
  approve: "Approve",
  finalize: "Finalize"
};

const fetchData = async (address: string) => {
  const campaign = GetCampaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill(1).map((el, index) => campaign.methods.requests(index).call())
  );
  let id = 1;
  const req = requests.map(el => (
    {
      id: id++,
      description: el.description,
      amount: web3.utils.fromWei(el.value, 'ether'),
      recipient: el.recipient,
      approvalCount: `${el.approvalCount}/${approversCount}`,
      finalize: el.complete,
      approve: el.approvalCount/approversCount
    }
  ));
  return { req };
};

const Requests: NextPage<CampaignTypeProps> = async ({ params: { id } }) => {
  const { req } = await fetchData(id);

  return (
    <div className="pt-4 pl-4 pr-8">
      <div className="flex justify-between items-start">
        <h2 className=" text-2xl text-cyan-600 font-bold">Requests</h2>
        <Link
          className="mt-2 ml-3  px-4 py-2 bg-cyan-600 text-white rounded-md"
          href="requests/new"
        >Add Request</Link>

      </div>
      <div className="pt-5">
        {req.length}
        <HeaderRequestCard {...headerRequest}   />
        {req.map((el) => (
          <RequestsCard {...el} address={id} />
        ))}
        <div>
        </div>
      </div>
    </div>
  );
};

export default Requests;