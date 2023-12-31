import Web3 from "web3";

let web3;

// Проверяем наличие window перед использованием
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        // "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c",
        "https://goerli.infura.io/v3/8cbba53ed05940e2a557ee44f47f9212"
    );
    web3 = new Web3(provider);
}

export default web3;