import React from "react";
import GetCampaign from "../../../ethereum/campaign";
import { NextPage } from "next";
import web3 from "../../../ethereum/web3.js";
import { CampaignCardDetails, ContributeForm } from "../../../components";
import Link from "next/link";
import { CampaignTypeProps } from "../../../types";



const fetchData = async (address: string) => {
  const campaign = GetCampaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };
};


const Campaign: NextPage<CampaignTypeProps> = async ({ params: { id } }) => {
  const {
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager
  } = await fetchData(id);

  const requestsUrl = `/campaigns/${id}/requests`;

  const items = [
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description: "You must contribute at least this much wei to became an approver"
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description: "A request tries to withdraw money from the contract. Requests" +
        " must be approved by approvers."
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: "Number of people who have already donated o this campaign"
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: "Campaign Balance (ether)",
      description: "The balance is how much money this campaign has left to spend. "
    }
  ];
  return (
    <>
      <h2 className="p-5 text-2xl text-cyan-600 font-bold">Campaign Details</h2>
      <div className="flex pt-5 gap-4 flex-col lg:flex-row">
        <div className="basis-3/5">
          <div className="border border-cyan-600 rounded  p-2 m-3">
            <h3 className="text-xs sm:text-xl  font-bold">{manager}</h3>
            <h5 className="text-cyan-500">Address of Manager</h5>
            <p>The manager created this campaign and can create requests to withdraw money</p>
          </div>

          <div className="px-3 grid gap-4 grid-cols-2 mb-5">
            {items.map((item)=>(
              <CampaignCardDetails {...item} key={item.header}/>
            ))}
          </div>
          <Link href={requestsUrl}  className="ml-3  px-4 py-2 bg-cyan-600 text-white rounded-md">
            View Requests
          </Link>
        </div>

        <ContributeForm address={id}/>
      </div>
    </>
  );
};

export default Campaign;