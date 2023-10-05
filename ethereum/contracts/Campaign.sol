pragma solidity ^0.8.18;

contract CampaignFactory {
    address [] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaignAddress = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaignAddress);
    }

    function getDeployedCampaign() public view returns (address[] memory)   {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restricted(){
        require(msg.sender == manager, "Only the manager can make the request");
        _;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {

        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[payable(msg.sender)]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address)  {
        return (
        minimumContribution,
        address(this).balance,
        requests.length,
        approversCount,
        manager
        );
    }

    function getRequestCount() public view returns (uint)  {
        return requests.length;
    }
}