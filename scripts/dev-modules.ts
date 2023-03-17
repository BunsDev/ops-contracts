import { ethers } from "hardhat";
import { Module } from "../test/utils";
import {
  Automate,
  ProxyModule,
  ResolverModule,
  SingleExecModule,
  TimeModule,
} from "../typechain";

export const setModules = async () => {
  const [owner] = await ethers.getSigners();
  const ownerAddress = await owner.getAddress();
  console.log("Owner: ", ownerAddress);

  const automateAddress = (<Automate>await ethers.getContract("Automate"))
    .address;
  const automate = await ethers.getContractAt("Automate", automateAddress);

  const resolverModule = <ResolverModule>(
    await ethers.getContract("ResolverModule")
  );
  const timeModule = <TimeModule>await ethers.getContract("TimeModule");
  const proxyModule = <ProxyModule>await ethers.getContract("ProxyModule");
  const singleExecModule = <SingleExecModule>(
    await ethers.getContract("SingleExecModule")
  );

  const modules = [
    Module.RESOLVER,
    Module.TIME,
    Module.PROXY,
    Module.SINGLE_EXEC,
  ];
  const moduleAddresses = [
    resolverModule.address,
    timeModule.address,
    proxyModule.address,
    singleExecModule.address,
  ];

  await automate.setModule(modules, moduleAddresses);
};

setModules();
