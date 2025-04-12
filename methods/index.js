//
// The methods here are defined with sample parameters. They are meant to be used on the mainnet and might not work on other networks.
// Also, some of the parameters might stop working at some point. More refinement is needed to make them more robust.
//

export const filecoinChainHead = {
  name: "Filecoin.ChainHead",
  params: [],
};

export const filecoinStateMinerPower = {
  name: "Filecoin.StateMinerPower",
  params: ["t01000", []],
};

export const filecoinStateMinerInfo = {
  name: "Filecoin.StateMinerInfo",
  params: ["t01000", []],
};

export const filecoinStateMarketStorageDeal = {
  name: "Filecoin.StateMarketStorageDeal",
  params: [109704581, []],
};

export const ethChainId = {
  name: "eth_chainId",
  params: [],
};

export const ethCall = {
  name: "eth_call",
  params: [
    {
      data: "0xf8b2cb4f000000000000000000000000cbff24ded1ce6b53712078759233ac8f91ea71b6",
      from: null,
      gas: "0x0",
      gasPrice: "0x0",
      to: "0x0c1d86d34e469770339b53613f3a2343accd62cb",
      value: "0x0",
    },
    "latest",
  ],
};

export const ethGasPrice = {
  name: "eth_gasPrice",
  params: [],
};

export const ethGetBalance = {
  name: "eth_getBalance",
  params: ["0x6743938A48fC8799A5608EF079C53f3cF3B84398", "latest"],
};

export const ethGetBlockByNumber = {
  name: "eth_getBlockByNumber",
  params: ["latest", false],
};

export const ethBlockNumber = {
  name: "eth_blockNumber",
  params: [],
};

export const ethGetLogs = {
  name: "eth_getLogs",
  params: [{ fromBlock: "latest", address: "0x0000000000000000000000000000000000000000" }],
};

export const ethGetTransactionReceipt = {
  name: "eth_getTransactionReceipt",
  params: [
    "0xfa73d74442d959727e49f2b6c4f2a8576f81fe0c9b1f04d100bccbeefb7e9e19",
  ],
};

export const ethGetBlockByHash = {
  name: "eth_getBlockByHash",
  params: [
    "0x8733e021ee55d36ecbaa9576ad9eb5227ec3a1b57373aa033b6ae5960303fd05",
    false,
  ],
};

export const filecoinChainGetTipSetByHeight = {
  name: "Filecoin.ChainGetTipSetByHeight",
  params: [
    4816724,
    null,
  ],
};

export const filecoinWalletBalance = {
  name: "Filecoin.WalletBalance",
  params: ["f1m2swr32yrlouzs7ijui3jttwgc6lxa5n5sookhi"],
};

export const filecoinStateMinerPartitions = {
  name: "Filecoin.StateMinerPartitions",
  params: [
    "f03175111",
    0,
    null
  ],
};

export const filecoinStateReadState = {
  name: "Filecoin.StateReadState",
  params: [
    "f01234",
    [
      { "/": "bafy2bzacecggmht6w6f7zx3x4wcjldauapc2xgstc73bmvbwskox5qhubafds" },
      { "/": "bafy2bzacebb2finjxrnn6hsq4xfuhcmnk5nzky5fgmqbopotwzqc3xykeub7c" }
    ]
  ],
};

export const ethGetTransactionByHash = {
  name: "eth_getTransactionByHash",
  params: [
    "0x5a4bf6970980a9381e6d6c78d96ab278035bbff58c383ffe96a0a2bbc7c02322"
  ],
};

export const ethGetBlockReceipts = {
  name: "eth_getBlockReceipts",
  params: [
    "0x1b4"
  ],
};

export const filecoinStateLookupID = {
  name: "Filecoin.StateLookupID",
  params: [
    "f01234",
    [
      { "/": "bafy2bzacecggmht6w6f7zx3x4wcjldauapc2xgstc73bmvbwskox5qhubafds" },
      { "/": "bafy2bzacebb2finjxrnn6hsq4xfuhcmnk5nzky5fgmqbopotwzqc3xykeub7c" }
    ]
  ],
};

