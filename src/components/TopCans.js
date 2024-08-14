import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ic from '../icblast.js';
import { toState } from '@infu/icblast';
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
    Stack, Wrap, HStack, Tag, Flex, Spacer, Icon, Alert, AlertIcon,useBreakpointValue, useColorMode
} from '@chakra-ui/react'
import { smartNumber } from './Inline.js';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { RiLeafFill } from "react-icons/ri";
import { FaHotjar } from "react-icons/fa";
import { DNumberPlus } from './DNumberPlus.js';
import { DNumber } from './DNumber.js';
import { FaHeart } from "react-icons/fa";
import moment from 'moment';
import { GiSharkFin } from "react-icons/gi";
import { GiCannedFish } from "react-icons/gi";
import { useSelector } from 'react-redux';

export const TopCans = () => {


    let [list, setList] = useState([]);
    let [events, setEvents] = useState([]);
    const isMobile = useBreakpointValue({ base: true, md: false });
    let [cans, setCans] = useState(false);
    let conf = useSelector(state => state.config.tokens);
    const { colorMode } = useColorMode();
    const deepbg = colorMode === "light" ? "gray.100" : "gray.900";

    let nonsense = ["quzhj-7aaaa-aaaag-qjwga-cai", "ddhwp-fqaaa-aaaag-qcgoa-cai"];

    let loadOnce = async() => {
        let can = await ic("p2clb-ryaaa-aaaal-qjpia-cai");
        let cans_r = toState(await can.getKnownCanisters());
        let xcans = {};
        for (let z of cans_r) {
            xcans[z[0]] = z[1];
        }
        setCans(xcans);
    };

    let load = async () => {
        if (!conf || !cans) return;
        let can = await ic("p2clb-ryaaa-aaaal-qjpia-cai");

        let rez = await can.getAccounts();
        let aggr = await ic("u45jl-liaaa-aaaam-abppa-cai");
        let prices = await aggr.get_latest_extended();
        function getPrice(v, ledger_id) {
            return v * prices.find(x => x?.config?.ledger?.icrc1?.ledger.toText() === ledger_id)?.rates.find(x => x.to_token == 0n)?.rate || 0;
        }

        function getName(id) {
            let can = cans[id];
            if (!can) return id
            return can.name;
        }

        let byAccount = {};

        function getLedgerInfo(id) {
            let my = conf.find(y => {
                if (!(y?.ledger?.icrc1?.ledger)) return false;

                return y.ledger.icrc1.ledger == id;
            });
            if (!my) return false;
            let symbol = my.symbol;
            let decimals = Number(my.decimals);
            
            return { symbol, decimals, snsRoot : my?.locking?.sns?.root }
        }

        rez.map((x) => {

            let foundLedger = getLedgerInfo(x.id.toText());
            if (!foundLedger) return false;
            let { symbol, decimals } = foundLedger;

            let price = prices.find(a => a?.config?.ledger?.icrc1?.ledger.toText() === x.id.toText())?.rates.find(x => x.to_token == 0n)?.rate || 0

            for (let acc of x.accounts) {
                let accId = acc[0].toText();
                if (!byAccount[accId]) byAccount[accId] = {}

                byAccount[accId][symbol] = [
                    Number(acc[1]) / (10 ** decimals),
                    getPrice(Number(acc[1]) / (10 ** decimals), x.id.toText()),
                    Number(acc[2]) / (10 ** decimals) * price,
                    Number(acc[3]) / (10 ** decimals),
                    Number(acc[4]) / (10 ** decimals) * price,
                    Number(acc[5]) / (10 ** decimals),
                    acc[6] // first seen
                ]

            };
            return false
        });




        let orderedByValue = Object.keys(byAccount);
        orderedByValue.sort((a, b) => {
            let sumA = 0;
            let sumB = 0;
            for (let key in byAccount[a]) {
                sumA += byAccount[a][key][1];
            }
            for (let key in byAccount[b]) {
                sumB += byAccount[b][key][1];
            }
            return sumB - sumA;
        });

        let orv = orderedByValue.map(x => {
            let sum = 0;
            for (let key in byAccount[x]) {
                sum += byAccount[x][key][1];
            }
            let tokens = Object.keys(byAccount[x]).map(s => { return [s, byAccount[x][s]] });
            tokens.sort((a, b) => b[1][1] - a[1][1]);

            if (nonsense.indexOf(x) !== -1) return false;

            return { name: getName(x), id: x, sum, tokens, meta: cans[x] };
        }).filter(Boolean).filter(x => {
            return x.sum > 2000;
        });

        setList(orv)

        let evs = await can.getEventsBwd(Math.round(Date.now() / 1000) << 32, 100)

        evs = evs.results.map(x => x[1]);
        evs = evs.map(x => {
            let foundLedger = getLedgerInfo(x.ledger.toText());
            if (!foundLedger) return false;
            let { symbol, decimals } = foundLedger;
            let amount = Number(x.amount) / (10 ** decimals);
            let movetype = Object.keys(x.move)[0];
            if (movetype === "tin") movetype = "IN";
            if (movetype === "tout") movetype = "OUT";
            movetype = movetype.toUpperCase();
            let snsRoot = foundLedger.snsRoot;
            let txlink = undefined;
            if (snsRoot) txlink = `https://dashboard.internetcomputer.org/sns/${snsRoot}/transaction/${x.txid}`;
            return { ledger: x.ledger, txlink, txid:x.txid, movetype, time: x.time, name: getName(x.owner), symbol, amount, amountUSD: getPrice(amount, x.ledger.toText()) }
        }).filter(Boolean);
        // let evr1 = await can.get_whale_events({start:0, length: 0})
        // let total = Number(evr1.ok.total);
        // let evr2 = await can.get_whale_events({start: total - 500, length: 500});
        // let evs = evr2.ok.entries;
        // evs.sort((a, b) => b.time - a.time);
        // evs = evs.map(x => {
        //     let foundLedger = getLedgerInfo(x.ledger.toText());
        //     if (!foundLedger) return false; 
        //     let {symbol, decimals} = foundLedger;

        //     let movetype = Object.keys(x.move)[0];
        //     let amount = Number(x.move[movetype]) / (10 ** decimals);
        //     let amountUSD = getPrice(amount, x.ledger.toText());
        //     if (movetype === "tin") movetype = "IN";
        //     if (movetype === "tout") movetype = "OUT";
        //     movetype = movetype.toUpperCase();
        //     return toState({
        //         movetype,
        //         symbol,               
        //         amount,
        //         amountUSD,
        //         ledger: x.ledger,
        //         time: x.time,
        //         owner: getName(x.owner),
        //         ownerid: x.owner,
        //     })
        // }).filter(Boolean);


        setEvents(toState(evs))

    };
    useEffect(() => {
        loadOnce();
    }, [])
    useEffect(() => {
        load();
        
    }, [conf, cans]);

    useEffect(() => {
        const interval = setInterval(() => {
            load();
        }, 5000);
        return () => clearInterval(interval);
    }, [conf, cans]);


    let now = Math.floor(Date.now() / 1000);
    return (
        <Box maxW="1278" m="auto" pt="20" pb="20" className="mdp scbi">
            <Box textAlign="center" fontSize="50px">
                <span className="fontspecial">Top DeFi <Icon w={"30px"} color="blue.400" as={GiCannedFish} mb="-4"/>Canisters</span><Tag colorScheme="red">LIVE</Tag>
                <Box fontSize="14px" color="gray.500">Internet Computer DeFi canisters by token value</Box>
            </Box>


            <Stack mt="4" sx={{zoom:0.7, opacity:0.7}}>
                <Alert status='success'>
                    <AlertIcon />
                    Real-time data gathered from following ledger backlogs. Prices come from Neutrinite DeFi aggregator. New canisters with value will appear automatically.
                </Alert>
                <Alert status='info'>
                    <AlertIcon />
                    ICP Ledger notice - we can only track the main(null) subaccount of canisters. Fortunately most canisters use null subaccounts.
                </Alert>
                <Alert status='info'>
                    <AlertIcon />
                    Some ICRC ledgers are not indexed due to not properly implemented `get_transactions` (ICRC-3 predecessor).
                </Alert>
            </Stack>

            <Box textAlign={"center"} lineHeight="40px" color="gray.500"> 100% on-chain. Built with Motoko using <a target="_blank" className="somelink" href="https://mops.one/devefi-icp-ledger">mops:devefi-icp-ledger</a> <a target="_blank" className="somelink" href="https://mops.one/devefi-icrc-ledger">mops:devefi-icrc-ledger</a></Box>

            <Box className="fontspecial" fontSize="22px">Lil whale alerts <Icon as={GiSharkFin} mb="-5px"/></Box>
            <Box
                fontSize="12px"
                lineHeight="15px"
                height="300px"
                overflowY="scroll"
                border="1px dashed"
                borderColor="gray.700"
                padding="4"
                borderRadius="md"
                bg={deepbg}
                
            >
                <Stack>
                    {events.map((x, idx) =>
                        <HStack key={idx}>
                            <Box  minW="50px">{x.movetype}</Box>
                            <Box  color="gray.500" minW="220px">{x.name.length > 34? x.name.substring(0,34)+"...":x.name  }</Box>
                            <Box  minW="120px">{moment(x.time*1000).fromNow()}</Box>

                            <Box color="blue.500"   minW="120px"><DNumber currency={x.symbol} n={x.amount} anim={false} /></Box>
                            <Box color="green.500" minW="100px">${Math.round(x.amountUSD).toLocaleString()}</Box>
                            <Box>{x.txlink?<a href={x.txlink} target="_blank" className="somelink">{x.txid}</a>:x.txid}</Box>
                        </HStack>


                    )}
                </Stack>
            </Box>
            <Stack>
                {list.map((x, idx) => <Box key={x.id} borderTop="2px solid" borderColor={deepbg} pt="5" mt="5">
                    <Flex mb="3"  direction={{ base: 'column', md: 'row' }} >
                        <Box color="gray.600"><b>{idx + 1}.{" "}</b>{x.meta?.sns ? <Tag bg={deepbg}>SNS</Tag> : null} <Box as="span" color="gray.500" >{x.name}</Box></Box>
                        <Box color="green.500" pl="3"><DNumber currency={"USD"} n={x.sum} anim={false} /></Box>
                        <Spacer />

                        <Box pl="3">{x?.meta?.appurl ? <a href={x.meta.appurl} target="_blank">app <ExternalLinkIcon /></a> : null}</Box>
                      <Box color="gray.600" pl="3"><a href={"https://dashboard.internetcomputer.org/canister/" + x.id} target="_blank">{x.id} <ExternalLinkIcon /></a></Box>
                        <Box pl="3">{x?.meta?.icrc ? x.meta.icrc.map(t => <Tag>{t}</Tag>) : null}</Box>
                    </Flex>


                    <Box><Wrap>{x.tokens.map(([symbol, d]) => <Box w={{ base: '100%', md: '250px' }}  borderRadius="3" bg={deepbg} p={2} key={symbol} fontSize="10px" sx={{ position: "relative" }} pr="5">
                        <Box as="span" sx={{ fontSize: "14px", marginLeft: "-5px" }}><Box as="span" color="blue.400"><DNumberPlus currency={symbol} n={d[0]} /></Box><Box as="span" color="green.400" ><DNumber currency={"USD"} n={d[1]} anim={false} /></Box>
                        </Box>
                        <Box as="span" color="gray.500">
                            <Box>in: <Box as="span" color={d[2] > 10000 ? "orange" : ""}>+{smartNumber(d[2])}$ 24h</Box> | total +{smartNumber(d[3])} {symbol}</Box>
                            <Box>out: <Box as="span" color={d[4] > 10000 ? "orange" : ""}>-{smartNumber(d[4])}$ 24h</Box> | total -{smartNumber(d[5])} {symbol}</Box>
                            <Box color={(now - d[6] < 60 * 60 * 24 * 31) ? "green.400" : ""}>first seen: {new Date(d[6] * 1000).toLocaleDateString()}</Box>
                            {(now - d[6] < 60 * 60 * 24 * 31) ? <Box sx={{ position: "absolute", bottom: "-5px", right: "-5px" }}><Icon color="green.400" w={"22px"} h={"22px"} as={RiLeafFill} /></Box> : null}
                            {(d[2] > 10000 || d[4] > 10000) ? <Box sx={{ position: "absolute", top: "-5px", right: "-5px" }}><Icon color="orange.400" w={"22px"} h={"22px"} as={FaHotjar} /></Box> : null}

                        </Box>
                    </Box>)}</Wrap></Box>
                </Box>)}
            </Stack>

        </Box>
    );
};