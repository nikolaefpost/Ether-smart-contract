"use client"
import React, {useState} from 'react';
import {AddCampaign} from "../../../components";

export default function Page() {
    const [contribution, setContribution] = useState("")
    return (
        <>
            <h2 className="text-2xl pt-5 mb-6">Create Campaign</h2>
            <AddCampaign/>
        </>

    )
}