export const ethFeeHistory = {
  name: "eth_feeHistory",
  params: [
    "0x4",
    "latest",
    [25, 50, 75]
  ],
};

export const filecoinChainGetParentReceipts = {
  name: "Filecoin.ChainGetParentReceipts",
  params: [
    {
      "/": "bafy2bzacecp6xjixmincx7kyqmlgejr3ynp3uz2av4iwnnco6c7si23pfkop6"
    }
  ],
};

export const filecoinChainGetParentMessages = {
  name: "Filecoin.ChainGetParentMessages",
  params: [
    {
      "/": "bafy2bzacecp6xjixmincx7kyqmlgejr3ynp3uz2av4iwnnco6c7si23pfkop6"
    }
  ]
};

export const filecoinChainGetTipSet = {
  name: "Filecoin.ChainGetTipSet",
  params: [
    [
      {
        "/": "bafy2bzacec7fhpigs5q22hvfbgsilu7pyxrho3ribd74wka53vezjufpd4u3a"
      },
      {
        "/": "bafy2bzacecdokusaktiqx2xnex2o7n6wgidbtxhnweakkn5oiund7hovvf7w2"
      }
    ]
  ]
};

export const netVersion = {
  name: "net_version",
  params: [],
};

export const ethGetTransactionCount = {
  name: "eth_getTransactionCount",
  params: ["0x6743938A48fC8799A5608EF079C53f3cF3B84398", "latest"],
};

