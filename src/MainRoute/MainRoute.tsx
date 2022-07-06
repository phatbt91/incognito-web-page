import React from "react";
import {Button} from "@mui/material";
const { wasm, PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

const FULL_NODE = "https://api-coinservice-staging.incognito.org"

const TESTNET_TOKENS: string[] = [
    "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854",
    "4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82",
    "9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d",
    "c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4",
];

const MainRoute = React.memo(() => {
    const [status, setStatus] = React.useState<{
        scanning: boolean,
        scanned: boolean
    }>({ scanning: false, scanned: false })

    // Scan Coins

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained">
                TEST CREATE WALLET
            </Button>
            <Button variant="contained" style={{ marginTop: 24 }}>
                TEST CREATE ACCOUNT
            </Button>
            <Button variant="contained" style={{ marginTop: 24 }}>
                TEST GET BALANCE
            </Button>
        </div>
    )
})

export default MainRoute