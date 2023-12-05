export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Nat;
  const AssetClass = IDL.Variant({
    Cryptocurrency: IDL.Null,
    FiatCurrency: IDL.Null,
  });
  const Asset = IDL.Record({ class: AssetClass, symbol: IDL.Text });
  const PairConfig = IDL.Record({
    deleted: IDL.Bool,
    tokens: IDL.Tuple(TokenId, TokenId),
    config: IDL.Variant({
      xrc: IDL.Record({ quote_asset: Asset, base_asset: Asset }),
      oracle: IDL.Record({ id: IDL.Text }),
      icpswap: IDL.Record({ canister: IDL.Principal }),
      sonic: IDL.Record({ id: IDL.Text }),
      icdex: IDL.Record({ canister: IDL.Principal }),
    }),
  });
  const PairId = IDL.Nat;
  const SnsConfig = IDL.Record({
    root: IDL.Principal,
    swap: IDL.Principal,
    ledger: IDL.Principal,
    other_treasuries: IDL.Vec(
      IDL.Record({
        token_id: TokenId,
        owner: IDL.Principal,
        subaccount: IDL.Vec(IDL.Nat8),
      })
    ),
    index: IDL.Principal,
    governance: IDL.Principal,
    treasury_subaccount: IDL.Vec(IDL.Nat8),
  });
  const TokenLocking = IDL.Variant({
    ogy: IDL.Null,
    sns: SnsConfig,
    none: IDL.Null,
  });
  const Time = IDL.Int;
  const TokenDetail = IDL.Variant({
    link: IDL.Record({ href: IDL.Text, name: IDL.Text }),
    sns_sale: IDL.Record({
      end: Time,
      sold_tokens: IDL.Nat,
      price_usd: IDL.Float64,
    }),
  });
  const TokenConfig = IDL.Record({
    decimals: IDL.Nat,
    deleted: IDL.Bool,
    locking: TokenLocking,
    name: IDL.Text,
    ledger: IDL.Variant({
      none: IDL.Null,
      icrc1: IDL.Record({ ledger: IDL.Principal }),
      dip20: IDL.Record({ ledger: IDL.Principal }),
    }),
    details: IDL.Vec(TokenDetail),
    symbol: IDL.Text,
  });
  const Frame = IDL.Variant({
    t1d: IDL.Null,
    t1h: IDL.Null,
    t5m: IDL.Null,
  });
  const High = IDL.Float64;
  const Low = IDL.Float64;
  const LastBid = IDL.Float64;
  const LastAsk = IDL.Float64;
  const Volume24 = IDL.Float64;
  const DepthBid50 = IDL.Vec(IDL.Float64);
  const DepthAsk50 = IDL.Vec(IDL.Float64);
  const TickItem = IDL.Tuple(
    High,
    Low,
    LastBid,
    LastAsk,
    Volume24,
    DepthBid50,
    DepthAsk50
  );
  const LatestTokenRow = IDL.Tuple(
    IDL.Tuple(TokenId, TokenId),
    IDL.Text,
    IDL.Float64
  );
  const LatestExtendedTokenTickItem = IDL.Record({
    fee: IDL.Nat,
    dissolving_30d: IDL.Nat,
    circulating_supply: IDL.Nat,
    other_treasuries: IDL.Vec(IDL.Tuple(TokenId, IDL.Nat)),
    total_locked: IDL.Nat,
    dissolving_1d: IDL.Nat,
    dissolving_1y: IDL.Nat,
    total_supply: IDL.Nat,
    treasury: IDL.Nat,
  });
  const LatestExtendedRate = IDL.Record({
    to_token: TokenId,
    rate: IDL.Float64,
    volume: IDL.Float64,
    depth50: IDL.Float64,
    depth2: IDL.Float64,
    depth8: IDL.Float64,
    symbol: IDL.Text,
  });
  const LatestExtendedToken = IDL.Record({
    id: TokenId,
    last: IDL.Opt(LatestExtendedTokenTickItem),
    config: TokenConfig,
    rates: IDL.Vec(LatestExtendedRate),
  });
  const TickShared = IDL.Vec(IDL.Opt(TickItem));
  const GetError = IDL.Variant({ invalid_frame: IDL.Null });
  const Result_3 = IDL.Variant({
    ok: IDL.Record({
      first: Time,
      data: IDL.Vec(TickShared),
      last: Time,
      updated: Time,
    }),
    err: GetError,
  });
  const LockingTick = IDL.Record({
    not_dissolving: IDL.Vec(IDL.Nat),
    other_treasuries: IDL.Vec(IDL.Tuple(TokenId, IDL.Nat)),
    total_locked: IDL.Nat,
    dissolving: IDL.Vec(IDL.Nat),
    treasury: IDL.Nat,
  });
  const TokenTickItem = IDL.Record({
    fee: IDL.Nat,
    locking: IDL.Opt(LockingTick),
    circulating_supply: IDL.Nat,
    total_supply: IDL.Nat,
  });
  const TokenTickShared = IDL.Vec(IDL.Opt(TokenTickItem));
  const Result_2 = IDL.Variant({
    ok: IDL.Record({
      first: Time,
      data: IDL.Vec(TokenTickShared),
      last: Time,
      updated: Time,
    }),
    err: GetError,
  });
  const ErrorCode = IDL.Variant({
    canister_error: IDL.Null,
    call_error: IDL.Record({ err_code: IDL.Nat32 }),
    system_transient: IDL.Null,
    future: IDL.Nat32,
    canister_reject: IDL.Null,
    destination_invalid: IDL.Null,
    system_fatal: IDL.Null,
  });
  const ErrorLine = IDL.Tuple(Time, IDL.Text, ErrorCode, IDL.Text);
  const Result = IDL.Variant({ ok: IDL.Null, err: IDL.Text });
  const OraclePushError = IDL.Variant({
    not_in_validator_set: IDL.Null,
    too_early: IDL.Null,
  });
  const Result_1 = IDL.Variant({ ok: Time, err: OraclePushError });
  const NodeInfoShared = IDL.Record({
    bad: IDL.Nat,
    principal: IDL.Principal,
    good: IDL.Nat,
    last: Time,
    name: IDL.Text,
  });
  return IDL.Service({
    controller_addPair: IDL.Func([PairConfig], [PairId], []),
    controller_addToken: IDL.Func([TokenConfig], [TokenId], []),
    controller_collect_token: IDL.Func([TokenId], [], []),
    controller_deletePair: IDL.Func([PairId], [], []),
    controller_deleteToken: IDL.Func([TokenId], [], []),
    controller_modifyToken: IDL.Func([TokenId, TokenConfig], [], []),
    dbg_counter: IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
    export_pair: IDL.Func(
      [Frame, Time, IDL.Nat, IDL.Nat],
      [IDL.Vec(IDL.Opt(TickItem))],
      []
    ),
    get_config: IDL.Func(
      [],
      [
        IDL.Record({
          tokens: IDL.Vec(TokenConfig),
          pairs: IDL.Vec(PairConfig),
        }),
      ],
      ['query']
    ),
    get_latest: IDL.Func([], [IDL.Vec(LatestTokenRow)], ['query']),
    get_latest_extended: IDL.Func(
      [],
      [IDL.Vec(LatestExtendedToken)],
      ['query']
    ),
    get_pairs: IDL.Func(
      [Frame, IDL.Vec(IDL.Nat), IDL.Opt(Time), IDL.Opt(Time)],
      [Result_3],
      ['query']
    ),
    get_tokens: IDL.Func(
      [IDL.Vec(IDL.Nat), IDL.Opt(Time), IDL.Opt(Time)],
      [Result_2],
      ['query']
    ),
    import_pair: IDL.Func(
      [Frame, Time, IDL.Nat, IDL.Vec(IDL.Opt(TickItem))],
      [],
      []
    ),
    log_show: IDL.Func([], [IDL.Vec(ErrorLine)], ['query']),
    oracle_add: IDL.Func([IDL.Text, IDL.Principal], [Result], []),
    oracle_push: IDL.Func(
      [IDL.Record({ data: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Float64)) })],
      [Result_1],
      []
    ),
    oracle_rem: IDL.Func([IDL.Principal], [Result], []),
    oracles_get: IDL.Func([], [IDL.Vec(NodeInfoShared)], ['query']),
  });
};
