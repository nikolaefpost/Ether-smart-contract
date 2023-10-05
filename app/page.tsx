
import React from 'react';
import Link from 'next/link';
import factory from "../ethereum/factory";
import {NextPage} from 'next';
import {CampaignCard} from "../components";


const fetchData = async () => {
    const data = await factory.methods.getDeployedCampaign().call();

     return data.map(address=>({
        header: address,
        description: "View Campaign",
    }));
}

const Page: NextPage = async () => {
    const campaigns = await fetchData();

    return (
        <div className="">
            <h1 className="p-3 text-2xl">This is the campaign list page</h1>

            <div className="flex items-center">
                <div className="flex flex-col basis-3/4">
                    {campaigns.map(item=>(
                        <CampaignCard {...item} key={item.header}  />
                    ))}
                </div>
                <div className="basis-1/4 flex justify-center ">
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-md">Create Campaign</button>
                </div>

            </div>



            <Link href="/campaigns/new">newcampaign</Link>
            <Link href="/show">show</Link>
        </div>)
}

export default Page