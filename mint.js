const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace later with real contract
const OWNER_WALLET = "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF";
const PRICE = "0.0012"; // ETH ~ $2

let provider, signer;

document.getElementById("connect").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    document.getElementById("connect").innerText = "Wallet Connected ✅";
    document.getElementById("mint").disabled = false;
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById("mint").addEventListener("click", async () => {
  try {
    const tx = await signer.sendTransaction({
      to: OWNER_WALLET,
      value: ethers.parseEther(PRICE),
    });
    alert("✅ Mint successful! TX: " + tx.hash);
  } catch (err) {
    alert("❌ Mint failed: " + err.message);
  }
});
