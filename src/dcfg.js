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
  SNS1: {
    links: {
      website: 'https://dragginz.io/',
    },
    article: `
# What is Dragginz?

Dragginz is a 3D MMORPG set on a strange planet full of weird, wonderful and sometimes terrifying creatures. Play the game your way! Hatch and raise Dragginz to accompany you on your adventures. Harness the planet's latent magic as you explore, battle and learn key skills. Alchemy, Gardening and Cooking are just a few such skills, each of which can be enjoyed casually or as a way of life.

    `,
  },
  BTC: {
    article: `
# What Is Bitcoin?

Bitcoin (BTC) is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, thus removing the need for third-party involvement in financial transactions. It is rewarded to blockchain miners for the work done to verify transactions and can be purchased on several exchanges.

Bitcoin was introduced to the public in 2009 by an anonymous developer or group of developers using the name Satoshi Nakamoto.

It has since become the most well-known cryptocurrency in the world. Its popularity has inspired the development of many other cryptocurrencies. These competitors either attempt to replace it as a payment system or are used as utility or security tokens in other blockchains and emerging financial technologies.
    `,
  },
  ICP: {
    links: {
      website: 'https://internetcomputer.org/',
      whitepaper: 'https://internetcomputer.org/whitepaper.pdf',
      NNS: 'https://nns.ic0.app/',
      ICA: 'https://association.internetcomputer.org/',
      Dfinity: 'https://dfinity.org/',
      Discord: 'https://discord.gg/WHewyHyqUW',
      dashboard: 'https://dashboard.internetcomputer.org/',
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
      cycles:
        'https://internetcomputer.org/docs/current/concepts/tokens-cycles',
      XTC: 'https://dank.ooo/',
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
      website: 'https://www.origyn.com/',
      whitepaper: 'https://www.origyn.com/whitepapers',
    },
    article: `
# About ORIGYN Foundation

At ORIGYN Foundation, we combine intelligent technologies and decentralized computing to identify, authenticate and unlock the powers of ownership for the world’s most valuable objects.

ORIGYN brings NFTs to life with biometric data and unique ownership experiences to power brands, creators, artists, marketplaces, consumers and industries with guaranteed certificates of authenticity.
    `,
  },
  ckBTC: {
    links: {
      docs: 'https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc',
    },
    article: `
# About 

Chain-key Bitcoin (ckBTC) is an ICRC-2-compliant token that is backed 1:1 by bitcoins held 100% on the IC mainnet.
Canister is governed by the NNS
`,
  },
  CHAT: {
    links: {
      app: 'https://oc.app/',
      whitepaper: 'https://oc.app/whitepaper',
      roadmap: 'https://oc.app/roadmap',
      github: 'https://github.com/open-chat-labs/open-chat',
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
      whitepaper: 'https://74iy7-xqaaa-aaaaf-qagra-cai.icp0.io/whitepaper',
      website: 'https://74iy7-xqaaa-aaaaf-qagra-cai.icp0.io/',
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
      whitepaper:
        'https://hotornot.notion.site/hotornot/Hot-or-Not-Whitepaper-c539179e51f44867979f4372e4635f59',
      website: 'https://hotornot.wtf/',
    },
    article: `
# What is Hot or Not?

Hot or Not is Web3's answer to TikTok. It is a short-video social media platform that integrates gamification for short video content.

Hot or Not combines the best of social media, gamification, and decentralization to revolutionize the short-video social media ecosystem.
    `,
  },
  GHOST: {
    links: { website: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.raw.ic0.app/' },
    article: `
# What is Ghost?

The First Decentralized Meme Coin on IC
`,
  },
  MOD: {
    links: {
      app: 'https://modclub.ai/',
      github: 'https://github.com/modclub-app',
      whitepaper: 'https://docsend.com/view/ett88daeai2gfqxh',
    },
    article: `
# About 

Modclub is a decentralized “verification as a service” platform offering fast, accurate, and scalable Al-assisted moderation, Proof of Humanity verification and data labeling solutions. The dApp aims to ensure security, privacy, efficiency, and cost effectiveness for developers & users alike.
    `,
  },
  CAT: {
    links: {
      app: 'https://catalyze.one/',
      whitepaper: 'https://catalyze.one/whitepaper/',
      github: 'https://github.com/Catalyze-Software',
    },
    article: `
# About

Catalyze is a social application that aims to provide a community organization & management tool, alternative to popular Web2 chat-based applications such as Discord or Slack.
    `,
  },
  BOOM: {
    links: {
      site: 'https://u52bf-3qaaa-aaaal-qb5wq-cai.icp0.io/',
      github: 'https://github.com/BoomDAO',
      whitepaper:
        'https://boomdao.notion.site/BOOM-DAO-WHITEPAPER-59bc2aa3380b4f86b01344da42157a24',
    },
    article: `
# About 

BOOM DAO is a DAO focused on providing gaming tooling infrastructure & funding game development.
    `,
  },
  ICX: {
    links: {
      app: 'https://icx.one/',
      whitepaper:
        'https://immediate-guilty-135.notion.site/Seers-Web3-Social-Network-25fa0f505b0141cabb5d7d68a11f572b',
      github: 'https://github.com/SeersSocial/',
    },
    article: `
# About 

ICX is a decentralized application (dApp) that combines the familiar look and feel of Twitter with cryptocurrency features, enabling users to engage in decentralized social media interactions while seamlessly integrating functionalities such as tipping, prediction markets, NFT sharing, and DAO creation.
    `,
  },
  BOX: {
    links: {
      linktree: 'https://linktr.ee/boxydude',
    },
  },
  NUA: {
    links: {
      app: 'https://nuance.xyz/',
      whitepaper: 'https://nuance.xyz/publication/nuance/white-paper',
    },
    article: `
# About

Nuance is an entirely on-chain publishing platform. It applies the benefits of Web 3: Anonymity, self-sovereignty, censorship resistance, community governance & tokenization to a Medium-style content hosting platform.
`,
  },
  SONIC: {
    links: {
      dapp: 'https://app.sonic.ooo/',
      site: 'https://www.sonic.ooo/',
      whitepaper: 'https://sonicdex.gitbook.io/sonic-whitepaper/',
    },
    article: `
# About 

In the rapidly evolving digital asset landscape, the decentralized trading platform Sonic emerges as a beacon of innovation. Powered by blockchain technology, Sonic addresses the critical need for transparent, unrestricted, and equitable asset ownership and transfer across open networks, devoid of reliance on external entities. Unlike traditional financial infrastructures, Sonic heralds a new era of financial interactions on a global scale, fostering a thriving ecosystem of digital assets.
    `,
  },
  SNEED: {
    links: { site: 'https://icsneed.com/' },
  },
  TAL: {
    links: {
      app: 'https://bvy5a-6yaaa-aaaam-abt3q-cai.icp0.io/',
      docs: 'https://elliptic-1.gitbook.io/elliptic-docs/',
      git: 'GitHub - Elliptic-DAO/elliptic-v0 29',
      twitter: 'https://twitter.com/elliptic_dao 16',
      oc: 'https://oc.app/group/xtned-fqaaa-aaaar-atffa-cai',
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
    article: `

# About

TENDY is a DIP20 standard token, with a max supply of 88,000. The development team has not yet black-holed the canister as there are improvements and maybe even potential additions of icrc1 functions to the code coming soon.

TENDY is a token designed to provide investors with a seamless, secure, and rewarding experience. Currently, there are active swap pools with locked liquidity of SNS1, ICYPEES, ckBTC and ICP. There are user controlled pools of TENDY with CHAT, ICL, SNS1, ICYPEES & ICP.

TENDY hopes to bridge the gap of “meme tokens” and “utility” tokens by providing liquidity and unique arbitrage opportunities for users of the Internet Computer, Colloquially referred to as the “Tendyverse”.

`,
  },
  NTN: {
    links: {
      app: 'https://icpcoins.com',
      whitepaper:
        'https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view',
      github: 'https://github.com/orgs/Neutrinomic/repositories',
    },
    article: `
# About

Neutrinite is a DAO designed to revolutionize the decentralized web by creating a network of crypto knowledge hubs. 

Neutrinite DAO ICPCoins - the premier portal for intricate insights into the dynamic world of Internet Computer (IC) cryptocurrencies. Our platform is dedicated to demystifying the complexities of the IC ecosystem, providing users with real-time data, comprehensive charts, and critical statistics with a focus on digital assets that thrive on the Internet Computer blockchain.
    `,
  },
  GLDGov: {
    links: {
      whitepaper: 'https://gold-dao.gitbook.io/gold-dao-whitepaper/',
    },
  },
  TRAX: {
    links: {
      app: 'https://trax.so/',
      whitepaper:
        'https://docs.google.com/document/d/1a-NefE8Pqsp5qbKb6TPj3tE1J2e7qWCYu1_FwuLdLF8/edit?usp=sharing',
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
      app: 'https://taggr.top/',
    },
  },
  MORA: {
    links: {
      app: 'https://mora.app/',
    },
  },
  QRO: {
    links: {
      app: 'https://querio.io/',
    },
  },
  DOGMI: {
    links: {
      website: 'https://qu2gy-uqaaa-aaaal-qcv6a-cai.icp0.io/',
    },
  },
  STACK: {},
  iDoge: {
    links: {
      website: 'https://idoge.org/',
    },
  },
  EXE: {
    link: {
      app: 'https://windoge98.com/',
    },
  },
  CLOUD: {},
};
