import { Box, Wrap, Link as LinkC, useColorModeValue, Flex, Tooltip, Tag, TagLabel } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaGithub, FaDiscord, FaYoutube, FaBook, FaExternalLinkAlt, FaGlobe, FaFileAlt, FaLink } from 'react-icons/fa';
import { SiInternetarchive } from 'react-icons/si';
import React from 'react';
import morphed_circle_center from '../assets/components/morphed_icons_center.svg';
import morphed_circle_left from '../assets/components/morphed_icons_left.svg';
import morphed_circle_right from '../assets/components/morphed_icons_right.svg';
import { FaL } from 'react-icons/fa6';

export const SimpleTokenLinks = ({ info }) => {
    if (!info || !info.links || !Object.keys(info.links).length) return null;

    return (
        <Wrap fontSize="14px" spacing="6">
            <Box color="gray.600">Links</Box>
            {Object.keys(info.links).map((name, idx) => (
                <Box key={idx}>
                    <LinkC href={info.links[name]} target="_blank" isExternal>
                        {name} <ExternalLinkIcon mx="2px" />
                    </LinkC>
                </Box>
            ))}
        </Wrap>
    );
};

const getIcon = (name, color) => {
    const iconProps = color ? { color: color } : { size: 12 };
    const icons = {
        dApp: <FaExternalLinkAlt {...iconProps} />,
        Dashboard: <FaExternalLinkAlt {...iconProps} />,
        DFINITY: <SiInternetarchive {...iconProps} />,
        Discord: <FaDiscord {...iconProps} />,
        Github: <FaGithub {...iconProps} />,
        ICA: <SiInternetarchive {...iconProps} />,
        Learn: <FaBook {...iconProps} />,
        NNS: <FaExternalLinkAlt {...iconProps} />,
        Roadmap: <FaBook {...iconProps} />,
        Website: <FaGlobe {...iconProps} />,
        Whitepaper: <FaFileAlt {...iconProps} />,
        X: <FaExternalLinkAlt {...iconProps} />,
        YouTube: <FaYoutube {...iconProps} />,
    };
    return icons[name] || <FaExternalLinkAlt {...iconProps} />;
};

export const IconTokenLinks = ({ info }) => {
    if (!info || !info.links || !Object.keys(info.links).length) return null;

    const numOfLinks = Object.keys(info.links).length
    const size = 32;
    const gap = 2;

    return (
        <Box position="relative" height={`${size}px`} py={2} mt={3}>
            <Box position="absolute" top="0" left="0" right="0" bottom="0" >
                <DynamicCirclesSVG numOfLinks={numOfLinks} size={size} />
            </Box>
            <Box position="absolute" top="0" left="0" right="0" bottom="0" >
                <div style={{ display: 'flex', height: `${size}px` }}>
                    <Box
                        key='link_icon'
                        width={`${size - 2 * gap}px`}
                        height={`${size - 2 * gap}px`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="50%"
                        bg="blue.500"
                        color="gray.100"
                        m={`${gap}px`}
                    >
                        <FaLink size={12} />
                    </Box>
                    {Object.keys(info.links).map((name, idx) => (
                        <Tooltip label={name} placement="bottom" hasArrow>
                            <Box
                                key='link_icon'
                                width={`${size - 2 * gap}px`}
                                height={`${size - 2 * gap}px`}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="50%"
                                color="gray.600"
                                m={`${gap}px`}
                                _hover={{ cursor: 'pointer', transform: 'scale(1.3)', color: 'gray.200' }}
                            >

                                <LinkC href={info.links[name]} target="_blank" isExternal>
                                    {getIcon(name)}
                                </LinkC>
                            </Box>
                        </Tooltip>
                    ))}
                </div>
            </Box>
        </Box>
    );
};


const LinkComponent = ({ name, color }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        // <Tooltip label={name} placement="bottom" hasArrow>
        //     <Flex
        //         align="center"
        //         onMouseEnter={() => setIsHovered(true)}
        //         onMouseLeave={() => setIsHovered(false)}
        //         p="8px"
        //         borderRadius={isHovered ? 'md' : '50%'}
        //         // bg={useColorModeValue('gray.200', 'gray.700')}
        //         // border="1px solid"
        //         // borderColor={useColorModeValue('gray.300', 'gray.600')}
        //         _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
        //         position="relative"
        //         transition="background 0.2s, border-radius 0.2s, padding 0.2s"
        //     >
        //         {getIcon(name, color)}
        //     </Flex>
        // </Tooltip>

        <Tag size='md' colorScheme='gray' borderRadius='full'>
            {getIcon(name, color)}
            <TagLabel color={'gray.600'}>{name}</TagLabel>
        </Tag>
    );
}



export const DynamicCirclesSVG = ({ numOfLinks, size }) => {
    if (numOfLinks < 1) return null;

    return (
        <div style={{ display: 'flex', height: `${size ?? 32}px` }}>
            <img src={morphed_circle_left} alt="Morphed Circle Left" />
            {Array.from({ length: numOfLinks - 1 }, (_, idx) => (
                <img src={morphed_circle_center} key={`social_link_${idx}`} alt="Morphed Circle Center" />
            ))}
            <img src={morphed_circle_right} alt="Morphed Circle Right" />
        </div>
    );
};