export const filecoinStateGetActor = {
  name: "Filecoin.StateGetActor",
  params: [
    "f01234",
    [
      {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      {
        "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
      }
    ]
  ],
};

export const filecoinChainReadObj = {
  name: "Filecoin.ChainReadObj",
  params: [
    {
      "/": "bafy2bzacecdcexybh5urgevm3vsqypphvtaphfkbrp5ypailznwsesxex4inc"
    }
  ]
};

export const filecoinGetActorEventsRaw = {
  name: "Filecoin.GetActorEventsRaw",
  params: [
    {
      "addresses": [],
      "fields": {},
      "from_height": 4816723,
      "to_height": 4816724,
      "tipset_key": null
    }
  ]
};

export const ethMaxPriorityFeePerGas = {
  name: "eth_maxPriorityFeePerGas",
  params: [],
};

export const ethGetStorageAt = {
  name: "eth_getStorageAt",
  params: [
    "0x6743938A48fC8799A5608EF079C53f3cF3B84398",
    "0x0",
    "latest"
  ],
};

export const ethEstimateGas = {
  name: "eth_estimateGas",
  params: [
    {
      from: "0x6743938A48fC8799A5608EF079C53f3cF3B84398",
      to: "0x6743938A48fC8799A5608EF079C53f3cF3B84398",
      value: "0x0",
      data: "0x"
    }
  ],
};

export const filecoinStateSearchMsg = {
  name: "Filecoin.StateSearchMsg",
  params: [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  ]
};

export const filecoinMsigGetAvailableBalance = {
  name: "Filecoin.MsigGetAvailableBalance",
  params: [
    "f024757",
    null
  ],
};

export const filecoinStateMinerSectorCount = {
  name: "Filecoin.StateMinerSectorCount",
  params: [
    "f01234",
    []
  ],
};

export const filecoinStateMinerSectors = {
  name: "Filecoin.StateMinerSectors",
  params: [
    "f01234",
    [],
    []
  ],
};

export const filecoinChainGetGenesis = {
  name: "Filecoin.ChainGetGenesis",
  params: [],
};

export const filecoinMsigGetPending = {
  name: "Filecoin.MsigGetPending",
  params: [
    "f024757",
    null
  ],
};

export const filecoinStateCall = {
  name: "Filecoin.StateCall",
  params: [
    {
      To: "f01234",
      From: "f01234",
      Value: "0",
      Method: 0,
      Params: ""
    },
    []
  ]
};

export const web3ClientVersion = {
  name: "web3_clientVersion",
  params: [],
};

export const filecoinMpoolGetNonce = {
  name: "Filecoin.MpoolGetNonce",
  params: [
    "f01234"
  ],
};

export const filecoinStateVerifiedClientStatus = {
  name: "Filecoin.StateVerifiedClientStatus",
  params: [
    "f01234",
    []
  ],
};

export const filecoinEthGetMessageCidByTransactionHash = {
  name: "Filecoin.EthGetMessageCidByTransactionHash",
  params: [
    "0xe1ef31966b8b8eb26bb0bd2d2f37a48afcd0ca55d1b55342bd1dc8543dcbc58f"
  ],
};

export const filecoinGasEstimateMessageGas = {
  name: "Filecoin.GasEstimateMessageGas",
  params: [
    {
      "Version": 0,
      "To": "f01234",
      "From": "f1alg2sxw32ns3ech2w7r3dmp2gl2fputkl7x7jta",
      "Nonce": 0,
      "Value": "1000000000000000000",
      "GasLimit": 0,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 0,
      "Params": ""
    },
    {
      "MaxFee": "5000000000000000000"
    },
    null
  ]
};

export const ethSyncing = {
  name: "eth_syncing",
  params: [],
};

export const filecoinStateNetworkName = {
  name: "Filecoin.StateNetworkName",
  params: [],
};

export const ethGetCode = {
  name: "eth_getCode",
  params: [
    "0x6743938A48fC8799A5608EF079C53f3cF3B84398",
    "latest"
  ],
};

export const filecoinStateMinerAvailableBalance = {
  name: "Filecoin.StateMinerAvailableBalance",
  params: [
    "f01234",
    []
  ],
};

export const filecoinStateDecodeParams = {
  name: "Filecoin.StateDecodeParams",
  params: [
    "f01234",
    0,
    "",
    []
  ],
};


//
// Groupings of methods. Either arbitrary or based on data shared by RPC providers.
//

// All methods we have implemented in test scripts so far.
export const allMethods = [
  // filecoinStateMarketStorageDeal,
  // ethChainId,
  // ethCall, // --------TIMEOUT
  // filecoinStateMinerInfo,
  // filecoinChainHead,
  // ethGetBalance,
  // ethGetBlockByNumber,
  // ethBlockNumber,
  // ethGetLogs,
  // ethGetTransactionReceipt,
  // ethGetBlockByHash, // --------TIMEOUT
  // filecoinChainGetTipSetByHeight,
  // filecoinWalletBalance,
  // filecoinStateMinerPartitions,
  // filecoinStateReadState, // --------ERRORS
  // ethGetTransactionByHash,
  // ethGetBlockReceipts, // --------TIMEOUT
  // filecoinStateLookupID, // --------ERRORS
  // ethFeeHistory,
  // filecoinChainGetParentReceipts, // --------ERRORS, bug, reported
  // filecoinChainGetParentMessages,
  // filecoinChainGetTipSet,
  // netVersion,
  // ethGetTransactionCount,
  // filecoinStateGetActor, // --------ERRORS, bug, reported
  // filecoinChainReadObj,
  // filecoinGetActorEventsRaw, // --------ERRORS, bug, reported, // TODO: Adjust params
  // ethMaxPriorityFeePerGas,
  // ethGasPrice,
  // ethGetStorageAt,
  // ethEstimateGas, // --------TIMEOUT
  // filecoinStateSearchMsg, // --------ERRORS, bug, reported
  // filecoinStateMinerPower,
  // filecoinMsigGetAvailableBalance,
  // filecoinStateMinerSectorCount,
  // filecoinStateMinerSectors,
  // filecoinChainGetGenesis,
  // filecoinMsigGetPending,
  // filecoinStateCall, // --------TIMEOUT
  // web3ClientVersion,
  // filecoinMpoolGetNonce,
  // filecoinStateVerifiedClientStatus,
  // filecoinEthGetMessageCidByTransactionHash,
  // filecoinGasEstimateMessageGas, // --------TIMEOUT
  // ethSyncing,
  // filecoinStateNetworkName,
  // ethGetCode,
  // filecoinStateMinerAvailableBalance,
];
