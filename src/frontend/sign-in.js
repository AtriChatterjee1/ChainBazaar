import { ethers } from "ethers";
import { lensClient } from "@/utils/lensClient";
import { isRelayerResult } from "@lens-protocol/client";
import { LensClient, development } from "@lens-protocol/client";

// Function to get the signer from the Web3Provider
const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    // Request user accounts
    await provider.send("eth_requestAccounts", []);
    // Get the signer object
    const signer = provider.getSigner();
    return signer;
};
// Function to sign in with Lens using the provided address
export const signInWithLens = async (address: any) => {
    // Generate a challenge for authentication
    const challenge = await lensClient.authentication.generateChallenge(
        address
    );
    // Get the signer object
    const signer = await getSigner();
    // Sign the challenge message
    const signature = await signer.signMessage(challenge);
    // Authenticate with Lens using the address and signature
    await lensClient.authentication.authenticate(address, signature);
};
// Function to create a profile with the provided username
export const createProfile = async (userName: any) => {
    // Create a profile with the given username
    const profileCreateResult = await lensClient.profile.create({
        handle: userName,
    });
    // Log the result and show an alert indicating successful profile creation
    console.log("profileCreateResult", profileCreateResult);
    alert("Profile Created");
};
// Function to fetch a profile by handle
// export const getProfile = async (handle: any) => {
//     // Log the handle
//     console.log("handle", handle);
//     // Fetch the profile using the handle
//     const profileByHandle = await lensClient.profile.fetch({
//         handle: `${handle}.test`,
//     });
//     // Log the fetched profile and return the profile ID
//     console.log("profileByHandle", profileByHandle);
//     return profileByHandle?.id;
// };
// Function to create metadata for a profile
export const createMetaData = async (createProfileMetadataRequest: any) => {
    // Create typed data for setting profile metadata
    const typedDataResult =
        await lensClient.profile.createSetProfileMetadataTypedData(
            createProfileMetadataRequest
        );
    // Log the result of typed data creation
    console.log("relayerResult", typedDataResult);
    // Unwrap the profile data from the result
    const profileData = typedDataResult.unwrap();
    // Get the signer object
    const signer = await getSigner();
    // Sign the typed data using the signer
    const signedTypedData = await signer._signTypedData(
        profileData.typedData.domain,
        profileData.typedData.types,
        profileData.typedData.value
    );
    // Broadcast the signed typed data as a transaction
    const broadcastResult = await lensClient.transaction.broadcast({
        id: profileData.id,
        signature: signedTypedData,
    });
    // Unwrap the value from the broadcast result
    const broadcastResultValue = broadcastResult.unwrap();
    // Check if the broadcast result is a relayer result
    if (!isRelayerResult(broadcastResultValue)) {
        console.log(`Something went wrong`, broadcastResultValue);
        return;
    }
    // Log the successful broadcast of the transaction
    console.log(
        `Transaction was successfully broadcasted with txId ${broadcastResultValue.txId}`
    );
};
// Function to delete a profile with the provided profile ID
// export const deleteProfile = async (profileId: any) => {
//     // Create typed data for burning a profile
//     const burnProfileTypedDataResult = await lensClient.profile.createBurnProfileTypedData({
//         profileId,
//     });
//     // Log the result of typed data creation for profile deletion
//     console.log("burnProfileTypedDataResult", burnProfileTypedDataResult);
// };