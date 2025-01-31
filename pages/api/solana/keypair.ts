import type {NextApiRequest, NextApiResponse} from 'next';
import {Keypair} from '@solana/web3.js';

type ResponseT = {
  secret: string;
  address: string;
};
export default function keypair(
  _req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>,
) {
  try {
    const keypair = new Keypair();
    const address = keypair.publicKey.toBase58();
    const secret = JSON.stringify(Array.from(keypair.secretKey));
    res.status(200).json({
      secret,
      address,
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
