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
    Stack, Wrap, HStack
} from '@chakra-ui/react'

import { DNumber } from './DNumber';
export const CanScan = () => {


    let [list, setList] = useState([]);
    let [events, setEvents] = useState([]);


    let nonsense = ["quzhj-7aaaa-aaaag-qjwga-cai", "ddhwp-fqaaa-aaaag-qcgoa-cai"];
    let load = async () => {
        let aggr = await ic("u45jl-liaaa-aaaam-abppa-cai");
        let conf = await aggr.get_config();

        let can = await ic("p2clb-ryaaa-aaaal-qjpia-cai");

        let rez = await can.getAccounts();
        let cans_r = toState(await can.getKnownCanisters());
        let cans = {};
        for (let z of cans_r) {
            cans[z[0]] = z[1];
        }

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
            let my = conf.tokens.find(y => {
                if (!(y?.ledger?.icrc1?.ledger)) return false;

                return y.ledger.icrc1.ledger.toText() == id;
            });
            if (!my) return false;
            let symbol = my.symbol;
            let decimals = Number(my.decimals);
            return {symbol, decimals}
        }

        let rezT = rez.map((x) => {

            let foundLedger = getLedgerInfo(x.id.toText());
            if (!foundLedger) return false;
            let {symbol, decimals} = foundLedger;

            for (let acc of x.accounts) {
                let accId = acc[0].toText();
                if (!byAccount[accId]) byAccount[accId] = {}

                byAccount[accId][symbol] = [
                    Number(acc[1]) / (10 ** decimals),
                    getPrice(Number(acc[1]) / (10 ** decimals), x.id.toText()),
                    Number(acc[2]) / (10 ** decimals),
                    Number(acc[3]) / (10 ** decimals),
                    Number(acc[4]) / (10 ** decimals),
                    Number(acc[5]) / (10 ** decimals),
                ]

            };
            return {
                id: x.id,
                symbol,
                accounts: x.accounts.map((z) => getName(z[0].toText()) + " " + Number(z[1]) / (10 ** decimals)),
                reader: x.reader
            }
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

            return { name: getName(x), id: x, sum, tokens };
        }).filter(Boolean).filter(x => {
            return x.sum > 1000;
        });



        setList(orv)

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
        // setEvents(toState(evs))
        // console.log(evs)
        // console.log(Object.keys(orv).length)
        // console.log(orv)
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            load();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    // public type WhaleEvent = {
    //     ledger : Principal;
    //     move: {
    //         #mint: Nat;
    //         #tin : Nat;
    //         #tout : Nat;
    //         #burn : Nat;
    //     };
    //     time: Nat32;
    //     owner: Principal;
    // };
    return (
        <Box maxW="1278" m="auto" pt="20" pb="20" className="mdp">
            <Stack>
                {events.map((x,idx) => 
                    <HStack key={idx}>
                    <b>{x.movetype}</b>{" "}
                    <Box> {x.owner}</Box>
                        <Box>{new Date(x.time*1000).toLocaleTimeString()} {new Date(x.time*1000).toLocaleDateString()}</Box>
                        
                        <DNumber currency={x.symbol} n={x.amount} />
                        <Box>${Math.round(x.amountUSD).toLocaleString()}</Box>
                    </HStack>
                    
                   
                )}
            </Stack>
        <Stack>
                        {list.map((x) => <Box key={x.id}><Box>
                            <a href={"https://dashboard.internetcomputer.org/canister/" + x.id} target="_blank">{x.name}</a>
                            {" "}<DNumber currency={"USD"} n={x.sum} anim={false} />
                        </Box>
                            <Box><Wrap>{x.tokens.map(([symbol, d]) => <Box borderRadius="3" border="1px solid" borderColor={"gray.700"} p={1} key={symbol}><span style={{ fontSize: "10px", marginLeft: "-5px" }}>
                                
                                {" "}<DNumber currency={symbol} n={d[0]} /><span style={{ fontWeight: "bold" }}><DNumber currency={"USD"} n={d[1]} anim={false} /></span>
                                <Box>IN: +{d[2].toLocaleString()} 24h | total +{d[3].toLocaleString()}</Box>
                                <Box>OUT: -{d[4].toLocaleString()} 24h | total -{d[5].toLocaleString()}</Box>
                            </span></Box>)}</Wrap></Box>
                        </Box>)}
                    </Stack>
               
        </Box>
    );
};