import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58";
import getKey from "./getKey.ts";

//paste your mint address got from spl_init.ts
const mintKey = await getKey("mint.json")

const mint = publicKey(mintKey.address);

const umi = createUmi("https://api.devnet.solana.com");

// const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const keypair = await getKey("creator.json")
const signer = createSignerFromKeypair(umi, keypair.keyPair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };

    //change the metadata
    const data: DataV2Args = {
      name: "VictorTKwasara",
      symbol: "VTK",
      uri: "",
      sellerFeeBasisPoints: 1,
      creators: null,
      collection: null,
      uses: null,
    }

    const args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    const tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    const result = await tx.sendAndConfirm(umi);
    console.log("signature: ", bs58.encode(Buffer.from(result.signature)));
  } catch (error) {
    console.log("error", error);
  }
})();

