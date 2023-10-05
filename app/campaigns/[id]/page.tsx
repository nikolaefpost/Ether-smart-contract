import React, {FC} from 'react';



type CampaignTypeProps = {
    params: {
        id: string
    }
}

const Campaign: FC<CampaignTypeProps> = ({params: {id}}) => {
    return (
        <div>
            Campaign - {id}
        </div>
    );
};

export default Campaign;