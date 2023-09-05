/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

// @ts-ignore
// import pemtools from 'pemtools';
import crypto from "crypto";
import Axios from "axios";
import { BadRequest } from "@feathersjs/errors";

const ALGO_MAP: any = { SHA512withRSA: "RSA-SHA512" };

interface profileType {
  payload: string;
  signature: string;
  signatureAlgorithm: string;
}

interface KEYDetails {
  keyType: string;
  key: string;
}

const fetchPublicKey = async () => {
  // const data: Array<object> = await Axios.get('https://api4.truecaller.com/v1/key')
  //     .then((res) => res.data)
  //     .catch((err) => {
  //         throw new BadRequest(err.message);
  //     });
  //
  // return data;
};
const loginWithTruecaller = async (profile: profileType) => {
  // const res = await fetchPublicKey();
  //
  // if (res.length < 1) {
  //     throw new BadRequest('Invalid response while fetching public key');
  // } else {
  //     const keyDetails: object = res[0];
  //
  //     const { key } = keyDetails as KEYDetails;
  //
  //     const keyStr: string = key;
  //     const keyBytes = Buffer.from(pemtools(Buffer.from(keyStr, 'base64'), 'PUBLIC KEY').pem);
  //     const payload = Buffer.from(profile.payload);
  //     const signature = Buffer.from(profile.signature, 'base64');
  //     const signatureAlgorithm = ALGO_MAP[profile.signatureAlgorithm];
  //     const verifier = crypto.createVerify(signatureAlgorithm);
  //     verifier.update(payload);
  //
  //     const signatureVerificationResult: boolean = verifier.verify(keyBytes, signature);
  //
  //     return signatureVerificationResult;
  // }
};

export default loginWithTruecaller;
