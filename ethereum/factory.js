import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0xB57E0AA13116408538756132B5D2D51898810C26"
);

export default instance;