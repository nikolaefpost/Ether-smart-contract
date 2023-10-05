import React, {FC} from 'react';
import {CampaignCardsI} from "../../types";
import Link from "next/link";



const CampaignCards: FC<CampaignCardsI> = ({header, description}) => {
    return (
        <div key={header} className="border border-current rounded-sm  p-2 rounded-md">
            <h3 >{header}</h3>
            <Link className="text-3xl" href='#'>{description}</Link>
        </div>
    );
};

export default CampaignCards;