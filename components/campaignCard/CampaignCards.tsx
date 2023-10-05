import React, {FC} from 'react';
import {CampaignCardsI} from "../../types";
import Link from "next/link";



const CampaignCards: FC<CampaignCardsI> = ({header, description}) => {
    return (
        <div
          key={header}
          className="border border-cyan-600 rounded-md mt-3 p-2 shadow"
        >
            <h3 className="text-2xl">{header}</h3>
            <Link className="underline text-cyan-600" href={description}>View Campaign</Link>
        </div>
    );
};

export default CampaignCards;