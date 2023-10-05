import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x7b57446c44739FC36EB0c62570d7682f72E0eeDc"
);

export default instance;