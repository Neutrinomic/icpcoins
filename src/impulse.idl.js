export const idlFactory = ({ IDL }) => {
  const Doc = IDL.Record({
    id: IDL.Nat64,
    title: IDL.Text,
    deleted: IDL.Bool,
    body: IDL.Text,
    meta: IDL.Text,
    createdAt: IDL.Nat32,
    tags: IDL.Vec(IDL.Nat32),
    author: IDL.Principal,
    updatedAt: IDL.Nat32,
  });
  return IDL.Service({
    create_topic: IDL.Func([Doc], [], []),
    latest_topics: IDL.Func([], [IDL.Vec(Doc)], ['query']),
  });
};
export const init = ({ IDL }) => {
  return [];
};
