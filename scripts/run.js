const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy('doja'); // mines and deploy or contract on the local hardhat network
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address); // contract address
    console.log("Contract deployed by:", owner.address);
    
    let txn = await domainContract.register("bxnx", {value: hre.ethers.utils.parseEther('0.5')});
    await txn.wait();
  
    const domainOwner = await domainContract.getAddress("bxnx");
    console.log("Owner of domain:", domainOwner);

    txn = await domainContract.setRecord("bxnx", "iadefidipe@gmail.com", "wagmidev.dev", "solidty is my playground", "GM");
    await txn.wait();

    const domainRecords = await domainContract.getRecord("bxnx")
    console.log("Domain Record:", domainRecords);

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