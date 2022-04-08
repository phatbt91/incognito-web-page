import StorageServices from "./StorageServices";
const {
  Wallet,
  Account,
  PDexV3,
} = require("incognito-chain-web-js/build/wallet");
const { default: Axios } = require("axios");

const TEST_NET = {
  fullNode: "https://testnet.incognito.org/fullnode",
  coinService: "https://api-coinservice-staging.incognito.org",
  pubsubService: "https://api-coinservice-staging.incognito.org/txservice",
  requestService: "https://api-coinservice-staging.incognito.org",
  apiService: "https://staging-api-service.incognito.org",
  portalService: "http://51.161.119.66:8020",
};

const MAIN_NET = {
  fullNode: "https://lb-fullnode.incognito.org/fullnode",
  coinService: "https://api-coinservice.incognito.org",
  pubsubService: "https://api-coinservice.incognito.org/txservice",
  requestService: "https://api-coinservice.incognito.org",
  apiService: "https://api-service.incognito.org",
  portalService: "https://api-portalv4.incognito.org",
};

const NEXT_OTA = {
  fullNode: "http://139.162.55.124:8334",
  coinService: "http://51.89.21.38:4095",
  pubsubService: "http://51.89.21.38:4096",
  requestService: "http://51.89.21.38:4095",
  apiService: "https://staging-api-service.incognito.org",
  portalService: "https://api-portalv4.incognito.org",
};

const SERVICE = NEXT_OTA;

const PRV_ID =
  "0000000000000000000000000000000000000000000000000000000000000004";
const ACCESS_ID =
  "0000000000000000000000000000000000000000000000000000000000000007";
const PRIVATE_KEY_STR =
  "112t8rnXdAqwz4XVnLqfcopFuQbof6n141BPKY1uHfwmyir324SNod9sWSFNXDBSNKXp26SXPhNdVFNyeeqiCs6Tc8yrcsVPaBWrk5auTrNP";
const DEVICE_ID = "9AE4B404-3E61-495D-835A-05CEE34BE251";
const PRIVACY_VERSION = 2;

async function setupWallet() {
  let wallet;
  let accountSender;
  let pDexV3Instance = new PDexV3();
  /**---> Init wallet <---*/
  // await init();
  wallet = new Wallet();
  let storage = new StorageServices();
  wallet = await wallet.init("password", storage, "Master", "Anon");
  /**---> Get accessToken <---*/
  const data = { DeviceID: DEVICE_ID };
  const authTokenDt = await Axios.post(
    `${SERVICE.apiService}/auth/new-token`,
    data
  );
  const authToken = authTokenDt.data.Result.Token;

  console.log("AccessToken: ", authToken);

  /**---> Config account <---*/
  accountSender = new Account(Wallet);
  accountSender.setRPCCoinServices(SERVICE.coinService);
  accountSender.setRPCClient(SERVICE.fullNode);
  accountSender.setRPCTxServices(SERVICE.pubsubService);
  accountSender.setRPCRequestServices(SERVICE.requestService);
  accountSender.setAuthToken(authToken);
  accountSender.setRPCApiServices(SERVICE.apiService, authToken);
  await accountSender.setKey(PRIVATE_KEY_STR);

  /**---> Config pdex3 instance <---*/
  pDexV3Instance.setAccount(accountSender);
  pDexV3Instance.setAuthToken(authToken);
  pDexV3Instance.setRPCTradeService(SERVICE.coinService);
  pDexV3Instance.setRPCClient(SERVICE.fullNode);
  pDexV3Instance.setStorageServices(localStorage);
  pDexV3Instance.setRPCApiServices(SERVICE.apiService);

  const balanceResult = await accountSender.getBalance({
    tokenID: "0000000000000000000000000000000000000000000000000000000000000004",
    version: 2,
  });

  console.log("balanceResult: ", balanceResult);

  return {
    wallet,
    accountSender,
    pDexV3Instance,
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setupWallet,
};
