

export interface CampaignCardsI {
    header: string;
    description: string;
}

export interface ICampaignCardDetails {
    header: string;
    meta: string;
    description: string;
}

export interface IContributeForm {
    address: string;
}

export interface headerRequest {
    id: string;
    description: string;
    amount: string;
    recipient: string;
    approvalCount: string;
    approve?: string;
    finalize?: string;
    isHeader?: boolean;
    address: string;
}

export interface CampaignTypeProps  {
    params: {
        id: string
    }
}