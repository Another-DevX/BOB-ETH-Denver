import { JsDLCInterface } from 'dlc-wasm-wallet'

type JsDLCInterface = (
  userPrivateKey: , // The user's private key.
  userAddress: string, // The user's address.
  bitcoinNetwork: string, // The Bitcoin network.
  bitcoinNetworkAPI: string, // The Bitcoin network API endpoint.
  attestorURLs: string // An array of attestor API endpoints (string[]), which has been converted into a JSON string.
) => void
