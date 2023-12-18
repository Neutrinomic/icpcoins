import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import MD from '../components/MD';

export const ListingPage = () => {
  return (
    <Box maxW="1278" m="auto" pt="20" pb="20">
      <ReactMarkdown components={MD}>{article}</ReactMarkdown>
    </Box>
  );
};

const article = `

# ICPCoins.com Listing Protocol

## Disclaimer
ICPCoins.com is operated by Neutrinite DAO, functioning independently of any Internet Computer (IC) related entities. Listing a token is a meticulous process not influenced by financial contributions. We ensure a fair and unbiased listing procedure.

## Listing Criteria
Tokens are assessed based on a structured point system to determine their suitability for listing on our platform.

- Meme coin: **-2** points
- Anonymous team: **-1** point
- Unpopular anonymous team: **-1** additional point
- PDF Whitepaper: **+1** point
- Forum post with extensive token information: **+1** point
- Has utility: **+2** points
- Blackholed ledger: **+1** point
- DAO governed ledger: **+1** point
- NNS blessed ledger: **+1** point
- Ledger in fiduciary subnet: **+1** point
- Developed own original ledger: **+2** points
- Audited ledger: **+2** points
- Ledger has replicable source to module hash for every installed version: **+3** points
- Transaction history: **+1** point
- ICRC1 compliance: **+1** point
- ICRC2 compliance: **+1** point
- ICRC3 compliance: **+1** point
- Sufficient liquidity in DEXs: **+1** point
- Sufficient volume in DEXs: **+1** point
- Public & witnessed initial distribution: **+3** points
- Public distribution with open-source smart contract: **+1** point
- Popular within social networks: **+1** point

A token with not enough points will be deemed ineligible for listing.

## Non-Endorsement
Listing on ICPCoins.com should not be construed as an endorsement of a token's potential or security. Tokens are not audited by us.

## Amendments
The listing criteria and process may be updated at our discretion to better align with the digital asset environment. ICPCoins.com reserves the right to modify these terms as needed.

## Listing Process
Tokens from well-known frameworks such as SNS, those already embraced by the community, or tokens issued by recognized organizations may have a streamlined listing review. For all other tokens, issuers must engage in a more comprehensive evaluation process. This includes:

Detailing the token's attributes (from the list above) in a post on the Internet Computer developer forums or Taggr, which will be subject to community scrutiny.
Providing supporting information, screenshots and relevant links, to substantiate the claims made in the post. Should your project captivate the developer community, we encourage sharing it on the forum. Conversely, if it might resonate more broadly, please consider posting it on Taggr.

The community's feedback on the forum post will be considered as part of the review process. Tokens that do not uphold under community scrutiny may face challenges in the listing process.


`;
