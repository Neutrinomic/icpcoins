import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import MD from '../components/MD';

export const AboutPage = () => {
  return (
    <Box maxW="1278" m="auto" pt="20" pb="20" className="mdp">
      <ReactMarkdown components={MD}>{article}</ReactMarkdown>
    </Box>
  );
};

const article = `
# About

Welcome to ICPcoins, the premier portal for intricate insights into the dynamic world of Internet Computer (IC) cryptocurrencies. Our platform is dedicated to demystifying the complexities of the IC ecosystem, providing users with real-time data, comprehensive charts, and critical statistics with a focus on digital assets that thrive on the Internet Computer blockchain.


The Internet Computer DeFi landscape is a tapestry woven by a myriad of entities, each contributing unique threads to the fabric. From wallet creators and decentralized exchange (DEX) architects to ledger specialists and the developers of versatile canisters and software, this ecosystem is a hotbed of innovation. In this constantly evolving environment, adaptability is key, and ICPCoins stands as a beacon of clarity amidst the rapid flux.


In the early days of our exploration, we navigated through a labyrinth of seven distinct fungible token standards, all vying for dominance. Over time, these were streamlined into a unified protocol, reflecting the ever-evolving nature of the blockchain. Similarly, the DEX landscape, abundant with valuable data, lacked uniformity—until now.


Our mission is to synthesize all pertinent information about ICP-based cryptocurrencies and serve it in an intuitive, user-friendly format. Our platform is a testament to our commitment to the community, ensuring accessibility to information despite the shifting grounds beneath us. We acknowledge the occasional turbulence—temporary inaccuracies or disruptions in data streams—as the growing pains of a revolutionary technology finding its footing.


Evolving with the landscape, we are thrilled to unveil the latest evolution of ICPcoins, now boasting a revolutionary 100% on-chain operation. Our platform gleans intelligence from every corner of the IC universe, including every major DEX such as Sonic, ICDex, and ICPSwap. We seamlessly integrate insights from each Service Nervous System (SNS) and the Network Nervous System (NNS) itself. Harnessing the IC's cutting-edge HTTP outcalls using the XRC, we orchestrate a symphony of tens of nodes that concurrently extract external pricing data for ICP, USD, BTC, ETH, XDR from an array of exchanges and APIs. This collective effort converges on a singular, reliable rate, ensuring that our users are equipped with the most accurate and up-to-date financial information.

We have developed an innovative system canister (smart contract) that amalgamates data from all decentralized exchanges (DEXes). This integration is designed to offer you a comprehensive dashboard that includes:

- Real-time and historical price charts
- Trading volume analytics
- Detailed market depth information
- Treasury metrics plotted against time
- Unlock schedules and time-based maps for token distribution
- Market depth visualization over time
- Supply dynamics over time, highlighting the actual circulating supply excluding locked tokens
- Standard measures of circulating supply adhering to industry benchmarks

Each dataset is meticulously stored in time series databases, ensuring you have access to temporal trends and patterns. The canister executes ~2,815,200 cross-canister calls monthly as part of its routine operations to gather this data.

Furthermore, we underscore the reliability and security of the data provided. Every piece of data transmitted to your client is authenticated, having been signed by the Internet Computer blockchain. This level of verification guarantees the integrity and trustworthiness of the information you rely on for your strategic decision-making.

`;
