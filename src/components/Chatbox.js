import {
    Box, Stack, HStack, Input, Button, Flex
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Hashicon } from '@emeraldpay/hashicon-react';

import ic from '../icblast.js';

let can = false;

export function Chatbox() {

    const [chat, setChat] = useState(false);

    const fn = async () => {
        if (!can) can = await ic("bqzgt-iiaaa-aaaai-qpdoa-cai");

        await can.getchat(0).then(setChat);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fn();
        }, 1000);
        return () => clearInterval(interval);
        }, []);

    if (!chat) return null;
    let [size, list] = chat;

    console.log(size, list);

    return <Box sx={{position:"fixed", bottom:"0px", right:"0px", width:"400px", height:"400px"}} bg="gray.900" p="4" border="1px solid #333" borderRadius="8">
        <Stack>
        {list.map((x, i) => <HStack key={i}><Box w={"32px"}><Hashicon size={"32px"} value={x[0][0].toText()} /></Box><Box w="100%">{x[0][1]}</Box></HStack>)}
        </Stack>
        <Flex w={"370px"} gap="2" sx={{position:"absolute", bottom:"9px"}}><Input key={"a"}></Input><Button>Send</Button></Flex>
    </Box>
}