import React from "react";
import {Button} from "@mui/material";
import {FULL_NODE, TESTNET_TOKENS} from "./MainRoute.constants";
import {measure} from "./MainRoute.utils";
const {newMnemonic, PrivacyVersion, Account, Wallet} = require("incognito-chain-web-js/build/web/wallet");

const MainRoute = React.memo(() => {
    const [status, setStatus] = React.useState<{
        scanning: boolean,
        scanned: boolean
    }>({ scanning: false, scanned: false })

    const getAccount = async () => {
        let accountSender = new Account({});
        accountSender.setRPCClient(FULL_NODE);
        accountSender.setStorageServices(localStorage);
        await accountSender.setKey('112t8rnXnr1knsAk4Lr3UbmtsiDRu6Hv3csgj5VMpazVARHXCEWVxDXfHH91We72JdddjcBMnWKWY5hBgx9B9Gi3akiToWEsdpa7gG5La7ZU');
        return accountSender;
    }

    // Scan Coins
    const handleScanCoins = async () => {
        try {
            const accountSender = await getAccount()

            // Scanned coins storage before, first time scan coins will be null
            const coinsStore = await accountSender.getStorageCoinsScan();
            console.log('SCAN COINS STEP 1: ', coinsStore, TESTNET_TOKENS)

            // start scan coins
            const { elapsed, result } = await measure(accountSender, "scanCoins", {
                tokenList: TESTNET_TOKENS,
            });
            console.log('SCAN COINS STEP 2: ', { elapsed, ...result })
        } catch (error) {
            console.log('SCAN COINS ERROR: ', error)
        }
    };

    // AFTER SCAN COINS SUCCESS, GET BALANCE
    const handleLoadBalance = async () => {
        try {
            const accountSender = await getAccount()
            // Get balance list tokens
            const { balance } = await accountSender.getFollowTokensBalance({
                defaultTokens: TESTNET_TOKENS,
                version: PrivacyVersion.ver3,
            });

            // Get balance 1 token
            const tokenID = TESTNET_TOKENS[0];
            const amount = await accountSender.getBalance({
                tokenID: tokenID,
                version: PrivacyVersion.ver3,
            })
            console.log('BALANCE: ', { tokens: balance, amount: { tokenID, amount } })
        } catch (error) {
            console.log('LOAD BALANCE ERROR: ', error)
        }
    }

    // Handle import wallet
    const handleCreateNewWallet = async () => {
        // try {
        //     const mnemonic: string = newMnemonic() || "";
        //     if (!mnemonic) return
        //     /** aesKey is the key to encrypt and descrypt the wallet */
        //     const aesKey = "1234"
        //     // const { aesKey } = await getPassphrase()
        //     const WALLET_NAME = 'MATTERHORN';
        //     let wallet = new Wallet();
        //     wallet.RootName = WALLET_NAME;
        //     wallet.RpcClient = FULL_NODE;
        //     wallet.Storage = localStorage; // Extension storage, support store end read data
        //     wallet.UseLegacyEncoding = true;
        //     const FIRST_ACCOUNT_NAME = "Anon"
        //     await wallet.import(mnemonic, aesKey, FIRST_ACCOUNT_NAME, localStorage);
        //     wallet.save()
        //     console.log('CREAT WALLET SUCCESS: ', mnemonic)
        // } catch (error) {
        //     console.log('CREATE WALLET ERROR: ', error)
        // }
    }

    // Handle import wallet
    const handleLoadWallet = async () => {
        // try {
        //     let values = [],
        //         keys = Object.keys(localStorage),
        //         i = keys.length;
        //     while ( i-- ) {
        //         values.push( localStorage.getItem(keys[i]) );
        //     }
        //     console.log(values)
        //     const DEFAULT_ACCOUNT_NAME = `testnet_$DEFAULT_ACCOUNT_NAME`;
        //     const mnemonic = 'lake element lock cycle youth wild milk street impact zone play elite'
        //     const aesKey = "12345";
        //     const masterKeyListEncryped = await localStorage.getItem("$master_key_list");
        //     // const masterKeyListDecryped = await algorithms.decryptData(masterKeyListEncryped, aesKey);
        //     // const masterKeyList: MasterKeyList[] = JSON.parse(masterKeyListDecryped);
        //     // return masterKeyList;
        //     console.log('HANDLE LOAD WALLET SUCCESS: ')
        // } catch (error) {
        //     console.log('IMPORT WALLET ERROR: ', error)
        // }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" onClick={handleScanCoins}>
                TEST SCAN COINS
            </Button>
            {/*<Button variant="contained"  style={{ marginTop: 24 }} onClick={handleCreateNewWallet}>*/}
            {/*    TEST CREATE WALLET*/}
            {/*</Button>*/}
            {/*<Button variant="contained" style={{ marginTop: 24 }} onClick={handleCreateNewWallet}>*/}
            {/*    TEST IMPORT WALLET TODO*/}
            {/*</Button>*/}
            {/*<Button variant="contained"  style={{ marginTop: 24 }} onClick={handleLoadWallet}>*/}
            {/*    LOAD WALLET TODO*/}
            {/*</Button>*/}
            {/*<Button variant="contained" style={{ marginTop: 24 }}>*/}
            {/*    TEST CREATE ACCOUNT TODO*/}
            {/*</Button>*/}
            <Button variant="contained" style={{ marginTop: 24 }} onClick={handleLoadBalance}>
                TEST GET BALANCE
            </Button>
        </div>
    )
})

export default MainRoute