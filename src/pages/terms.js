import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import MD from '../components/MD';

export const TermsPage = () => {
  return (
    <Box maxW="1278" m="auto" pt="20" pb="20">
      <ReactMarkdown components={MD}>{article}</ReactMarkdown>
    </Box>
  );
};

const article = `

# Terms of Use ("Terms")


Welcome to icpcoins.com (the "Service"), operated by Neutrinite DAO ("us", "we", or "our"). Your use of the Service is governed by the following Terms of Use.

Please read these Terms of Use ("Terms", "Terms of Use") carefully before using our Service at icpcoins.com.

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.

## 1. Acknowledgment
By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these terms and conditions, in whole or in part, please do not use the Service.

## 2. Service Description
Neutrinite provides a platform through icpcoins.com for real-time cryptocurrency statistics and price feeds. While we aim for precision and timeliness in the data we present, we cannot guarantee its absolute accuracy or reliability.

## 3. No Investment Recommendations or Professional Advice
The Service is intended only to provide information. It does not offer investment advice or recommendations to purchase, sell, or hold any cryptocurrencies. Your financial situation is unique, and any actions you take based on information provided on our Service should be undertaken only after reviewing your personal circumstances with a financial professional.

## 4. Accuracy of Information
We shall not be held responsible for any information that may appear inaccurate or incomplete on the Service. Any reliance on the material provided through our Service is at your own risk. The Service may contain certain historical information which is not current and is provided for your reference only.

## 5. Limitation of Our Liability
To the maximum extent permitted by law, Neutrinite expressly disclaims all liability for any damages, whether direct, indirect, incidental, special, or consequential, arising out of or in connection with your use of the Service, including but not limited to the quality, accuracy, or utility of the information provided as part of or through the Service.

## 6. User Obligations
You agree to use the Service only for lawful purposes and in a way that does not infringe upon the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service.

## 7. Modifications to the Service and Prices
Neutrinite reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part of it) with or without notice at any time.

## 8. Changes to Terms
Neutrinite reserves the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.

## 9. Entire Agreement
The Terms of Use constitute the entire agreement between you and Neutrinite regarding the Service and supersede all prior and contemporaneous written or oral agreements between you and Neutrinite.

## 10. Contact Information
If you have any questions about these Terms of Use, please contact us.

`;
