const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("doja");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of adedojas lol
      let txn = await domainContract.register("adedoja",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain adedoja.doja");
  
    txn = await domainContract.setRecord("adedoja", "iadefidipe@gmail.com", "wagmidev.dev", "solidty is my playground", "GM");
    await txn.wait();
    console.log("Set record for adedoja.doja");
  
    const address = await domainContract.getAddress("adedoja");
    console.log("Owner of domain adedoja:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();