// Helper function to add edges to the graph
function addEdge(graph, src, dest, pairSource) {
  if (!graph[src]) {
    graph[src] = [];
  }
  graph[src].push({ dest, pairSource });
}

function dfs(
  graph,
  start,
  end,
  visited,
  path,
  pairSources,
  maxDepth,
  allPaths
) {
  // Stop if maxDepth is reached
  if (path.length > maxDepth) return;

  visited[start] = true;
  path.push(start);

  if (start === end) {
    allPaths.push({
      tokens: [...path],
      pairs: [...pairSources],
    });
  } else {
    for (let i = 0; i < graph[start].length; i++) {
      const { dest, pairSource } = graph[start][i];
      if (!visited[dest]) {
        pairSources.push(pairSource);
        dfs(graph, dest, end, visited, path, pairSources, maxDepth, allPaths);
        pairSources.pop(); // Backtrack
      }
    }
  }

  path.pop();
  visited[start] = false;
}

export function findSwapPaths(config, startToken, endToken, maxDepth) {
  const graph = {};

  // Build the graph from the config
  config.forEach((item, idx) => {
    if (!item.deleted) {
      const tokens = item.tokens;
      const pairSource = idx; //Object.keys(item.config)[0]; // Assuming one key per item
      if ('oracle' in item.config) return;
      if (tokens[0] > 4 && tokens[1] > 4) {
        // console.log('skipping', tokens);
        return;
      } // We always want to keep ICP, USD, BTC etc at the start/end of the path
      addEdge(graph, tokens[0], tokens[1], pairSource);
      addEdge(graph, tokens[1], tokens[0], pairSource); // Assuming the swaps can go both ways
    }
  });

  const visited = {};
  const path = [];
  const pairSources = [];
  const allPaths = [];

  try {
    dfs(
      graph,
      startToken,
      endToken,
      visited,
      path,
      pairSources,
      maxDepth,
      allPaths
    );
  } catch (e) {}

  return allPaths;
}

///

export function calculatePathPrice(inc, getPrice, time, interval='t1h') {
  try {
    let path = inc.tokens;
    let pathPrice = 1; // Initialize to 1 as we'll be multiplying prices
    let volume24h = 0;
    let depthBid = 0;
    let depthAsk = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const x = getPrice(path[i], path[i + 1], inc.pairs[i], time, interval);

      const p = x.p;
      let price = (p[2] + p[3]) / 2;
      if (x.rev) price = 1 / price;

      pathPrice *= price;

      if (i === 0) {
        volume24h = x.p[4];
        depthBid = x.rev ? x.p[6][6] : x.p[5][6];
        depthAsk = x.rev ? x.p[5][6] : x.p[6][6];
        depthAsk = depthAsk / price;
      }
    }

    depthBid = depthBid * pathPrice;
    depthAsk = depthAsk * pathPrice;

    return { price: pathPrice, volume24h, depthBid, depthAsk };
  } catch (e) {
    return {
      price: undefined,
      volume24h: undefined,
      depthBid: undefined,
      depthAsk: undefined,
    };
  }
}
