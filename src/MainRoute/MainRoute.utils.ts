const {
    Validator,
} = require("incognito-chain-web-js/build/web/wallet");

const measure = async (obj: any, fname: string, ...params: any): Promise<{ elapsed: number; result: any }> => {
    const startTime = performance.now();
    const result: any = await obj[fname].bind(obj)(...params);
    const elapsed: number = performance.now() - startTime;
    return { elapsed, result };
};

const createAndSendNativeToken = async ({
    accountSender,
    prvPayments,
    info,
    fee,
    metadata,
    isEncryptMessage = true,
    txType,
    txHandler,
    txHashHandler,
    version,
}: any = {}) => {
    try {
        new Validator("createAndSendNativeToken-account", accountSender).required();
        new Validator("createAndSendNativeToken-prvPayments", prvPayments).required().paymentInfoList();
        new Validator("createAndSendNativeToken-fee", fee).required().amount();
        new Validator("createAndSendNativeToken-info", info).string();
        new Validator("createAndSendNativeToken-isEncryptMessage", isEncryptMessage).boolean();
        new Validator("createAndSendNativeToken-metadata", metadata).object();
        new Validator("createAndSendNativeToken-txType", txType).required().number();
        new Validator("createAndSendNativeToken-version", version).required().number();
        // await accountWallet.resetProgressTx();
        const infoStr = typeof info !== "string" ? JSON.stringify(info) : info || "";
        const result = await accountSender.createAndSendNativeToken({
            transfer: {
                info: infoStr,
                prvPayments,
                fee,
            },
            extra: {
                metadata,
                isEncryptMessage,
                txType,
                txHandler,
                txHashHandler,
                version,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
}

 const createAndSendPrivacyToken = async ({
    accountSender,
    prvPayments,
    tokenPayments,
    info,
    fee,
    tokenID,
    metadata,
    isEncryptMessage = true,
    isEncryptMessageToken = true,
    txType,
    txHandler,
    txHashHandler,
    version,
}: any = {}) => {
    new Validator("createAndSendPrivacyToken-accountSender", accountSender).required();
    new Validator("createAndSendPrivacyToken-prvPayments", prvPayments).paymentInfoList();
    new Validator("createAndSendPrivacyToken-tokenPayments", tokenPayments).required().paymentInfoList();
    new Validator("createAndSendPrivacyToken-fee", fee).required().amount();
    new Validator("createAndSendPrivacyToken-info", info).string();
    new Validator("createAndSendPrivacyToken-tokenID", tokenID).string().required();
    new Validator("createAndSendPrivacyToken-metadata", metadata).object();
    new Validator("createAndSendPrivacyToken-isEncryptMessage", isEncryptMessage).boolean();
    new Validator("createAndSendPrivacyToken-isEncryptMessageToken", isEncryptMessageToken).boolean();
    new Validator("createAndSendPrivacyToken-txType", txType).required().number();
    new Validator("createAndSendPrivacyToken-version", version).required().number();

    let result;
    const infoStr = typeof info !== "string" ? JSON.stringify(info) : info;
    result = await accountSender.createAndSendPrivacyToken({
        transfer: {
            info: infoStr,
            prvPayments,
            tokenPayments,
            fee,
            tokenID,
        },
        extra: {
            metadata,
            isEncryptMessage,
            isEncryptMessageToken,
            txType,
            txHandler,
            txHashHandler,
            version,
        },
    });
    return result;
}

export { measure, createAndSendNativeToken, createAndSendPrivacyToken }