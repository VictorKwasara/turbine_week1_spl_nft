import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "../../keys/creator.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);


const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);


umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

(async () => {
  try {
    //change the image uri to your image uri obtained from nft_image.ts
    const image = "https://gateway.irys.xyz/J4j5dy9FaqWRwMB3kp4GgqnswqE2kWSiixkg6d7XpoYw"


    //json scheme : https://www.metaplex.com/docs/smart-contracts/core/json-schema
    //change the metadata
    const metadata = {
      name: "VictorKwasara",
      description: "VTK",
      symbol: "VTK",
      sellerFeeBasisPoints: 1,
      image,
      attributes: [{ trait_type: "Rarity", value: "Legendary" }],

      properties: {
        files: [
          {
            type: "image/jpeg",
            uri: image,
          }
        ],
      }

    }
    const myUri = await umi.uploader.uploadJson(metadata)
    console.log(`metadata uri: ${myUri} `);
  } catch (error) {
    console.log("error", error);
  }
})();
