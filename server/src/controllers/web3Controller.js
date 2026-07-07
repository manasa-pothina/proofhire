// PLACEHOLDER — real signature verification not yet implemented.
// When ready, install ethers.js on the server (`npm install ethers`) and use
// ethers.verifyMessage(message, signature) to recover the signing address,
// then compare it against walletAddress.
//
// Typical flow this stub is standing in for:
// 1. Client asks server for a nonce/message to sign
// 2. Client signs it with MetaMask (personal_sign)
// 3. Client sends { walletAddress, signature, message } here
// 4. Server recovers the address from the signature and confirms it matches
//    walletAddress, proving the user controls that wallet

// @route POST /api/web3/verify
// body: { walletAddress: string, signature: string, message: string }
async function verifySignature(req, res, next) {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({
        message: 'walletAddress, signature, and message are all required',
      });
    }

    // TODO: replace with real verification using ethers.js
    // const recoveredAddress = ethers.verifyMessage(message, signature);
    // const verified = recoveredAddress.toLowerCase() === walletAddress.toLowerCase();

    const verified = false; // stub — always false until real logic is added

    res.json({
      verified,
      note: 'This is a stub response. Real signature verification is not yet implemented.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { verifySignature };
