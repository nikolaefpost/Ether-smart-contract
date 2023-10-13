

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

export interface requestI {
    id: number;
    description: string;
    amount: number;
    recipient: string;
    approvalCount: string;
    approve?: number;
    finalize?: boolean;
    address: string;
}

export interface headerRequestI {
    id: string;
    description: string;
    amount: string;
    recipient: string;
    approvalCount: string;
    approve: string;
    finalize: string;
}

export interface CampaignTypeProps  {
    params: {
        id: string
    }
}