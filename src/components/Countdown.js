import Countdown from "react-countdown";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Skeleton,
  Box,
  Wrap,
  Tooltip,
  useColorModeValue,
  Progress,
  Button,  Link
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

const countDownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Wrap m="auto" maxW="800px">
      <Box>🚀 ICPCoins (Neutrinite DAO) swap is live!</Box>
      <Box><Link href="https://nns.ic0.app/project/?project=extk7-gaaaa-aaaaq-aacda-cai" target="nnsdapp"><Button ml="4px" mt="-2px" size="xs" colorScheme='blue' rightIcon={<ExternalLinkIcon />}>Launchpad </Button></Link></Box>
      <Box><Link href="https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view" target="whitepaper" mr="6px"><Button ml="4px" mt="-2px" size="xs" colorScheme='gray' rightIcon={<ExternalLinkIcon />}>Whitepaper </Button></Link>
      <Link href="https://forum.dfinity.org/t/upcoming-icpcoins-neutrinite-sns-decentralization/25308" target="forum"><Button ml="4px" mt="-2px" size="xs" colorScheme='gray' rightIcon={<ExternalLinkIcon />}>Discussion</Button></Link></Box>
      </Wrap>;
    } else {
      // Render a countdown
      return <Wrap m="auto" maxW="800px">
      <Box>🚀 ICPCoins (Neutrinite DAO) launch in</Box>
      <Box><span className="clock">{days.toString().padStart(2,"0")}:{hours.toString().padStart(2,"0")}:{minutes.toString().padStart(2,"0")}:{seconds.toString().padStart(2,"0")}</span></Box>
      <Box><Link href="https://nns.ic0.app/project/?project=extk7-gaaaa-aaaaq-aacda-cai" target="nnsdapp"><Button ml="4px" mt="-2px" size="xs" colorScheme='blue' rightIcon={<ExternalLinkIcon />}>Launchpad </Button></Link></Box>
      <Box><Link href="https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view" target="whitepaper" mr="6px"><Button ml="4px" mt="-2px" size="xs" colorScheme='gray' rightIcon={<ExternalLinkIcon />}>Whitepaper </Button></Link>
      <Link href="https://forum.dfinity.org/t/upcoming-icpcoins-neutrinite-sns-decentralization/25308" target="forum"><Button ml="4px" mt="-2px" size="xs" colorScheme='gray' rightIcon={<ExternalLinkIcon />}>Discussion</Button></Link></Box>
      </Wrap>;
    }
  };
  

export const CountdownTimer = () => <Box id="cdtimer">
  <Countdown  date={new Date(1703053800000)} renderer={countDownRenderer} />
   
</Box>