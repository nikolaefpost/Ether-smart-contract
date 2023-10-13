
import React from 'react';
import Link from 'next/link';
import factory from "../ethereum/factory";
import {NextPage} from 'next';
import {CampaignCard} from "../components";


const fetchData = async () => {
    const data = await factory.methods.getDeployedCampaign().call();

     return data.map(address=>({
        header: address,
        description: `/campaigns/${address}`,
    }));
}

const Page: NextPage = async () => {
    const campaigns = await fetchData();

    return (
        <div className="p-4">
            <h1 className="p-3 text-2xl text-cyan-600 font-bold">This is the campaign list page</h1>

            <div className="flex items-start flex-wrap md:flex-nowrap gap-x-3">
                <div className="flex flex-col basis-full md:basis-3/4">
                    {campaigns.map(item=>(
                        <CampaignCard {...item} key={item.header}  />
                    ))}
                </div>
                <div className="basis-full md:basis-1/4 flex justify-center ">
                    <Link href="/campaigns/new" className="w-full mt-3 px-4 py-2 bg-cyan-600 text-center text-white rounded-md">Create Campaign</Link>
                </div>

            </div>
        </div>)
}

export default Page