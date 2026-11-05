# Turbine Week 1 Assignment

My solution for Turbine Week 1, covering SPL tokens, Metaplex MPL Core NFTs, metadata management, and account lifecycle operations on Solana.

## 📋 Tasks

1. **SPL Token:** Mint and transfer your own custom SPL token.
2. **NFT Minting:** Mint an NFT using MPL Core.
3. **Metadata Updates:** Update the NFT's name and metadata as the update authority.
4. **Transfer:** Transfer NFT ownership securely between wallets.
5. **Burn & Reclaim:** Permanently destroy the NFT and reclaim the rent fees.

---

## 🚀 How to Use

Follow these steps in order to execute the pipeline locally:

```bash
# 1. Install dependencies
npm install

# 2. Create local keys (Creator and Friend) and save them
npm run keys:create

# 3. Get the Creator Address to fund it with Devnet SOL faucet
npm run keys:getcreator

# 4. Initialize the token mint account and store the address
npm run spl:init

# 5. Add metadata to the token mint
npm run spl:metadata

# 6. Mint tokens to the Creator ATA
npm run spl:mint

# 7. Transfer tokens from Creator to Friend ATA
npm run spl:transfer

# 8. Store IPFS image asset using Umi
npm run nft:image

# 9. Create NFT metadata schema with Umi
npm run nft:metadata

# 10. Mint the NFT with Metaplex Umi
npm run nft:mint
