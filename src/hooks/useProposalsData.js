import { useEffect, useState } from 'react';
import ic from '../icblast';

export const useProposalsData = (info, includeStatus = [], limit = 100) => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [did, setDid] = useState(null);

  useEffect(() => {
    const fetchDid = async () => {
      try {
        const didFile = await fetch(
          'https://raw.githubusercontent.com/dfinity/ic-js/main/packages/sns/candid/sns_governance.idl.js'
        ).then(x => x.text());
        setDid(didFile);
      } catch (error) {
        console.error('Error fetching DID file:', error);
      }
    };

    if (!did) {
      fetchDid();
    }
  }, [did]);

  useEffect(() => {
    const load = async () => {
      if (!did) return;

      setIsLoading(true);
      try {
        let can = await ic(info.sns.governance, did);

        let proposals = await can.list_proposals({
          include_reward_status: [],
          before_proposal: [],
          limit: limit,
          exclude_type: [], //0, 2, 5, 12, 8, 13, 7, 6, 9
          include_status: includeStatus,
        });

        let r = proposals.proposals.map(p => ({
          id: p.id[0].id,
          deadline: Number(
            p.wait_for_quiet_state[0].current_deadline_timestamp_seconds
          ),
          decided: p.decided_timestamp_seconds,
          url: p.proposal[0].url,
          summary: p.proposal[0].summary,
          title: p.proposal[0].title,
          action: Object.keys(p.proposal[0].action[0])[0],
          tally: p.latest_tally[0],
        }));
        setProposals(r);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [includeStatus, limit, info.sns.governance, did]);

  return { proposals, isLoading };
};
