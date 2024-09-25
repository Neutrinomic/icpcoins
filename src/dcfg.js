export const dcfg = {
  sonic: {
    name: 'Sonic',
    url: 'https://app.sonic.ooo/swap',
  },
  icdex: {
    name: 'ICDex',
    url: 'https://iclight.io/ICDex',
  },
  icpswap: {
    name: 'ICPSwap',
    url: 'https://app.icpswap.com/swap',
    tip: 'ICPSwap depth is estimated',
  },
  xrc: {
    name: 'Exchange Rate Canister',
    url: 'https://wiki.internetcomputer.org/wiki/Exchange_rate_canister',
    tip: "XRC doesn't provide volume & circulating supply, they are coming from another oracle",
  },
  oracle: {
    name: 'ICPCoins Oracle',
    url: false,
  },
};

export const tokensCfg = {
  DKP: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/zxeu2-7aaaa-aaaaq-aaafa-cai',
      Discord: 'https://discord.gg/dragginz',
      Github: 'https://github.com/dragginzgame',
      Learn: 'https://dragginz.io',
      OpenChat: 'https://oc.app/community/24t4l-hyaaa-aaaar-ar2rq-cai/?ref=vhrev-7iaaa-aaaaf-ad56q-cai ',
      Roadmap: 'https://dragginz.io',
      Website: 'https://dragginz.io',
      Whitepaper: 'https://dragginz.io',
      X: 'https://x.com/dragginzgame',
      YouTube: 'https://www.youtube.com/@dragginzgame',
    },
    article: `
# What is Dragginz?

Dragginz is a 3D MMORPG set on a strange planet full of weird, wonderful and sometimes terrifying creatures. Play the game your way! Hatch and raise Dragginz to accompany you on your adventures. Harness the planet's latent magic as you explore, battle and learn key skills. Alchemy, Gardening and Cooking are just a few such skills, each of which can be enjoyed casually or as a way of life.

    `,
  },
  ETH: {
    links: {
      Dashboard: 'https://etherscan.io/',
      Discord: 'https://discord.com/invite/ethereum-org',
      Github: 'https://github.com/ethereum',
      Learn: 'https://ethereum.org/en/learn/',
      Roadmap: 'https://ethereum.org/en/roadmap/',
      Website: 'https://ethereum.org',
      Whitepaper: 'https://ethereum.org/en/whitepaper/',
      X: 'https://x.com/ethereum',
      YouTube: 'https://www.youtube.com/@EthereumProtocol',
    },
    article: `
# About

Ethereum is revolutionizing the digital landscape with its decentralized network and smart contract capabilities
    `,
  },
  BTC: {
    links: {
      Dashboard: 'https://blockstream.info/',
      Github: 'https://github.com/bitcoin',
      Learn: 'https://bitcoin.org/en/how-it-works',
      Website: 'https://bitcoin.org',
      Whitepaper: 'https://bitcoin.org/bitcoin.pdf',
      X: 'https://x.com/Bitcoin',
    },
    article: `
# What Is Bitcoin?

Bitcoin (BTC) is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, thus removing the need for third-party involvement in financial transactions. It is rewarded to blockchain miners for the work done to verify transactions and can be purchased on several exchanges.

Bitcoin was introduced to the public in 2009 by an anonymous developer or group of developers using the name Satoshi Nakamoto.

It has since become the most well-known cryptocurrency in the world. Its popularity has inspired the development of many other cryptocurrencies. These competitors either attempt to replace it as a payment system or are used as utility or security tokens in other blockchains and emerging financial technologies.
    `,
  },
  ICP: {
    links: {
      dApp: 'https://NNS.ic0.app',
      Dashboard: 'https://dashboard.internetcomputer.org/',
      DFINITY: 'https://dfinity.org/',
      Discord: 'https://discord.gg/WHewyHyqUW',
      Github: 'https://github.com/dfinity',
      ICA: 'https://association.internetcomputer.org/',
      Learn: 'https://internetcomputer.org/docs/current/home',
      NNS: 'https://nns.ic0.app/',
      Roadmap: 'https://internetcomputer.org/roadmap',
      Website: 'https://internetcomputer.org/',
      Whitepaper: 'https://internetcomputer.org/whitepaper.pdf',
      X: 'https://x.com/dfinity',
      YouTube: 'https://www.youtube.com/@DFINITY',
    },
    article: `
# What is the Internet Computer?

The Internet Computer (IC) is the only general-purpose blockchain that runs decentralized apps at web speed.

It is the World Computer that can replace traditional IT and enable a new generation of Web3 apps and services running entirely on-chain.

# The Architecture of the IC

The Internet Computer Protocol runs on servers with standardized hardware, which we call nodes. Nodes are distributed globally and hosted in independent data centers to ensure fault tolerance and decentralization. Nodes are grouped together into subnets, where each subnet constitutes its own blockchain that makes progress independently of the other subnets, resulting in unprecedented performance and scalability in the blockchain space. All subnets are connected and orchestrated by the Internet Computer Protocol to give rise to the Internet Computer.

The IC improves and evolves at a rapid pace through regular and seamless roll-outs of software updates that boost performance, iron out bugs, and introduce entirely new capabilities. Continuous hardware upgrades, adding nodes or subnets, make the IC scale virtually without bounds — scaling the IC is always possible by adding additional nodes.

# The Network Nervous System governs the IC

The Network Nervous System (NNS) is the decentralized source of truth regarding the whole IC structure, storing information about all nodes and their allocation to subnets. The NNS holds the ICP ledger, which tracks the accounts and transactions of the ICP utility token. Token holders can stake ICP tokens and thereby participate in voting about every aspect of the IC, putting ICP stakers in full control (learn more about staking, voting, and rewards here). It also powers computation on the IC by converting ICP tokens to cycles, which are consumed when running decentralized apps. The NNS is the world’s most advanced decentralized autonomous organization (DAO).

    `,
  },
  XTC: {
    links: {
      dApp: 'https://dank.ooo/',
      Dashboard: 'https://dank.ooo/',
      Discord: '',
      Github: '',
      Learn: 'https://docs.dank.ooo/xtc/overview/',
      Roadmap: 'https://docs.dank.ooo/xtc/overview/',
      Website: 'https://dank.ooo/xtc/',
      Whitepaper: 'https://dank.ooo/xtc/',
      X: 'https://x.com/dank_ois',
    },
    article: `
  # What are Cycles?

Cycles act as the computational resource to execute actions on the Internet Computer blockchain. In general, all canister smart contracts consume resources in the form of CPU cycles for execution, bandwidth for routing messages, and memory for persisted data. Canisters maintain an account balance to pay for the cost of communication, computation, and the storage consumed by their applications. The cost of computation is expressed in units of cycles.

Cycles reflect the real costs of operations, including resources such physical hardware, rack space, energy, storage devices, and bandwidth. In simple terms, a cycle unit represents the cost of executing a single WebAssembly instruction. Cycles are not a currency; they cannot be converted back to value in the form of Internet Computer Protocol tokens, but can be transferred between canisters to enable canisters to pay for operations. The ICP to cycles conversion rate is determined through an NNS proposal that repeatedly refreshes throughout the day.

# Cycles Token (XTC)

The Cycles Token (XTC) is a cycles ledger canister that provides users with a “wrapped/tokenized” version of cycles (XTC)

Each Cycles Token (XTC) is backed 1-to-1 with 1 Trillion Cycles (1 XTC = 1 Trillion Cycles), with cycles locked in the canister. Through the XTC canister users & developers can call/perform any traditional trade cycle actions (send, deposit, withdraw, etc.), as well as proxy canister calls funded by cycles in their XTC balance (create canister, proxy calls to canister methods, topping up cycles in calls).
`,
  },
  OGY: {
    links: {
      Dashboard: 'https://dashboard.origyn.com/',
      Github: 'https://github.com/ORIGYN-SA',
      Learn: 'https://origyn.gitbook.io/origyn/tokenomics/tokenomics-faq',
      Roadmap: 'https://www.origyn.com/roadmap',
      Website: 'https://www.origyn.com/',
      Whitepaper: 'https://dashboard.origyn.com/Tokenomics_V3.pdf',
      X: 'https://x.com/origyntech',
    },
    article: `
# About ORIGYN Foundation

At ORIGYN Foundation, we combine intelligent technologies and decentralized computing to identify, authenticate and unlock the powers of ownership for the world’s most valuable objects.

ORIGYN brings NFTs to life with biometric data and unique ownership experiences to power brands, creators, artists, marketplaces, consumers and industries with guaranteed certificates of authenticity.
    `,
  },
  ckBTC: {
    links: {
      dApp: 'https://nns.ic0.app/wallet/?u=mxzaz-hqaaa-aaaar-qaada-cai',
      Dashboard: 'https://dashboard.internetcomputer.org/bitcoin',
      Github: 'https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc/minter',
      Learn: 'https://internetcomputer.org/ckbtc',
      Roadmap: 'https://internetcomputer.org/ckbtc',
      Website: 'https://internetcomputer.org/ckbtc',
      Whitepaper: 'https://internetcomputer.org/bitcoin-integration',
      X: '',
    },
    article: `
# About 

Chain-key Bitcoin (ckBTC) is an ICRC-2-compliant token that is backed 1:1 by bitcoins held 100% on the IC mainnet.
Canister is governed by the NNS
`,
  },
  CHAT: {
    links: {
      dApp: 'https://oc.app',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/3e3x2-xyaaa-aaaaq-aaalq-cai',
      Github: 'https://github.com/open-chat-labs/open-chat',
      Learn: 'https://oc.app/blog',
      Roadmap: 'https://oc.app/roadmap',
      Website: 'https://oc.app/',
      Whitepaper: 'https://oc.app/whitepaper',
      X: 'https://x.com/OpenChat',
    },
    article: `
# What is OpenChat?

OpenChat is a fully featured chat application running on the Internet Computer blockchain similar to WhatsApp, Signal and Telegram, and will soon be getting a major new capability called “communities” which are like Slack workspaces or Discord servers.

It is a responsive, progressive web application (PWA) and as such scales to take advantage of any screen size and integrates with devices in a similar way to native apps, with notifications on desktop and Android devices, and on iOS from next year.

The app is open source  and runs as a collection of canister smart-contracts. It is possible to see the code running on any canister at any time with a link back to the particular version in source control and to independently verify this is true.
    `,
  },
  KINIC: {
    links: {
      dApp: 'https://kinic.io',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/7jkta-eyaaa-aaaaq-aaarq-cai',
      Github: 'https://github.com/kinicdao',
      Learn: 'https://xcvai-qiaaa-aaaak-afowq-cai.icp0.io/',
      Roadmap: 'https://74iy7-xqaaa-aaaaf-qagra-cai.icp0.io/whitepaper',
      Website: 'https://kinic.io',
      Whitepaper: 'https://74iy7-xqaaa-aaaaf-qagra-cai.icp0.io/whitepaper',
      X: 'https://twitter.com/kinic_app',
    },
    article: `
# What is Kinic?

Kinic is a search engine for web3 content that runs on blockchain.

Kinic the answer to Google and other search engines that are operated by a centralized entity, undermine data privacy, favor established players, and ignore the emerging world of web3 content.

Currently, Kinic allows you to search all frontend canisters on the Internet Computer blockchain. Kinic’s roadmap includes adding content hosted on other blockchains and decentralized storage networks. Kinic’s SEO module will involve unprecedented transparency backed by zero-knowledge machine learning (ZKML) technology. All users will be able to trust that they are getting the best results as determined by Kinic’s algorithms, and are not being served ad based content other than which is clearly transparent.
    `,
  },
  HOT: {
    links: {
      dApp: 'https://yral.com',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/67bll-riaaa-aaaaq-aaauq-cai',
      Github: 'https://github.com/go-bazzinga',
      Learn: 'https://x.com/Yral_app',
      Roadmap: 'https://yral.com',
      Website: 'https://yral.com',
      Whitepaper: 'https://dashboard.internetcomputer.org/sns/67bll-riaaa-aaaaq-aaauq-cai',
      X: 'https://x.com/Yral_app',
    },
    article: `
# What is Hot or Not?

Hot or Not is Web3's answer to TikTok. It is a short-video social media platform that integrates gamification for short video content.

Hot or Not combines the best of social media, gamification, and decentralization to revolutionize the short-video social media ecosystem.
    `,
  },
  GHOST: {
    links: {
      dApp: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.icp0.io/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/4m6il-zqaaa-aaaaq-aaa2a-cai',
      Github: '',
      Learn: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.icp0.io/',
      Roadmap: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.icp0.io/',
      Website: 'https://icghost.org',
      Whitepaper: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.icp0.io/',
      X: 'https://x.com/ghost_icp',
    },
    article: `
# What is Ghost?

The First Decentralized Meme Coin on ICP
`,
  },
  DCD: {
    links: {
      dApp: 'https://2zge7-4qaaa-aaaao-a3plq-cai.icp0.io',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/x4kx5-ziaaa-aaaaq-aabeq-cai',
      Github: '',
      Learn: 'https://decideai.xyz/',
      Roadmap: 'https://decideai.xyz/',
      Website: 'https://decideai.xyz/',
      Whitepaper: 'https://decideai.gitbook.io/decideai-whitepaper',
      X: 'https://x.com/DecideAI_',
    },
    article: `
# About 

Decide AI: Creating LLMs that benefit users, contributors, and developers.
    `,
  },
  CTZ: {
    links: {
      dApp: 'https://catalyze.one/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/uly3p-iqaaa-aaaaq-aabma-cai',
      Discord: 'https://dashboard.internetcomputer.org/sns/uly3p-iqaaa-aaaaq-aabma-cai',
      Github: 'https://github.com/Catalyze-Software',
      Learn: 'https://chat.catalyze.one/',
      Roadmap: 'https://chat.catalyze.one/',
      Website: 'https://chat.catalyze.one/',
      Whitepaper: 'https://chat.catalyze.one/whitepaper',
      X: 'https://x.com/catalyze_one',
    },
    article: `
# About

Catalyze is a social application that aims to provide a community organization & management tool, alternative to popular Web2 chat-based applications such as Discord or Slack.
    `,
  },
  BOOM: {
    links: {
      dApp: 'https://u52bf-3qaaa-aaaal-qb5wq-cai.icp0.io/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/xjngq-yaaaa-aaaaq-aabha-cai',
      Discord: '',
      Github: 'https://github.com/BoomDAO',
      Learn: 'https://docs.boomdao.xyz/',
      Roadmap: 'https://u52bf-3qaaa-aaaal-qb5wq-cai.icp0.io/',
      Website: 'https://boomdao.xyz/',
      Whitepaper: 'https://boomdao.notion.site/BOOM-DAO-WHITEPAPER-59bc2aa3380b4f86b01344da42157a24',
      X: 'https://x.com/boomdaosns',
    },
    article: `
# About 

BOOM DAO is a DAO focused on providing gaming tooling infrastructure & funding game development.
    `,
  },
  ICX: {
    links: {
      dApp: 'https://icx.one/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/u67kc-jyaaa-aaaaq-aabpq-cai',
      Github: 'https://github.com/SeersSocial/',
      Learn: 'https://icx.one/',
      Roadmap: 'https://icx.one/',
      Website: 'https://icx.one/',
      Whitepaper: 'https://icx.one/',
      X: 'https://x.com/icxdao',
    },
    article: `
# About 

ICX is a decentralized application (dApp) that combines the familiar look and feel of Twitter with cryptocurrency features, enabling users to engage in decentralized social media interactions while seamlessly integrating functionalities such as tipping, prediction markets, NFT sharing, and DAO creation.
    `,
  },
  BOX: {
    links: {
      dApp: 'https://rzsua-biaaa-aaaap-qbkea-cai.icp0.io/',
      Discord: 'https://discord.com/invite/UAPCRB7VYw',
      Learn: 'https://linktr.ee/boxydude',
      Website: 'https://cgnqv-iaaaa-aaaap-qb5uq-cai.icp0.io/',
      X: 'https://x.com/B0XYDUDE',
    },
    article: `
# About

Boxy is an NFT Project on ICP
    `,
  },
  NUA: {
    links: {
      dApp: 'https://nuance.xyz/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/rzbmc-yiaaa-aaaaq-aabsq-cai',
      Github: 'https://github.com/Aikindapps/Nuance',
      Learn: 'https://aikin.gitbook.io/nuance/',
      Roadmap: 'https://wiki.nuance.xyz/nuance/nuance-roadmap',
      Website: 'https://nuance.xyz/',
      Whitepaper: 'https://nuance.xyz/publication/nuance/white-paper',
      X: 'https://x.com/nuancedapp',
    },
    article: `
# About

Nuance is an entirely on-chain publishing platform. It applies the benefits of Web 3: Anonymity, self-sovereignty, censorship resistance, community governance & tokenization to a Medium-style content hosting platform.
`,
  },
  SONIC: {
    links: {
      dApp: 'https://app.sonic.ooo/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/qtooy-2yaaa-aaaaq-aabvq-cai',
      Discord: 'https://discord.com/invite/EkmnRd99h6',
      Github: 'https://github.com/sonicdex',
      Learn: 'https://sonic-ooo.medium.com/',
      Roadmap: 'https://www.sonic.ooo/',
      Website: 'https://www.sonic.ooo/',
      Whitepaper: 'https://sonicdex.gitbook.io/sonic-whitepaper',
      X: 'https://x.com/sonic_ooo',
    },
    article: `
# About 

In the rapidly evolving digital asset landscape, the decentralized trading platform Sonic emerges as a beacon of innovation. Powered by blockchain technology, Sonic addresses the critical need for transparent, unrestricted, and equitable asset ownership and transfer across open networks, devoid of reliance on external entities. Unlike traditional financial infrastructures, Sonic heralds a new era of financial interactions on a global scale, fostering a thriving ecosystem of digital assets.
    `,
  },
  SNEED: {
    links: {
      dApp: 'https://icsneed.com/',
      Dashboard: 'https://4pk43-5qaaa-aaaag-qc44a-cai.icp0.io/',
      Discord: 'https://discord.gg/dkNNFerQqT',
      Github: 'https://github.com/icsneed/sneed',
      Learn: 'https://icsneed.com/',
      OpenChat: '',
      Roadmap: 'https://icsneed.com/',
      Website: 'https://icsneed.com/',
      Whitepaper: 'https://icsneed.com/?wp=sneed',
      X: 'https://twitter.com/icsneed',
    },
  },
  TAL: {
    links: {
      dApp: 'https://bvy5a-6yaaa-aaaam-abt3q-cai.icp0.io/',
      Learn: 'https://elliptic-1.gitbook.io/elliptic-docs/',
      OpenChat: 'https://oc.app/group/xtned-fqaaa-aaaar-atffa-cai',
      X: 'https://twitter.com/elliptic_dao 16',
    },
    article: `
# About

A decentralized, over-collateralized stablecoin backed by ckBTC leveraging liquity's design.
    `,
  },
  // BOX: {
  //   warnings: ['Not blackholed'],
  // },
  TENDY: {
    links: {
      dApp: 'https://TENDY.zone',
      Dashboard: 'https://info.icpswap.com/token/details/iozql-7iaaa-aaaah-advvq-cai',
      Discord: '',
      Github: '',
      Learn: 'https://TENDY.zone',
      Roadmap: 'https://TENDY.zone',
      Website: 'https://TENDY.zone',
      Whitepaper: 'https://TENDY.zone',
      X: 'https://x.com/Tendytokenic',
    },
    article: `

# About

TENDY is a DIP20 standard token, with a max supply of 88,000. The development team has not yet black-holed the canister as there are improvements and maybe even potential additions of icrc1 functions to the code coming soon.

TENDY is a token designed to provide investors with a seamless, secure, and rewarding experience. Currently, there are active swap pools with locked liquidity of SNS1, ICYPEES, ckBTC and ICP. There are user controlled pools of TENDY with CHAT, ICL, SNS1, ICYPEES & ICP.

TENDY hopes to bridge the gap of “meme tokens” and “utility” tokens by providing liquidity and unique arbitrage opportunities for users of the Internet Computer, Colloquially referred to as the “Tendyverse”.

`,
  },
  NTN: {
    links: {
      dApp: 'https://icpcoins.com/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/extk7-gaaaa-aaaaq-aacda-cai',
      Discord: 'https://discord.gg/zFAMdrEeWV',
      Github: 'https://github.com/Neutrinomic',
      Learn: 'https://icpcoins.com/#/about',
      Roadmap: 'https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view?pli=1',
      Website: 'icpcoins.com',
      Whitepaper: 'https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view?pli=1',
      X: 'https://x.com/ICPCoins',
    },
    article: `
# About

Neutrinite is a DAO designed to revolutionize the decentralized web by creating a network of crypto knowledge hubs. 

Neutrinite DAO ICPCoins - the premier portal for intricate insights into the dynamic world of Internet Computer (IC) cryptocurrencies. Our platform is dedicated to demystifying the complexities of the IC ecosystem, providing users with real-time data, comprehensive charts, and critical statistics with a focus on digital assets that thrive on the Internet Computer blockchain.
    `,
  },
  GLDGov: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.gold-dao.org/',
      Discord: '',
      Github: 'https://github.com/GoldDAO',
      Learn: 'https://medium.com/@GoldDAO',
      Roadmap: 'https://medium.com/@GoldDAO/gold-dao-building-a-progressive-roadmap-for-a-decentralized-gold-ecosystem-a00864e0a116',
      Website: 'https://www.gold-dao.org/',
      Whitepaper: 'https://gold-dao.gitbook.io/gold-dao-whitepaper/',
      X: 'https://x.com/gldrwa',
    },
  },
  TRAX: {
    links: {
      dApp: 'https://trax.so/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/ecu3s-hiaaa-aaaaq-aacaq-cai',
      Discord: '',
      Github: 'https://github.com/onlyontrax',
      Learn: 'https://wiki.trax.so/',
      Roadmap: 'https://wiki.trax.so/roadmap',
      Website: 'https://trax.so',
      Whitepaper: 'https://wiki.trax.so/whitepaper',
      X: 'https://x.com/trax_so',
    },
    article: `
# About

TRAX’s mission is to support the music industry with better tools to connect artists with their fans.

TRAX is a social marketplace for music, powered by the Internet Computer. 
TRAX enables music artists to retain full ownership of their content and monetisation and forge new relationships with their fans, whilst leveraging cutting-edge web3 tooling.
`,
  },
  TAGGR: {
    links: {
      dApp: 'https://6qfxa-ryaaa-aaaai-qbhsq-cai.ic0.app/',
      Dashboard: 'https://https://6qfxa-ryaaa-aaaai-qbhsq-cai.icp0.io/#/dashboard',
      Github: 'https://github.com/TaggrNetwork',
      Learn: 'https://taggr.network/#/whitepaper',
      Roadmap: 'https://taggr.network/#/roadmap',
      Website: 'https://taggr.network/',
      Whitepaper: 'https://taggr.network/#/whitepaper',
      X: '',
    },
    article: `
# About

Taggr is a fully on chain self sovereign Decentralized Social Media.

TAGGR is governed by its DAO members using TAGGR tokens.

`,
  },
  ICL: {
    links: {
      dApp: 'https://iclight.io/icdex',
      Dashboard: 'https://cmqwp-uiaaa-aaaaj-aihzq-cai.raw.ic0.app/saga',
      Discord: '',
      Github: 'https://github.com/iclighthouse',
      Learn: 'https://iclight.house/',
      Roadmap: 'https://iclight.io/icsns/proposals?id=hhaaz-2aaaa-aaaaq-aacla-cai',
      Website: 'https://iclight.io/icdex',
      Whitepaper: 'https://iclight.house/whitepaper.pdf',
      X: 'https://x.com/ICLighthouse',
    },
    article: `
# About

ICLighthouse is a fully on chain DEX built on ICP blockchain.

It also supports order book trading.

 `,
  },
  ICS: {
    links: {
      dApp: 'https://app.icpswap.com',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/csyra-haaaa-aaaaq-aacva-cai',
      Discord: '',
      Github: 'https://github.com/ICPSwap-Labs',
      Learn: 'https://www.icpswap.com/',
      Roadmap: 'https://www.icpswap.com/',
      Website: 'https://app.icpswap.com',
      Whitepaper: 'https://docs.google.com/document/d/16KtT63wNSXRCV9MAby09bl7oXTpl8k8B7V7wjQ8t6dM/edit?pli=1#heading=h.e57pzdvzqjth',
      X: 'https://x.com/ICPSwap',
    },
    article: `
# About
  
ICPSwap is a fully on chain DeFi hub on ICP that has a fully functional and widely used DEX.
  
  `,
  },
  EXE: {
    links: {
      dApp: 'https://desktop.windoge98.com',
      Dashboard: '',
      Discord: '',
      Github: 'https://github.com/SysLogica/windoge98-vue',
      Learn: 'https://windoge98.com',
      Roadmap: 'https://windoge98.com',
      Website: 'https://desktop.windoge98.com',
      Whitepaper: 'https://windoge98.com/whitepaper.pdf',
      X: 'https://x.com/windoge_98',
    },
    article: `
# About
  
The retro fusion Operating System empowering users on the Internet Computer. Fully on chain, fully awesome  
`,
  },
  WTN: {
    links: {
      dApp: 'https://waterneuron.fi/',
      Dashboard: 'https://dashboad.internetcomputer.org/sns/jmod6-4iaaa-aaaaq-aadkq-cai',
      Discord: '',
      Github: 'https://github.com/WaterNeuron',
      Learn: 'https://docs.waterneuron.fi/',
      Roadmap: 'https://waterneuron.fi/',
      Website: 'https://waterneuron.fi/',
      Whitepaper: 'https://waterneuron.fi/',
      X: 'https://x.com/waterneuron',
    },
    article: `
# About
WaterNeuron is a liquid staking protocol designed for the Internet Computer network.

Staking your ICP becomes straightforward and efficient.
`,
  },
  EST: {
    links: {
      dApp: 'https://wbdy5-yyaaa-aaaap-abysq-cai.icp0.io/market',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/abhsa-pyaaa-aaaaq-aac3q-cai',
      Github: 'https://github.com/Estate-DAO',
      Learn: 'https://www.estatedao.org/',
      Roadmap: 'https://www.estatedao.org/',
      Website: 'https://www.estatedao.org/',
      Whitepaper: 'https://www.estatedao.org/_files/ugd/1f4d25_11fa88bbc5ed4ed7bb3f8d40aa3918f3.pdf',
      X: 'https://x.com/EstateDAO_ICP',
    },
    article: `
# About
  
Estate DAO  
  `,
  },
  YUKU: {
    links: {
      dApp: 'https://yuku.app/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/cj5nf-5yaaa-aaaaq-aacxq-cai',
      Discord: ``,
      Github: 'https://dashboard.internetcomputer.org/sns/cj5nf-5yaaa-aaaaq-aacxq-cai',
      Learn: 'https://medium.com/@yukuApp',
      Roadmap: 'https://yuku.app/',
      Website: 'https://yuku.app/',
      Whitepaper: 'https://yuku.app/whitepaper',
      X: 'https://x.com/yukuapp',
    },
    article: `
# About
  
YUKU NFT Marketplace  
`,
  },
  ELNA: {
    links: {
      dApp: 'https://dapp.elna.ai/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/gkoex-viaaa-aaaaq-aacmq-cai',
      Discord: 'https://discord.com/invite/Q8pyTzcGNy',
      Github: 'https://github.com/elna-ai',
      Learn: 'https://blog.elna.ai/',
      Roadmap: 'https://www.elna.ai/roadmaps.html',
      Website: 'https://blog.elna.ai/',
      Whitepaper: 'https://docs.elna.ai/elna-whitepaper',
      X: 'https://x.com/elna_live',
    },
    article: `
# About
  
ELNA AI
`,
  },
  nICP: {
    links: {
      dApp: 'https://waterneuron.fi/',
      Dashboard: '',
      Discord: '',
      Github: 'https://github.com/WaterNeuron',
      Learn: 'https://docs.waterneuron.fi/',
      Roadmap: 'https://waterneuron.fi/',
      Website: 'https://waterneuron.fi/',
      Whitepaper: 'https://waterneuron.fi/',
      X: 'https://x.com/waterneuron',
    },
    article: `
# About
 
nICP is a token representing ICP locked in a 6-month neuron.

You can benefit from the yield generated by the neuron while still having liquid tokens.  
`,
  },
  FPL: {
    links: {
      dApp: 'https://openfpl.xyz/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/gyito-zyaaa-aaaaq-aacpq-cai',
      Discord: '',
      Github: 'https://github.com/jamesbeadle/OpenFPL',
      Learn: 'https://openfpl.xyz/whitepaper',
      OpenChat: 'https://oc.app/community/uf3iv-naaaa-aaaar-ar3ta-cai/?ref=zv6hh-xaaaa-aaaar-ac35q-cai',
      Roadmap: 'https://openfpl.xyz/whitepaper',
      Website: 'https://openfpl.xyz/',
      Whitepaper: 'https://openfpl.xyz/whitepaper',
      X: 'https://x.com/OpenFPL_DAO',
    },
    article: `
# About
OpenFPL will transform fantasy Premier League football using this DAO architecture into a decentralised service that is more engaging for its users, rewarding football fans for their insight and participation in football. 
`,
  },
  DOGMI: {
    links: {
      dApp: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/nb7he-piaaa-aaaaq-aadqq-cai',
      Discord: 'https://discord.com/invite/5J8wv6Y9',
      Github: '',
      Learn: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io',
      OpenChat: 'https://oc.app/community/aevr2-iiaaa-aaaar-azxoa-cai/',
      Roadmap: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io',
      Website: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io',
      Whitepaper: 'https://drive.google.com/file/d/1FSvrZDsZOw330BuiIwEEQ-h5aL2NPwNk/view?usp=drivesdk',
      X: 'https://x.com/dogfinity',
    },
    article: `
# About
  
DOGMI is an NFT Project in the Internet Computer Ecosystem 
`,
  },
  QRO: {
    links: {
      dApp: 'https://querio.io/',
      Dashboard: 'https://info.icpswap.com/token/details/vi5vh-wyaaa-aaaan-qizxa-cai',
      Discord: 'https://discord.com/invite/Jvb8Xmzgdv',
      Github: 'https://github.com/QuerioDAO',
      Learn: 'https://querio.io/',
      OpenChat: 'https://oc.app/community/qbzct-jaaaa-aaaar-au2gq-cai/?ref=jviq4-waaaa-aaaar-aqq7a-cai',
      Roadmap: 'https://github.com/QuerioDAO/whitepaper/blob/75d773300a8ade7c1a8d818007b38e2aafd39e3e/querio-roadmap.pdf',
      Website: 'https://querio.io',
      Whitepaper: 'https://github.com/QuerioDAO/whitepaper',
      X: 'https://x.com/querio_io',
    },
    article: `
# About


Fully on chain Search Engine
`,
  },
  STACK: {
    links: {
      dApp: 'https://m6fz7-jaaaa-aaaal-ajf7a-cai.icp0.io/',
      Dashboard: 'https://m6fz7-jaaaa-aaaal-ajf7a-cai.icp0.io/treasury',
      Discord: 'https://discord.com/invite/nwfWjDJZ9b',
      Github: '',
      Learn: '',
      Roadmap: '',
      Website: 'https://m6fz7-jaaaa-aaaal-ajf7a-cai.icp0.io/active_proposals',
      Whitepaper: 'https://usdstack.gitbook.io/stack-whitepaper',
      X: 'https://x.com/stackicp',
    },
    article: `
# About

Incentivizing Governance Participation on the Internet Computer
`,
  },
  PANDA: {
    links: {
      dApp: 'https://panda.fans',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/d7wvo-iiaaa-aaaaq-aacsq-cai',
      Discord: '',
      Github: 'https://github.com/ldclabs/ic-panda',
      Learn: 'https://panda.fans',
      OpenChat: 'https://oc.app/community/dqcvf-haaaa-aaaar-a5uqq-cai',
      Roadmap: 'https://panda.fans/#roadmap',
      Website: 'https://panda.fans',
      Whitepaper: 'https://panda.fans/#tokenomics',
      X: 'https://x.com/ICPandaDAO',
    },
    article: `
`,
  },
  ICPI: {
    links: {
      dApp: 'https://flxiu-kqaaa-aaaak-afggq-cai.icp0.io/#/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/4m6il-zqaaa-aaaaq-aaa2a-cai',
      Discord: '',
      Github: 'https://github.com/icpi-icp/icpi',
      Learn: 'https://flxiu-kqaaa-aaaak-afggq-cai.icp0.io/#/',
      OpenChat: '',
      Roadmap: '',
      Website: 'https://flxiu-kqaaa-aaaak-afggq-cai.icp0.io/#/',
      Whitepaper: 'https://flxiu-kqaaa-aaaak-afggq-cai.icp0.io/#/',
      X: 'https://x.com/ghost_icp',
    },
    article: `
# About
  
ICP Inscription (ICPI). An Experimental, Fair, Decentralized, and Community-Driven Token Protocol for the ICP Ecosystem.
`,
  },
  MOTOKO: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/ko36b-myaaa-aaaaq-aadbq-cai',
      Discord: '',
      Github: '',
      Learn: '',
      Roadmap: '',
      Website: 'https://2uktw-yiaaa-aaaah-adwxq-cai.icp0.io/',
      Whitepaper: '',
      X: '',
    },
    article: `
# About

Community Driven 1:1 Token Airdrop for MOTOKO GHOSTs NFT Holders.

`,
  },
  MORA: {
    links: {
      dApp: 'https://mora.app/',
      Dashboard: '',
      Discord: '',
      Github: '',
      Learn: 'https://mora.app/planet/qvsfp-6aaaa-aaaan-qdbua-cai',
      Roadmap: 'https://mora.app/planet/qvsfp-6aaaa-aaaan-qdbua-cai',
      Website: 'https://mora.app/',
      Whitepaper: 'https://mora.app/planet/qvsfp-6aaaa-aaaan-qdbua-cai/08D4J8J071MJESB1ZYH4WXKM1Z',
      X: 'https://x.com/mora_app',
    },
    article: `
# About
  
Peer-Peer Web3 Branding Tool for Super-Creators
`,
  },
  xICP: {
    links: {
      dApp: 'https://stakegeek.app/',
      Dashboard: '',
      Discord: 'https://discord.gg/CvTpv2TeKs',
      Github: '',
      Learn: 'https://stakegeek.app/docs',
      OpenChat: 'https://oc.app/community/nc5pq-taaaa-aaaar-a4d7a-cai',
      Roadmap: 'https://stakegeek.app/docs',
      Website: 'https://stakegeek.app/',
      Whitepaper: 'https://stakegeek.app/docs',
      X: 'https://x.com/theIDGEEK',
    },
    article: `
# About
  
stakeGeek is 100% on-chain application that provides liquid staking solution for ICP tokens.

This allows users to earn native staking rewards and keep liquidity through xICP tokens.  
`,
  },
  ckETH: {
    links: {
      dApp: 'https://nns.ic0.app/wallet/?u=ss2fx-dyaaa-aaaar-qacoq-cai',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/transactions',
      Discord: '',
      Github: 'https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh',
      Learn: 'https://internetcomputer.org/docs/current/developer-docs/multi-chain/faq/cketh-faq',
      Roadmap: 'https://forum.dfinity.org/t/cketh-a-canister-issued-ether-twin-token-on-the-ic/22819',
      Website: 'https://internetcomputer.org/docs/current/developer-docs/multi-chain/faq/cketh-faq',
      Whitepaper: '',
      X: '',
    },
    article: `
# About
  
Chain-key Ether (ckETH), a multi-chain Ether twin on the Internet Computer, is an ICRC-1-compliant token that is backed 1:1 by Ether (ETH) such that 1 ckETH can always be redeemed for 1 ETH and vice versa  
`,
  },
  WUMBO: {
    links: {
      dApp: 'https://qmpah-qqaaa-aaaal-ajabq-cai.icp0.io/',
      Dashboard: 'https://qmpah-qqaaa-aaaal-ajabq-cai.icp0.io/',
      Discord: 'https://discord.com/invite/RB3wdzmeTc',
      Github: '',
      Learn: 'https://discord.com/invite/RB3wdzmeTc',
      OpenChat: 'https://oc.app/community/3rfdf-5aaaa-aaaar-bawua-cai/channel/38487198271582653233721869244500930415',
      Roadmap: 'https://qmpah-qqaaa-aaaal-ajabq-cai.icp0.io/',
      Website: 'https://qmpah-qqaaa-aaaal-ajabq-cai.icp0.io/',
      Whitepaper: 'https://qmpah-qqaaa-aaaal-ajabq-cai.icp0.io/',
      X: 'https://x.com/WUMBOicp',
    },
    article: `
# About
  
WUMBO is a Meme Coin on ICP.
`,
  },
  CTS: {
    links: {
      dApp: 'https://cycles-transfer-station.com',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/ibahq-taaaa-aaaaq-aadna-cai',
      Discord: '',
      Github: '',
      Learn: '',
      Roadmap: 'https://cycles-transfer-station.com',
      Website: 'https://cycles-transfer-station.com',
      Whitepaper: 'https://cycles-transfer-station.com',
      X: '',
    },
    article: `
# About
  
The CYCLES-TRANSFER-STATION is an on-chain order-book market trade platform for ICRC-1 tokens on the world-computer. The key is that the market tokens trade against the native CYCLES, creating a stable trading scenario, and facilitating the general trade of the CYCLES.  
`,
  },
  BOF: {
    links: {
      dApp: 'https://arof.org/',
      Dashboard: '',
      Discord: 'https://discord.com/invite/jwQhua8d',
      Github: '',
      Learn: 'https://babyarof.gitbook.io/baby-arof-white-paper',
      OpenChat: 'https://oc.app/community/lpsjc-pyaaa-aaaar-avo3q-cai/channel/59787573525395956784803188481968126333',
      Roadmap: 'https://oc.app/community/lpsjc-pyaaa-aaaar-avo3q-cai/channel/59787573525395956784803188481968126333',
      Website: 'https://arof.org/',
      Whitepaper: 'https://babyarof.gitbook.io/baby-arof-white-paper',
      X: 'https://x.com/icpnft2',
    },
    article: `
# About

Baby Arof is a meme coin on ICP
`,
  },
  CLOWN: {
    links: {
      dApp: '',
      Dashboard: 'https://info.icpswap.com/token/details/iwv6l-6iaaa-aaaal-ajjjq-cai',
      Discord: '',
      Github: 'https://github.com/joeyboeyy/clown-token/',
      Learn: '',
      OpenChat: 'https://oc.app/community/ppfkh-maaaa-aaaar-a336a-cai/channel/283806532254715438641103320620325336219',
      Roadmap: '',
      Website: 'https://icpclown.github.io/',
      Whitepaper: '',
      X: 'https://x.com/realclownicp',
    },
    article: `
# About

CLOWN is a meme coin on ICP

`,
  },
  iDoge: {
    links: {
      dApp: 'https://idoge.org/',
      Dashboard: 'https://info.icpswap.com/token/details/eayyd-iiaaa-aaaah-adtea-cai',
      Discord: '',
      Github: '',
      Learn: 'https://idoge.org/',
      Roadmap: 'https://idoge.org/',
      Website: 'https://idoge.org/',
      Whitepaper: 'https://idoge.org/',
      X: 'https://x.com/idoge_icp',
    },
    article: `
# About

iDoge is a meme coin on ICP.

`,
  },
  BITS: {
    links: {
      dApp: 'https://breakingbits.org',
      Dashboard: 'https://breakingbits.org',
      Discord: 'https://discord.com/invite/Pv2R2xS2FS',
      Github: '',
      Learn: 'https://breakingbits.org',
      OpenChat: 'https://oc.app/community/c5eac-haaaa-aaaar-bf6xa-cai/channel/127896375431004305455516897936586617776',
      Roadmap: 'https://breakingbits.org',
      Website: 'https://breakingbits.org',
      Whitepaper: 'https://breakingbits.org',
      X: 'https://x.com/Breaking_Bits',
    },
    article: `
# About
  
BreakingBits is a meme coin on ICP
`,
  },
  COW: {
    links: {
      dApp: 'https://redheifer.io/',
      Dashboard: '',
      Discord: '',
      Github: '',
      Learn: '',
      OpenChat: 'https://oc.app/community/l634z-oaaaa-aaaar-befhq-cai/channel/215101515371688205243576695340873421244/',
      Roadmap: 'https://redheifer.io/',
      Website: 'https://redheifer.io/',
      Whitepaper: 'https://redheifer.io/wp-content/uploads/2024/05/RED-COW-Whitepaper.pdf',
      X: 'https://x.com/heifering',
    },
    article: `
# About

An udderly absurd meta-parody of the parody that is base reality. COW is a Meme Coin on ICP.
`,
  },
  ROS: {
    links: {
      dApp: 'https://egwoi-nqaaa-aaaai-qpena-cai.icp0.io/',
      Dashboard: '',
      Discord: 'https://discord.com/invite/fPSswAKm',
      Github: '',
      Learn: 'https://rosettacoin.gitbook.io/rosetta',
      Roadmap: 'https://rosettacoin.gitbook.io/rosetta/rosetta/road-map',
      Website: 'https://egwoi-nqaaa-aaaai-qpena-cai.icp0.io/',
      Whitepaper: 'https://rosettacoin.gitbook.io/rosetta/rosetta/whitepaper',
      X: 'https://x.com/rosettacoin',
    },
    article: `
# About

$ROS. Celebrating the implementation of the Rosetta API.  
`,
  },
  CLOUD: {
    links: {
      dApp: 'https://cryptoclouds.icp.xyz/',
      Dashboard: '',
      Discord: '',
      Github: '',
      Learn: 'https://medium.com/@CRYPTOCLOUDS/crypto-clouds-info-1d29b4f7a529',
      OpenChat: 'https://oc.app/community/53rdf-faaaa-aaaar-avv3a-cai/',
      Roadmap: '',
      Website: 'https://cryptoclouds.icp.xyz/',
      Whitepaper: '',
      X: 'https://x.com/cryptocloudsicp',
    },
    article: `
# About

Crypto Cloud is a meme project on ICP.
`,
  },
  AVCD: {
    links: {
      dApp: 'https://yuku.app/market/bjcsj-rqaaa-aaaah-qcxqq-cai',
      Dashboard: '',
      Discord: 'https://discord.com/invite/EwDzF3MBpv',
      Github: '',
      Learn: 'https://medium.com/@av8cado/introducing-to-concept-avocado-research-nft-collection-f4823b9942d2',
      OpenChat: 'https://oc.app/community/mlez3-haaaa-aaaar-a2vbq-cai/?ref=aqc62-saaaa-aaaaf-ahjpa-cai',
      Roadmap: '',
      Website: '',
      Whitepaper: 'https://avocado-3.gitbook.io/avcd/tokenomics',
      X: 'https://x.com/av8cado',
    },
    article: `
# About

AVCD is an NFT Project on ICP.            
`,
  },
  BITCORN: {
    links: {
      dApp: 'https://aalgg-jaaaa-aaaak-afkwq-cai.icp0.io/',
      Dashboard: 'https://suemn-5aaaa-aaaap-qb62q-cai.icp0.io/',
      Discord: '',
      Github: 'https://github.com/Smugandcomfy/Bitcorn-explorer',
      Learn: 'https://aalgg-jaaaa-aaaak-afkwq-cai.icp0.io/',
      OpenChat: 'https://oc.app/community/btpel-lyaaa-aaaar-a4crq-cai',
      Roadmap: 'https://aalgg-jaaaa-aaaak-afkwq-cai.icp0.io/',
      Website: 'https://aalgg-jaaaa-aaaak-afkwq-cai.icp0.io/',
      Whitepaper: 'https://dodkw-jyaaa-aaaag-qbryq-cai.raw.icp0.io/229',
      X: 'https://x.com/icBITCORN',
    },
    article: `
# About

Bitcorn is a peer-2-peer internet based group of Corn Farmers Offering innovative tools for the Interent Computer & ICRC standards.  
`,
  },
  CONF: {
    links: {
      dApp: 'https://www.icp-cc.com/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/l7ra6-uqaaa-aaaaq-aadea-cai',
      Discord: '',
      Github: '',
      Learn: '',
      Roadmap: 'https://osjzm-oaaaa-aaaal-ajcoq-cai.icp0.io/',
      Website: 'https://www.icp-cc.com/',
      Whitepaper: 'https://osjzm-oaaaa-aaaal-ajcoq-cai.icp0.io/',
      X: 'https://x.com/icp_cc',
    },
    article: `
# About

Governance Token of ICPCC DAO LLC.
`,
  },
  DAMONIC: {
    links: {
      dApp: 'https://damonicwelleams.com/',
      Dashboard: 'https://damonicwelleams.com/',
      Discord: '',
      Github: '',
      Learn: 'https://damonicwelleams.com/',
      OpenChat: 'https://damonicwelleams.com/',
      Roadmap: '',
      Website: 'https://damonicwelleams.com/',
      Whitepaper: '',
      X: 'https://x.com/damonicwelleams',
    },
    article: `
# About

DAMONIC is a meme coin on ICP.  
`,
  },
  ICVC: {
    links: {
      dApp: 'https://mnc6b-aaaaa-aaaap-qhnrq-cai.icp0.io/',
      Dashboard: 'https://dashboard.internetcomputer.org/sns/nuywj-oaaaa-aaaaq-aadta-cai',
      Discord: '',
      Github: '',
      Learn: 'https://ic-vc.com/docs/whitepaper.pdf',
      OpenChat: 'https://oc.app/community/rwbxa-nqaaa-aaaaf-bifjq-cai/?ref=bpvuy-oaaaa-aaaar-biq2a-cai',
      Roadmap: 'https://ic-vc.com/docs/whitepaper.pdf',
      Website: 'https://mnc6b-aaaaa-aaaap-qhnrq-cai.icp0.io/',
      Whitepaper: 'https://ic-vc.com/docs/whitepaper.pdf',
      X: 'https://x.com/icvcofficial',
    },
    article: `
# About

ICVC is a Venture Capital DAO on ICP, tokenized via SNS.  
`,
  },
  YUGE: {
    links: {
      dApp: 'https://www.yuge.meme/',
      Dashboard: '',
      Discord: '',
      Github: '',
      Learn: 'https://www.yuge.meme/',
      OpenChat: 'https://oc.app/community/scah5-eyaaa-aaaaf-bmzsq-cai/channel/281335575344703310511895461186893503918',
      Roadmap: 'https://www.yuge.meme/#road',
      Website: 'https://www.yuge.meme/',
      Whitepaper: 'https://drive.google.com/file/d/1pyVBC4rI3q0XDmupsogFyiPJZI9tllaq/view',
      X: 'https://x.com/yuge_icp',
    },
    article: `
# About

YUGE is a Meme Coin on ICP. Making ICP YUGE Again.
`,
  },
  ckSHIB: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/fxffn-xiaaa-aaaar-qagoa-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/fxffn-xiaaa-aaaar-qagoa-cai',
      Whitepaper: '',
    },
    article: `
# About

ckSHIB is a 1:1 Digital Twin of SHIB coin on Ethereum Network. ckSHIB is minted and wrapped by ICP Network smart contracts using Chain Fusion technology.
`,
  },
  ckUSDC: {
    links: {
      dApp: 'https://nns.ic0.app/wallet/?u=xevnm-gaaaa-aaaar-qafnq-cai',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/xevnm-gaaaa-aaaar-qafnq-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://forum.dfinity.org/t/tutorial-for-minting-ckusdc/34344',
      Website: 'https://dashboard.internetcomputer.org/ethereum/xevnm-gaaaa-aaaar-qafnq-cai',
      Whitepaper: '',
    },
    article: `
# About

ckUSDC is a 1:1 Digital Twin of USDC Stablecoin issued by Circle. ckUSDC is minted and wrapped by ICP Network using Chain Fusion technology.   
`,
  },
  ckLINK: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/g4tto-rqaaa-aaaar-qageq-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/g4tto-rqaaa-aaaar-qageq-cai',
      Whitepaper: '',
    },
    article: `
# About

ckLINK is a digital twin of ERC20 ChainLink token on ICP network, wrapped and issued using Chain Key Cryptography and other IC Protocols.   
`,
  },
  ckUSDT: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/cngnf-vqaaa-aaaar-qag4q-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/cngnf-vqaaa-aaaar-qag4q-cai',
      Whitepaper: '',
    },
    article: `
# About

ckUSDT is a 1:1 Digital Twin of USDT Stablecoin issued by Tether. ckUSDT is minted and wrapped by ICP Network Smart Contracts using Chain Fusion technology.   
`,
  },
  ckOCT: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/ebo5g-cyaaa-aaaar-qagla-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/ebo5g-cyaaa-aaaar-qagla-cai',
      Whitepaper: '',
    },
    article: `
# About

ckOCT is a 1:1 Digital Twin of OCT coin on Ethereum Network. ckOCT is minted and wrapped by ICP Network smart contracts using Chain Fusion technology   
`,
  },
  ckPEPE: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/etik7-oiaaa-aaaar-qagia-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/etik7-oiaaa-aaaar-qagia-cai',
      Whitepaper: '',
    },
    article: `
# About

ckPEPE is a 1:1 Digital Twin of PEPE coin on Ethereum Network. ckPEPE is minted and wrapped by ICP Network Smart Contracts using Chain Fusion technology.   
`,
  },
  ckUNI: {
    links: {
      dApp: '',
      Dashboard: 'https://dashboard.internetcomputer.org/ethereum/ilzky-ayaaa-aaaar-qahha-cai',
      Discord: 'https://discord.com/invite/cA7y6ezyE2',
      Github: 'https://github.com/dfinity/ic/blob/master/rs/ethereum/cketh/docs/ckerc20.adoc',
      Learn: 'https://internetcomputer.org/ethereum-integration/',
      Website: 'https://dashboard.internetcomputer.org/ethereum/ilzky-ayaaa-aaaar-qahha-cai',
      Whitepaper: '',
    },
    article: `
# About

ckUNI is a 1:1 Digital Twin of UNI governance token on Ethereum Network. ckUNI is minted and wrapped by ICP Network smart contracts using Chain Fusion technology.   
`,
  },
  yyyy: {
    links: {
      app: 'https://querio.io/',
    },
  },
  zzzz: {
    links: {
      website: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io/',
    },
  },
};