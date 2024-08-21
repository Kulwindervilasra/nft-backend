import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.PINATA_GATEWAY,
});


export const uploadToIPFS = async (file: Buffer, fileName: string, type: string) => {


    try {
        const fileInfo = new File([file], fileName, { type });
        const upload = await pinata.upload.file(fileInfo);
        console.log(upload);

        return upload
    } catch (error) {
        console.error('Error uploading file to IPFS:', (error as Error)?.message);
        throw error;
    }
};

export const uploadJSONToIPFS = async (json: object) => {

    try {
        const response = await pinata.upload.json(json)

        return response;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', (error as Error).message);
        throw error;
    }
};
