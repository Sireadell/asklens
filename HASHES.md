# Signal hashes

Every row below is a real Telegraph miner response that AskLens paid for
and received. Each carries the `signal_hash` the network returned, which is
resolvable at the Engine by anyone, and the on-chain transaction that settled
the x402 payment for it. Nothing here is generated, replayed, or estimated:
if a call failed, it is not in this file.

**720 signals** across 14 intents and 5 miners.

- Collected: 2026-09-07T21:59:30.824Z to 2026-09-07T22:20:52.435Z
- Paid by: `0xA8Ae7deF7692C81a0Cb8Cd8eD55B60a56e417076` (Base Sepolia test USDC)
- Settled on-chain: 720 of 720
- Spent: $7.20 in test USDC

## Per intent

| Intent | Signals |
|---|---|
| URL_SCAN | 342 |
| FRAUD_DETECTION | 49 |
| CRYPTO_PRICE | 41 |
| STOCK_PRICE | 41 |
| WEATHER_FORECAST | 40 |
| STORM_ALERT | 39 |
| SSL_VERIFICATION | 35 |
| IP_GEOLOCATION | 27 |
| TVL_LOOKUP | 26 |
| WALLET_BALANCE_CHECK | 25 |
| TOKEN_HOLDER_COUNT | 20 |
| ACADEMIC_SEARCH | 20 |
| GAS_PRICE | 9 |
| ONCHAIN_TX_LOOKUP | 6 |

## Per miner

| Miner | Signals |
|---|---|
| TxLens | 329 |
| NetWire URL Scan | 114 |
| URL Sentinel | 114 |
| PREFLIGHT Infrastructure Signals | 114 |
| Telegraph Sentinel | 49 |

Two of these miners, TxLens and Telegraph Sentinel, are ours. The rest are
other teams'. AskLens routes a link check to three independent URL scanners
on purpose, because one source agreeing with itself is not corroboration.

## Every signal

| # | Intent | Miner | Input | Signal hash | Payment tx |
|---|---|---|---|---|---|
| 1 | URL_SCAN | NetWire URL Scan | `https://example.com` | `0x28e371fcbc4b24952ba8ef3c811d97ea3adab378c714a9afbbcd43e7f17dfcbf` | `0xd79d74f2de4d8c86...` |
| 2 | URL_SCAN | URL Sentinel | `https://example.com` | `0x61e7a7bbf6013b7b526847760bdfcf984309963981e60a200232106fa1b1c2d6` | `0x94f9039494b707a1...` |
| 3 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://example.com` | `0x45d1c80bb24cc7c7b91a6317dcf3c44109eeb7e20f989f141b0668ce2223218a` | `0x99701231b0a78031...` |
| 4 | URL_SCAN | NetWire URL Scan | `https://wikipedia.org` | `0x24f22629390945b4cf383fcda39cc24ea1768a43606f4c72dd575a80541d05f1` | `0xd7dac75cb8c7b53e...` |
| 5 | URL_SCAN | URL Sentinel | `https://github.com` | `0x6eebdec456e640dfd07f131165b0cd7643efa2be182c8dff03302ee612c4be79` | `0xcd20a13b0c9127b7...` |
| 6 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://wikipedia.org` | `0xd7618a213badb1900203630d87a5e9acca046716fb95c018a1a7e919f64a9fe7` | `0x8a673599ab7dcbbb...` |
| 7 | URL_SCAN | NetWire URL Scan | `https://github.com` | `0x19895267d2e101b0945040bac1c063e4b6797ff51e4bb2e71e3cfab0ae9c1bdd` | `0x12b47473bab72824...` |
| 8 | URL_SCAN | NetWire URL Scan | `https://microsoft.com` | `0x4bd1fb5eb3637058ba5387e313fdb89fccaabb3560d7a60bc9ac5ad2bb5450e1` | `0xc507325c6c1f6279...` |
| 9 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://github.com` | `0x43d1c1196628c65bae234bc1696bc760341a2ba115f2dc77a04a60dc3809ef24` | `0xf5cabf853760309c...` |
| 10 | URL_SCAN | URL Sentinel | `https://wikipedia.org` | `0xb67147f4edf73952b0e28744e5fb96e0fc896d5b6863dc1ce5bad4ec50f3b61d` | `0x978e074ac703e659...` |
| 11 | URL_SCAN | URL Sentinel | `https://microsoft.com` | `0x3acb19b64a9edacc348941e90507546e6e9675d68f0adea1849b03555eb26510` | `0x78192c528610a69b...` |
| 12 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://microsoft.com` | `0x2b93f3147d9d985f33dc500b605875e824a1e6f654f995033fb7b5521508a140` | `0xc696f47251963817...` |
| 13 | URL_SCAN | URL Sentinel | `https://cloudflare.com` | `0xbf856f5c376377a6c137e791d05c012d8f811fbe9c89333f02f0bf241124f86b` | `0x90415d3c061009fb...` |
| 14 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://cloudflare.com` | `0x0948e5e2f12dfdbe0be2d30d7228e3b61786a68dd572381aa3dd89232a929f61` | `0x2cccfb320c4ec515...` |
| 15 | URL_SCAN | NetWire URL Scan | `https://mozilla.org` | `0xb96275c5993ab38b7e702d64a0718ac5db28c9ca17b988983dc9b57c64b9b2a2` | `0x0d1f357f5fd7f168...` |
| 16 | URL_SCAN | NetWire URL Scan | `https://cloudflare.com` | `0x2b4f574bfc904a89e2aa1f095a41230637abba0588fbb196a094968f7260911b` | `0xcbc5e65f37ee431c...` |
| 17 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://mozilla.org` | `0x7ed5879c11170a09c30ff6ac3bb6a551e2380bd5cdc56e1b2d84c0048b930fc2` | `0x44d5276b906f8e1c...` |
| 18 | URL_SCAN | NetWire URL Scan | `https://stackoverflow.com` | `0xa5c388ff4424f6b13f1f41432ee2fe26ce4ead9492cf6e01793dfaf3487f75a9` | `0x0eb15a5b049ce45f...` |
| 19 | URL_SCAN | URL Sentinel | `https://stackoverflow.com` | `0xf3f15370f77b1ec9d20ac0aa1b0ed7c982820b42579deb305019469ede7ad804` | `0xc7e1d6392d3092b6...` |
| 20 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://stackoverflow.com` | `0x6e4fe400aca85d60ef58bc13b7bac9e4aeb3a7dbc7d42418adfe839760cf0163` | `0x8f6c50e4c6b1b6a1...` |
| 21 | URL_SCAN | NetWire URL Scan | `https://npmjs.com` | `0xcb754412c9551d10a9dfb5a0fe876100aad4f2f1ba6b321944c0fe3c0b4ccf23` | `0xa28d30738159dc2d...` |
| 22 | URL_SCAN | URL Sentinel | `https://npmjs.com` | `0x32c6fd4e9cb8cfa99b86f82930ff34ff2156eb770b57cc4ac334173b0d3477b9` | `0x41f0f6e4fbc0f57e...` |
| 23 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://npmjs.com` | `0xe5d75a515346348809b8ae19e11eaa508d2d08c633702cbfa8f50a6f9b72a80c` | `0x674801b8ccb2b255...` |
| 24 | URL_SCAN | NetWire URL Scan | `https://python.org` | `0x69b3e102453b232d475930f488ebdba6622e40603ae36ef3a881d754382592a4` | `0xd3c56a7c77a46993...` |
| 25 | URL_SCAN | URL Sentinel | `https://mozilla.org` | `0xf3b8531329ef20932b04a80616a439294d5b61a4009868436888dea2ce87c449` | `0x6c0da7e7c3e397a9...` |
| 26 | URL_SCAN | URL Sentinel | `https://python.org` | `0xb569e537cafdbb29beda180a7b65a7e6b8ad6cb36f44e3e40b2430381a49782f` | `0x72df8daa2057693c...` |
| 27 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://python.org` | `0x79c1000fb15e0b21a276971ec4562c499285762bb0287f5fb21587de47dcdb81` | `0x8a7ba940c05a9f0d...` |
| 28 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://kernel.org` | `0x7d763a45dc00bae6af33eb33dce748e2aa74db03a3d81e4b7b22d4f233a11375` | `0x3b83bbd21ef0ebb5...` |
| 29 | URL_SCAN | NetWire URL Scan | `https://apache.org` | `0x63f086d3b2a4621b17de17056e6d458cfae7f85e1d2a8deb1f8cd77902f5ca92` | `0xb6d630f2ce44a73d...` |
| 30 | URL_SCAN | NetWire URL Scan | `https://kernel.org` | `0xcc56918e9d2d2d6337e7582007ad4d3dba667081a7bd536ba6bc8acf9e0736d5` | `0xc602af0ebbdf01c1...` |
| 31 | URL_SCAN | URL Sentinel | `https://apache.org` | `0x2a44e630626697e8807debb7ee5fddc8aed639bc8d39d96082b1cd51d6b7e533` | `0x9b6bb575f90dc7eb...` |
| 32 | URL_SCAN | NetWire URL Scan | `https://debian.org` | `0x0c7b7d5a86d93748e25aca5a8c88e502e69bb83452acd37b5c533d9f4c2dd1c2` | `0xa14f776dac1e6032...` |
| 33 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://apache.org` | `0x81d3589109731ca377bd6bc851d3b88a8f87f652f60ad3e93045d3957a281865` | `0x358b3170bf6543e0...` |
| 34 | URL_SCAN | URL Sentinel | `https://kernel.org` | `0xdc30e42cf66683bd24bcd4487c79c92b70e307c45975b599225b2cf0b4fb79b2` | `0xf2b1e175ede6ca68...` |
| 35 | URL_SCAN | URL Sentinel | `https://debian.org` | `0x52ba33856fa9eb5ed2987b67d932aae070d6767b7f00daf3a3125259c6f79070` | `0x726131b12cc0ccb1...` |
| 36 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://debian.org` | `0xd19b44bb523560b08229ac8255ac4bb6f06364781b6bb108847a69ee083953fc` | `0x39d8fa91a00496e8...` |
| 37 | URL_SCAN | URL Sentinel | `https://ubuntu.com` | `0x465807a490183c761f996c1dcd6766393cef5e533493af65546d976e5d81039d` | `0x9bf734524615cbaa...` |
| 38 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ubuntu.com` | `0x01933a1b241990ab40514fcf976a7ea55dc194450fb4336828b643b5b9febc7f` | `0xd7899e6fac3f9f76...` |
| 39 | URL_SCAN | URL Sentinel | `https://nodejs.org` | `0xd031fc38814edb87a6bc8a8b06ddbfff7375583f2ee2d816983d50204f65ac8c` | `0x617a5cb37c5a0fb5...` |
| 40 | URL_SCAN | NetWire URL Scan | `https://ubuntu.com` | `0x2ec99bde9d7bfad80757a7f476bb482b64975e9d82fd0a0aa9bfb8e815914c55` | `0xa987f77db9a209ec...` |
| 41 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://nodejs.org` | `0x5c790944770797728ef50fa38b1d474b2c99051dede2a9b51347e999789f7f4f` | `0xa38515403f01606b...` |
| 42 | URL_SCAN | NetWire URL Scan | `https://rust-lang.org` | `0x5797ecd86e97b068d7a7debd017eed07b1f38cd6d5c9c6432182f564a866f992` | `0x8d05abcd54c97e7a...` |
| 43 | URL_SCAN | URL Sentinel | `https://rust-lang.org` | `0xf55f179ef3e175e77685e49a17147e2a72cba488f4114560679fb9d8344974c7` | `0xba06a22740a5d9db...` |
| 44 | URL_SCAN | NetWire URL Scan | `https://nodejs.org` | `0xf9de982603800b2025a8e7659a58ded68c1408feecd629bea7c112d1a26b525c` | `0xc6ed5f40a6b2da36...` |
| 45 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://rust-lang.org` | `0x505861550d18600d83a89d73f442c8da8913daf765505895b1e9a98bc76ee7ca` | `0x1f15561602cb2f1c...` |
| 46 | URL_SCAN | NetWire URL Scan | `https://go.dev` | `0x389ac7de55a5dc41fe7e273fae8515c02378f3136655df6858fc5fa8853799d7` | `0xd3dc13e54f9d82ef...` |
| 47 | URL_SCAN | URL Sentinel | `https://go.dev` | `0xa82e853cd30155a63d2b6cfed0b553141d7dd094abfa4ab51fb33fda67c06c76` | `0xfd17b4d981577bec...` |
| 48 | URL_SCAN | NetWire URL Scan | `https://gitlab.com` | `0x6d71d470be2e619f80b023442abba1a19e3d84061ce7c9fa7a306376eadfe4c1` | `0x906b9b3019554da8...` |
| 49 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://go.dev` | `0x3f7172c3fe67b5cd01227d18ebb2d1fc340dbd088ab58081a6f00f23f943b1a6` | `0xbce7d71324425af3...` |
| 50 | URL_SCAN | NetWire URL Scan | `https://bitbucket.org` | `0x0b28be46499c9ff6771fc7446e3f0d8e60f07c33949d775726dbe20a2d127743` | `0x33a60d2c16db2851...` |
| 51 | URL_SCAN | URL Sentinel | `https://bitbucket.org` | `0x24d3e133881f38c1aecfbe3438321d4715c665a78b1de7eabe9705dfdfc6676c` | `0xbcdfa7f80a2c8652...` |
| 52 | URL_SCAN | URL Sentinel | `https://gitlab.com` | `0xee8a849397b2fa0fb93088f2b505c3c7babd4f303bb811d6ab406161bbd6e0f7` | `0xcbb00e684a4b994f...` |
| 53 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://gitlab.com` | `0x07ec618424760a9b78329e154d7ca03a232b7fb27fd2cf639a069a0bb87d1c4e` | `0x98c772eb512eddbe...` |
| 54 | URL_SCAN | NetWire URL Scan | `https://archive.org` | `0xc67eeb3113c52b875f73e11654f248ad8b282ea39fed0e871b9bbfa8ae96eea3` | `0x085b4a3cf0b71a56...` |
| 55 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://bitbucket.org` | `0x74453f9d6db94708bf09902117dcba5e840db3559400a931a6222470c9578b82` | `0x2960f23925606450...` |
| 56 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://archive.org` | `0xd7e97e735123e9d0f97394d5df60470e44b57f996a1f022fd80114736441e951` | `0x430445da04bc9027...` |
| 57 | URL_SCAN | URL Sentinel | `https://archive.org` | `0x6a84e01a73a604f5208d8cd4e5c3e5cc583a7ec7903e58c621b708d8ad464abd` | `0x573ce2b5a8f1098c...` |
| 58 | URL_SCAN | URL Sentinel | `https://ietf.org` | `0xf766eed71b3caf3ae8af4216d4c27246e16047d8fa7c99eaf2d08f0961b75b37` | `0x1f8874466abcfa6c...` |
| 59 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ietf.org` | `0x1636b6be9abaa94d0a48217f2650e56bc1324fd4fb19b28e81e412e13dfc7661` | `0xe09a3af51d494292...` |
| 60 | URL_SCAN | NetWire URL Scan | `https://w3.org` | `0x248df89e86c73cc25239edde963a64ab7b0adb2c62cf51a35058f59cfc7c0f70` | `0xe9f1aec2227ca445...` |
| 61 | URL_SCAN | URL Sentinel | `https://w3.org` | `0x1007a6c68a114872499cadc4ce836d298213da388680d2e515697173e98f7279` | `0x25e3bbd8e9521b4f...` |
| 62 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://w3.org` | `0x2f1985af52ba686186c715f4a008c984596b980cc6b52f2a6ea50ac9f44ad901` | `0x895737cfd374a672...` |
| 63 | URL_SCAN | NetWire URL Scan | `https://letsencrypt.org` | `0xd1a8531626ea10c9adf75d8e0d82ee1d29386663f069862dca547576d800fd16` | `0xdd3ca0284f2f3e36...` |
| 64 | URL_SCAN | NetWire URL Scan | `https://ietf.org` | `0x7c48485663198a778723962af08bcbfa7d5bf120a190e8be51243161eba5a0a8` | `0xa5d48e86f63d771d...` |
| 65 | URL_SCAN | URL Sentinel | `https://letsencrypt.org` | `0x1d4eca72cee0a6c7ea74891829e86ee63660b2b3c7d97865a50bf2154d256f39` | `0xb6415c1e6b105a99...` |
| 66 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://letsencrypt.org` | `0xd43bb81956136a4dfe135845e8dab3f1e3687b10758c27b2fbc3ade39e852012` | `0x0309cf9be8464882...` |
| 67 | URL_SCAN | NetWire URL Scan | `https://openssl.org` | `0x883a7d36653c2aa5de6c80dab2219f014174ca46797d379d98dd6764eae659a7` | `0xd1cb887755b89b72...` |
| 68 | URL_SCAN | URL Sentinel | `https://openssl.org` | `0x01da6470070f3700a45bab3d73a58bc7fbc6075b87355e48799c7bf24606971d` | `0x9e1a43020d13751e...` |
| 69 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://openssl.org` | `0x55dc89e3ff098b1c29ec4326d9af4d944d93cc8d29b50cc875e8f9587e1ac5cf` | `0x54862f56317dfe20...` |
| 70 | URL_SCAN | NetWire URL Scan | `https://redis.io` | `0xbfbf3b5c79e3108dbdfe431e8b49e4af3de94c437fb62a803b4b973a283f1722` | `0xe62576b9ed49ac5d...` |
| 71 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://postgresql.org` | `0x7381123bdef8fdb9aa7157f17bc4b14b88fbe753faf9153b2b7ea9e1bc254a9e` | `0x1bee60e146c471a0...` |
| 72 | URL_SCAN | URL Sentinel | `https://postgresql.org` | `0x0df6508df896dc9f346cbf43b29a51ed17f58a7f9414397c9fe30dc88056a954` | `0x1579a02ad8e40264...` |
| 73 | URL_SCAN | NetWire URL Scan | `https://postgresql.org` | `0x7af499851a85049fc944ef545879a0439e2cd322341b9827f773a5ebcc5e6223` | `0x80cf011db4c0d201...` |
| 74 | URL_SCAN | URL Sentinel | `https://redis.io` | `0xd07b60a30299850a552678d81607bb4fddb7c5a8071f5dee3d93da59479cf998` | `0xb0cc5f7bc4ff6757...` |
| 75 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://redis.io` | `0x83456dcde91fedf7abdb676c74802cce4901a104e32b3c718b343615d8b83fdb` | `0x6bf6e876a4153594...` |
| 76 | URL_SCAN | URL Sentinel | `https://nginx.org` | `0xd8c6c7911a5dd489ad90408a89bdfbe38e66030d47f0d58aa877e99c0463c842` | `0xeb764dad6f052d94...` |
| 77 | URL_SCAN | NetWire URL Scan | `https://nginx.org` | `0xfdb462d2cc12041fd9b1a77507ea980fe8d1596f3cd9410df10b27cba721557f` | `0xc8831ac1db56f5eb...` |
| 78 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://nginx.org` | `0xb431ebc0ecfcf75bd9dff9a4b46a03fcc5e3f01da00124e664f275d1080b54ea` | `0x15ed4e53bc0b941a...` |
| 79 | URL_SCAN | NetWire URL Scan | `https://docker.com` | `0x2bea35118f4fd773dfd64f663f7dd82402aacbb96c1400ffacd6c85841729a90` | `0xb265273d86bcb232...` |
| 80 | URL_SCAN | URL Sentinel | `https://docker.com` | `0x7ddcab1a2a27f084fb8f0d4d90b8965c182541667471f5f578421315612e62bd` | `0xcc4a6cfd19179f6a...` |
| 81 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://docker.com` | `0xdc75e638e440fb9d26526a1b0b5361e922ed7f6a62883e48d2efd7304ddad16b` | `0x75d4e9a1e2c3f9af...` |
| 82 | URL_SCAN | NetWire URL Scan | `https://kubernetes.io` | `0xf38d3f416951ad729095119915804880c293bca2676564cdc8807de8a541432c` | `0x9938f6a498e75518...` |
| 83 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://kubernetes.io` | `0xf61f27182feab5d3b9dbaba6dc2571d6db67a74507c358c1d2882c854f295c9b` | `0xc04fc48414805de1...` |
| 84 | URL_SCAN | URL Sentinel | `https://kubernetes.io` | `0xe8743ebae8825e6b6f46a4c9b2b3dd3e048049023b6fefc98fcc443efe9bec8b` | `0xab5075374f2e9066...` |
| 85 | URL_SCAN | NetWire URL Scan | `https://terraform.io` | `0x684a5a01bce0fbbf4536f429bf2c2c94a43708e55e2dc92312841f8849636046` | `0xe488df88f78ead10...` |
| 86 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://terraform.io` | `0xb94f750eebd7fa2ae9356851aa049d5355b0524eda33fb612b5dfeec769cf692` | `0x2fc46f9d5bd1852e...` |
| 87 | URL_SCAN | URL Sentinel | `https://terraform.io` | `0x381bde1f53fe573e442e29aeebbb23a781b88b47d39c11304bad75c3a3e306ca` | `0x079eec3c25713cc5...` |
| 88 | URL_SCAN | URL Sentinel | `https://ansible.com` | `0x298b971a21a88a5f584ea3389f768167a30bea00be318f8920c06922c98d6435` | `0xcadbeb2fee441849...` |
| 89 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ansible.com` | `0x3e3081224727ad085560f2c8a789bc8ce5ed7ca73b7f6c4e1fb3cf2e4d1a067a` | `0x4cf4775219e70783...` |
| 90 | URL_SCAN | NetWire URL Scan | `https://ansible.com` | `0xf9543e7b532775c768a5097f6a6783c6a9b5cf5a5b27dcea92b78278d1e0a3e6` | `0x85d942f4171a0de2...` |
| 91 | URL_SCAN | URL Sentinel | `https://jenkins.io` | `0x64cd05df1c94a135a3af17f354830d7a115a042b44a1902a5ce7bffdcb6b6364` | `0xe442a6b8522b32d3...` |
| 92 | URL_SCAN | NetWire URL Scan | `https://jenkins.io` | `0xd35697acdf7a508af3c62136cf2c0e882559c88a1f5a904bc5020bb91a4b7b8c` | `0xba7fc165e8b1a517...` |
| 93 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://jenkins.io` | `0x23e099f62960956618de5651ed108bcedbb5e0f6c3475f6f4143d77f44094131` | `0x8469a22286bab9d9...` |
| 94 | URL_SCAN | NetWire URL Scan | `https://grafana.com` | `0xa1ba4c73bc010dea435a4d69f3982f0407aa198c029a8312e835930e7f7e39ca` | `0x65252f9f85e97fab...` |
| 95 | URL_SCAN | URL Sentinel | `https://grafana.com` | `0x72146e6155885568d8b39ef74152408cec8a578baa7fc2717de5d9d7bb057465` | `0x14fa382904ff0340...` |
| 96 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://grafana.com` | `0x01718f719f297d67ba9f140eb2f3f26584a5837966dde75c59c36b4b6100ea84` | `0x7a3c09092ced6be2...` |
| 97 | URL_SCAN | NetWire URL Scan | `https://prometheus.io` | `0xc4cb82eecbf325d756538a07944dbf2ee95255593296d98baeb0aebc907ede00` | `0x158778b8c9368b9e...` |
| 98 | URL_SCAN | URL Sentinel | `https://prometheus.io` | `0x6944db280b252097ee7a983edd04f12aebb8fda8fe22c5dce837a9ddb41097eb` | `0xd3cab68717cb5d7f...` |
| 99 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://prometheus.io` | `0x92e08bcfbce7986c95e97a43c9127ff01c5795c43ceb432bd72458389e784668` | `0x8f25d0d628fd340e...` |
| 100 | URL_SCAN | URL Sentinel | `https://elastic.co` | `0x12891de19ce5c01b260172b137ec1b78fe0925494e617bc1eb77da8505031a0e` | `0x90906e3a9a05aa5e...` |
| 101 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://elastic.co` | `0x356364e27aa2bd237842a4e4cd649fb70afca53cabfe00938b062c37c954beb3` | `0x9185fa21b316a310...` |
| 102 | URL_SCAN | NetWire URL Scan | `https://mongodb.com` | `0x1cfa6b936e785daf8830cf352a9fdb31c397a607ba2e6f7afcbf5cd4ae97d37f` | `0x82d9b4f3f666f10a...` |
| 103 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://mongodb.com` | `0x5b15573ddb10a54b1798682407709228c0d7c02e219f4d6959d73ac3ad3f622a` | `0x00aa39ca0686357d...` |
| 104 | URL_SCAN | NetWire URL Scan | `https://elastic.co` | `0xf23ca3d238b1896d1c76e533766988a1ec3a468fcc5c14f32c7ee2661e3b485c` | `0xac60b850e0521f45...` |
| 105 | URL_SCAN | NetWire URL Scan | `https://sqlite.org` | `0xbaa3071176162ca8e1e2f6075d16e10c9582f5ec1b8da7df00ceadd32bb7e662` | `0x510658d7c8450ffa...` |
| 106 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://sqlite.org` | `0xa3465538ce7d7750b8016655e013ef2c9be06bb7075bb1491e299414210e0960` | `0x8a79d2d6dd074f67...` |
| 107 | URL_SCAN | URL Sentinel | `https://mongodb.com` | `0x0cc64b53394ee17a0893b3ee3fb128985784748dfea92426009cc7b8e298b412` | `0x178ce9cb6bcff1c7...` |
| 108 | URL_SCAN | NetWire URL Scan | `https://ethereum.org` | `0x51bd45db07253247090d8362d6b5d7bad584471cf968c08121f77e89dfefba8a` | `0xa142ad819ac0bdfe...` |
| 109 | URL_SCAN | URL Sentinel | `https://ethereum.org` | `0xd0289c830b08756e2cd83a862587a3745b4f13c57b9994dddb223a31a11c4778` | `0xaf8278ab8e5d1b49...` |
| 110 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ethereum.org` | `0x65de294909954271e2af0e351a431e21f395c129eefe0d82be75992486fcc4a5` | `0x2a67983ae54a33c9...` |
| 111 | URL_SCAN | URL Sentinel | `https://sqlite.org` | `0x13e559ebafe72305af0ffe3523f10464a22115244a8e56664cd65a9542436146` | `0xc811752209c36989...` |
| 112 | URL_SCAN | NetWire URL Scan | `https://bitcoin.org` | `0x430cff0048143b4a084d780ffe8dc68abf634bb3a3e3c4028eecba0b0bb8044e` | `0xbd28bcf68ba56190...` |
| 113 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://bitcoin.org` | `0x25346e5096549fe9f3c4dc888be9598f0f8382b2492f00790a7f22199e207950` | `0x49c4f4afa4e1d842...` |
| 114 | URL_SCAN | URL Sentinel | `https://bitcoin.org` | `0xb39bbc96cc16bf9d1783ec13aaf4fa1424531425c1d8a066d47d8ab0be56a888` | `0xd967e29a847fbb28...` |
| 115 | URL_SCAN | NetWire URL Scan | `https://base.org` | `0x657ab698e92620c74299c1393956b1da3669b8da166ed9978f008b565a891d10` | `0xef043076507ec5d9...` |
| 116 | URL_SCAN | URL Sentinel | `https://base.org` | `0x344c9d3da75e37b53aef9bcb6cc0aecd83fbab3ed45cb89ef931d3a8bb961e93` | `0x7d1c014b0838fa35...` |
| 117 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://base.org` | `0xba0bd93ea1e9c07aeb897ab421cb53d10f5b80919f937016a9036ca3a81b0b87` | `0x1016703aa53efc8c...` |
| 118 | URL_SCAN | NetWire URL Scan | `https://metamask.io` | `0xaeedbd714cde4f0d74fbcdbbc0b38e780042f4af031c613b12061e079e06415f` | `0x8cf828af44434914...` |
| 119 | URL_SCAN | URL Sentinel | `https://metamask.io` | `0x9d2a87966b93ebd191928c662c3e759d4eae282ced8e531094cde7e55a54dccc` | `0x94b9b12a371430de...` |
| 120 | URL_SCAN | NetWire URL Scan | `https://etherscan.io` | `0x470809577e88eeda32d4a0c6b82bb7ef9e9a6b048f7f511cf33145cb567f4a15` | `0x667f93366ec1f5aa...` |
| 121 | URL_SCAN | URL Sentinel | `https://etherscan.io` | `0x2fd432bc0d403a0552823cee5fca294641a3f722a77a6bfe1d5923a6fee8b4fe` | `0xc67063da65e5608f...` |
| 122 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://etherscan.io` | `0x4d99605d94a1656c938902db4b3aa144e646dabb4476caaf39569a10162f837f` | `0x66669af8f494afde...` |
| 123 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://metamask.io` | `0xbbe7eba1d2dd40345a089488b7e098bf875adb8ac7c95acc86b225d9eee4a86b` | `0x31d4fbc27803a464...` |
| 124 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://coingecko.com` | `0x113cbf807dc36e85317b689a300a1fb763669a905877109ff47ab94ed1a81e52` | `0x9ad0994fdf6b415b...` |
| 125 | URL_SCAN | NetWire URL Scan | `https://defillama.com` | `0x448fa8d4e541803d1020878f47ba1ec23c68379add23d702e24e7a39c97d69ce` | `0xc5eb334a2af5dd3d...` |
| 126 | URL_SCAN | NetWire URL Scan | `https://coingecko.com` | `0xcd66c3cb0f30706572448d440c649dcb138a0542a7edad0df353c452e3820cdf` | `0x92794fd2d0ec852b...` |
| 127 | URL_SCAN | URL Sentinel | `https://coingecko.com` | `0x289080182f541ce57c536d6a09f3311da28f1c0e638d24a86586d09482731afa` | `0x19b2c4fdf39aa0c8...` |
| 128 | URL_SCAN | URL Sentinel | `https://defillama.com` | `0xfbf5bc0805f5ad558883b5124fd4b19ad5e76f8239cc59c9501e65b6c6f3be5b` | `0x93db23645c531e00...` |
| 129 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://defillama.com` | `0xab5c7b1bc2723d465096f34811bb78cee8f1335bb6daee42ff51a9907afa144c` | `0xc21a157b46f22c89...` |
| 130 | URL_SCAN | NetWire URL Scan | `https://chain.link` | `0xca5a4367329ab00f7b8204288d7085cc36d6209a3d1ee8b7b61dd42841826661` | `0x17f69a37d90648ab...` |
| 131 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://chain.link` | `0xc829a72f6a41445f3f4d05c565939713fda14ec0ec66d42f380b1d63cca1651d` | `0x68da3e210e6a46d4...` |
| 132 | URL_SCAN | NetWire URL Scan | `https://uniswap.org` | `0xcd6823b8616d2dfc7b4556748aad9f1e27ed529e2d049dd6498b3b01a2644b48` | `0x65a9dbaf7916a6e7...` |
| 133 | URL_SCAN | URL Sentinel | `https://chain.link` | `0xfc1c9554381d3b64cf11c2308aefd1eb1476f4fc4dc9f467b5ad50e3e70ab298` | `0xfeb03e5fdc090d7a...` |
| 134 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://uniswap.org` | `0x873aea8fd5b9fe344b9ec5d9f71ba4cf7b85d3eb3815409ad0c7482656a893e4` | `0x10dc941b7006f89a...` |
| 135 | URL_SCAN | NetWire URL Scan | `https://aave.com` | `0xf15e590cda312d5af5a07d85d98a06c1a96bedc826ea201c0adede03aef09184` | `0xafc08b485e0d2462...` |
| 136 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://aave.com` | `0xe19976bc30bf1a057dd478ae3f3adfec49cad1fc1186bd25d5fa07661dc62252` | `0xcbc977c01eddcb6a...` |
| 137 | URL_SCAN | URL Sentinel | `https://uniswap.org` | `0x981574a519857ff37ac6b4922ff799df46adefdb61c4c0857e94a687009574ac` | `0x6f56803d7d87d9e1...` |
| 138 | URL_SCAN | NetWire URL Scan | `https://curve.fi` | `0x5e3706bf3d106f9a765c36041daf6d683b5891ab9a02215eacda1a48939711e5` | `0xca361374c6809404...` |
| 139 | URL_SCAN | URL Sentinel | `https://curve.fi` | `0x8d5758adb5dc68fbc0dd2ff8178c2dd19b7cd30d8c27177a179b250e48c54c33` | `0xc9740400c72283b1...` |
| 140 | URL_SCAN | URL Sentinel | `https://aave.com` | `0x50fae100e7cf32c2cec34d517f7111d8f6a71bb99c644e5f05fb4bd8aa5ddb7e` | `0x88ea13d99df2cd84...` |
| 141 | URL_SCAN | URL Sentinel | `https://lido.fi` | `0xd9c44512f022e58f2e3fac98ca6b22bd3307414d4d367f518223ebedcddaba1f` | `0x6d38e6bf769c4241...` |
| 142 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://lido.fi` | `0xbb88b26f681528c689acb013a2acdde572b05126935172527812d9f676db8100` | `0x41ad2bf0109fa51a...` |
| 143 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://curve.fi` | `0x8b0ad2fb701ec3f78ff79bd1bd83f208070b9b719f72d22ea5ba6dbcad496406` | `0xb3dee9e7f155a885...` |
| 144 | URL_SCAN | NetWire URL Scan | `https://reuters.com` | `0x773f1bfc991a0c9bc3b079b804ec62c36f5b4a518dc90e89eeaa868ac72c1a65` | `0x2a2a8dcb097727e3...` |
| 145 | URL_SCAN | NetWire URL Scan | `https://lido.fi` | `0x93cbcbf76359f2695f7b89df8bb7d13a31109d577c84349f4092255d426783ac` | `0x705b4a0e379bddd2...` |
| 146 | URL_SCAN | URL Sentinel | `https://reuters.com` | `0x1baa549e72a7483f1f17b22e1163276a2a42cb9baf96a4964426a98fe8ca15f1` | `0x7a7ae594e36d2048...` |
| 147 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://reuters.com` | `0x21b9af8cd155e5e2a360a24ddc41821a50979f87e9a2d07969e24cb1df371dc5` | `0x83ffa92d980844d7...` |
| 148 | URL_SCAN | NetWire URL Scan | `https://apnews.com` | `0x67e242b3346b21b691c2e0340ccde5c96e2e966b25f57a4eaab61a0f01a0f227` | `0xdded2227c4eaae4b...` |
| 149 | URL_SCAN | URL Sentinel | `https://apnews.com` | `0x9e9ed0b5159275fa923dd5589fa784f0e7084b3c86f656ece23b99804d221972` | `0x27a121420316c8ee...` |
| 150 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://apnews.com` | `0x67e358defc1beb44f5f991543cbc93e8a29ad01a703c94dd019406748f9c041c` | `0xe38c2610b888abf9...` |
| 151 | URL_SCAN | URL Sentinel | `https://bbc.co.uk` | `0x61815435720aa714e0467220598d463a7c2a380fbb699d1b2260ed7ee044439f` | `0x0a17bcf04d83a5f3...` |
| 152 | URL_SCAN | NetWire URL Scan | `https://bbc.co.uk` | `0x0a4f5d46acdc27cd27420e73d92f1cfc829041fbaa758dd606f01f4baf8a89de` | `0x07fe8744d0bf704d...` |
| 153 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://bbc.co.uk` | `0x5587d310fa283512da3754e83cf23ab03fe4693a7c5e65df9a63a331a0a8499b` | `0x09d9bbd2f862cc04...` |
| 154 | URL_SCAN | NetWire URL Scan | `https://nature.com` | `0x3621fcbbc0a596a75b8868e6174263f1e4fc51a25810c1a62623a74a7f6c7e54` | `0xf7e7e101bdc9bd11...` |
| 155 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://nature.com` | `0x9d845410cc83e58cb2a3f5f5495b2d22e727f2ddbb4665f3df34bb0ba4547aaf` | `0xe00b2aaa230cbc94...` |
| 156 | URL_SCAN | NetWire URL Scan | `https://arxiv.org` | `0xeba7041a9e192e790f464203d3628f1c41847313d17681bcb4046718a1a0828f` | `0xd193d7ceb0269037...` |
| 157 | URL_SCAN | URL Sentinel | `https://arxiv.org` | `0x8f98d3247b96731949518ff06cad0dc00e6b7b8758f6958a627949e1933cf4d3` | `0xee18e266e6db29ba...` |
| 158 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://arxiv.org` | `0x5cdc13b1d43296fd931b5139ec43a787e0b6c03a4f4790f51813909be76e03db` | `0xb0d16a03ff975d78...` |
| 159 | URL_SCAN | URL Sentinel | `https://nature.com` | `0x601dcc3032a945ba0b4efe8254beabedcc621acde7d1adc0d56fb59f66d06943` | `0x46ff4880739deea1...` |
| 160 | URL_SCAN | URL Sentinel | `https://ieee.org` | `0xc8370ddef3a88fe4f3439f130d714b32ed962727c727dda7dea8a5019570552c` | `0x17982b30e1de296b...` |
| 161 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ieee.org` | `0x8eae20e206991efcfbc62f2f1fca9ec68fd8fae32956820ea310740592af2a10` | `0x83a361046fa6eef4...` |
| 162 | URL_SCAN | NetWire URL Scan | `https://acm.org` | `0xaab7d42fc3ad659ae8d280ee8042d90bc525c764b1319dba674ed74fab37ab36` | `0x2c261377a11eeb99...` |
| 163 | URL_SCAN | URL Sentinel | `https://acm.org` | `0xcdaf13ec31be3aa69fb1a9c95874c72d40c9b3d42a11fa5783caa16061bdc7cc` | `0xea96f0e969a06ce6...` |
| 164 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://acm.org` | `0x4a9f8965718db4f310f5b4b9cb2cf8b95cb2d0287494ae0d237ab22621418591` | `0x58abb0c329ad2766...` |
| 165 | URL_SCAN | NetWire URL Scan | `https://ieee.org` | `0x84d0d91ceabca195ec036a38eeb62533be64d4f7dd6bf689bf305bf6e8bf31d4` | `0xf7a0479f157c4f09...` |
| 166 | URL_SCAN | NetWire URL Scan | `https://who.int` | `0x4cf7b984adfb6106ff1b82db9f5321744becfbcc744e29b6ba06f128386c3694` | `0x001e810c0c7adc13...` |
| 167 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://who.int` | `0xaa5ffdd98e0c91a64ac0c6cf913dca586a80b786edfeb2b0fe0892249b124d4e` | `0x21ab03c3ead379f5...` |
| 168 | URL_SCAN | NetWire URL Scan | `https://un.org` | `0x7c149d92e0ccddafafd805bee284501e9a2d18b672aaae2cad06bf5065210a89` | `0xd1d01d11acb6fbcf...` |
| 169 | URL_SCAN | URL Sentinel | `https://un.org` | `0x1d6b6ab3741decbc8bc92f007583965ae52e94cde5607989bb2c72b9a11cdd5f` | `0xb421494a822cade3...` |
| 170 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://un.org` | `0xdedc072ab87802e804e0956aa976057a67011756f8f6d33b3e54f3ea669eead5` | `0x7e0a3023e06c2c6c...` |
| 171 | URL_SCAN | URL Sentinel | `https://who.int` | `0xf04f9eda0cab179a631f31d55f0ec79a556c99ad7e526930f02688662f9db2ca` | `0xb6b590e6499ae8cd...` |
| 172 | URL_SCAN | NetWire URL Scan | `https://nasa.gov` | `0x25f7a06785bc2394307f645e9653cfbf136834c634b97ef2f30b9cc1fd3da451` | `0x2d03776feceac45e...` |
| 173 | URL_SCAN | URL Sentinel | `https://nasa.gov` | `0x32e2d6c08b8e910e5331155d511ba852a597ddaed4f955ef6a7f2a3fc1aec1a0` | `0x80a61dd5eb0e1271...` |
| 174 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://nasa.gov` | `0xf5832bf88c5e4493cf0d9d4c782f4296a8c3cfb6d0adb920ad65f7ba78b89ce7` | `0x01bbd911195df5a7...` |
| 175 | URL_SCAN | NetWire URL Scan | `https://noaa.gov` | `0x3168978da6836b39d6b462a53277e01227f5368ed6b163a7be727975a4807e3b` | `0xeeffbfbb7d7b214a...` |
| 176 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://noaa.gov` | `0x5191b7776a74118a8083e48e4f1476efce7ac2f8c65974c8183c2b8a65067c3f` | `0xe7f397485d17cc24...` |
| 177 | URL_SCAN | NetWire URL Scan | `https://nist.gov` | `0x4f89ec2163a437d400fb6f2bf7640923518e2d4550f4ecda5e16cd84a11a7d2d` | `0x99d182450bf8e8b8...` |
| 178 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://nist.gov` | `0xe24a54296697680434fb66a81319ed1c23b21e08a2d516a83e8afa88ead2f94d` | `0x09b4aecb88e63da0...` |
| 179 | URL_SCAN | URL Sentinel | `https://nist.gov` | `0xb45b80b28899568a33156288d01b998c65a9d8f5447ba6ec7525bedbf71fd76c` | `0xdeae1dfbdaec9674...` |
| 180 | WALLET_BALANCE_CHECK | TxLens | `0x098B716B8Aaf21512996dC57EB0615e2383E2f96` | `0x19832c92276a40de8ebc86f511edc9efbcea9fc8be1a5ca05d3bf12a13437fec` | `0x564b6328528989a6...` |
| 181 | WALLET_BALANCE_CHECK | TxLens | `0x7F367cC41522cE07553e823bf3be79A889DEbe1B` | `0xf363ab1247cd9ae8923ed7675f7c6c4018d73a403867da541efd883a38708c32` | `0x87f2c10a0bbd306c...` |
| 182 | URL_SCAN | URL Sentinel | `https://noaa.gov` | `0x69cfc015837a91232a6f437dafffdc58890bc4054606454d382ca765ee0b5bdf` | `0x25f950c4788df60f...` |
| 183 | WALLET_BALANCE_CHECK | TxLens | `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` | `0xba222bffaa5d80b95a0dda9d953a5157dc86bea1bf07187de73d274a513f720e` | `0xd7919bd85c6b167c...` |
| 184 | WALLET_BALANCE_CHECK | TxLens | `0xdAC17F958D2ee523a2206206994597C13D831ec7` | `0x5a9f17d591740ec51bd71de4da7e4425ce4be5892f743a6e0e6bbd0e7d5dcb4f` | `0xf62b55b99b24e6c8...` |
| 185 | WALLET_BALANCE_CHECK | TxLens | `0x8589427373D6D84E98730D7795D8f6f8731FDA16` | `0xf775518414edb3581c9734f304c5761b1ac7071b39a2553931ad93814b0bdecc` | `0x65d1e96bfd8a89f3...` |
| 186 | WALLET_BALANCE_CHECK | TxLens | `0x28C6c06298d514Db089934071355E5743bf21d60` | `0x08b35500f0dbec1bf47dd90b5073acf8e5a65eed5073f5e82942a83ed094fe32` | `0xa888bbb025a65309...` |
| 187 | WALLET_BALANCE_CHECK | TxLens | `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8` | `0x8ee9694b60ba5de46cb902268dea5e6e8927e73e34423b17a647ec29608f7693` | `0x7537ba9a11a7c8cc...` |
| 188 | WALLET_BALANCE_CHECK | TxLens | `0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549` | `0x5be4b7b613bb629d774c333b764a06700bdd35c5cbe76d266c901d9a5ca8ae5c` | `0xc3c7db3a8c3e27fc...` |
| 189 | WALLET_BALANCE_CHECK | TxLens | `0xDFd5293D8e347dFe59E90eFd55b2956a1343963d` | `0x6b02e1f2eaf993020410c833462b944bd87ca9c13e1f8cb7d7bda37816667a36` | `0x16799a434f0ac1f1...` |
| 190 | WALLET_BALANCE_CHECK | TxLens | `0x56Eddb7aa87536c09CCc2793473599fD21A8b17F` | `0x6c3e2112f0bb470a390d004737630a1eee1189c94cb390b58737be9b18070d47` | `0x7a76eec86b7c7fb4...` |
| 191 | WALLET_BALANCE_CHECK | TxLens | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | `0x031bec62ac748e6c3bfaa69cc935dfdaffcc81adc80d774fd2d6edf91511ead5` | `0x35730c81716ea3af...` |
| 192 | WALLET_BALANCE_CHECK | TxLens | `0x9696f59E4d72E237BE84fFD425DCaD154Bf96976` | `0xa0701abe9c5339352c57ea86dae9188eba8362bd60fdc0f79f7b6c3ffdfc884c` | `0x206d00309b07f8a3...` |
| 193 | WALLET_BALANCE_CHECK | TxLens | `0x4976A4A02f38326660D17bf34b431dC6e2eb2327` | `0xdc193ac4dfd8b8a500a7c6dcc0af9b69c6539dca00ff940f66e0c7822f2ae3bc` | `0xff3c9b552f634803...` |
| 194 | WALLET_BALANCE_CHECK | TxLens | `0x6262998Ced04146fA42253a5C0AF90CA02dfd2A3` | `0xd8d316e8f1dcbe507653eedbd9acad1f3b6f7a72e1d565409ce33498abb4273c` | `0x3ea5e93642b4314b...` |
| 195 | WALLET_BALANCE_CHECK | TxLens | `0x0D0707963952f2fBA59dD06f2b425ace40b492Fe` | `0x68ce8bf01eb01e02bdbbaec342fd5a55fe07df28eae1faa8ff3f12a8f21e7a5d` | `0xec20cf3168400372...` |
| 196 | WALLET_BALANCE_CHECK | TxLens | `0xF977814e90dA44bFA03b6295A0616a897441aceC` | `0x83a29ca4b5dbd274591432bc6d4a966342d3d9044eaf729c71dc34137735d45c` | `0x1a5e841bbaf5962b...` |
| 197 | WALLET_BALANCE_CHECK | TxLens | `0x5754284f345afc66a98fbB0a0Afe71e0F007B949` | `0xb3a9c790990f98488e6b65acc68862f4e2604bd76fe565dc626438c60e2eda73` | `0xa87693d645d6d344...` |
| 198 | WALLET_BALANCE_CHECK | TxLens | `0x503828976D22510aad0201ac7EC88293211D23Da` | `0x0086348c315b3d1f8c8c7218d3a329377c52b3c4524b3f6c033ab3539a6f7240` | `0xab0c2ace4bd035c7...` |
| 199 | WALLET_BALANCE_CHECK | TxLens | `0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740` | `0x8bc26788318fb0efdc53c7ce10abcf523a6bea41df7528c1c66f9004cb61a023` | `0x42a283b10a81b352...` |
| 200 | WALLET_BALANCE_CHECK | TxLens | `0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE` | `0xdb0d8cd4a5c022cc4e092664e9aa0c5d23c8c4afc87523df80acd71fdf1c63b2` | `0x2983883999bbd257...` |
| 201 | WALLET_BALANCE_CHECK | TxLens | `0xD551234Ae421e3BCBA99A0Da6d736074f22192FF` | `0x55aa32b199c8a0d987ef998d1f414ff23d162f9eb5bd5d7b1e7efcc5fc1f4d68` | `0x049d7d5c6a30e92f...` |
| 202 | WALLET_BALANCE_CHECK | TxLens | `0x1522900B6daFac587d499a862861C0869Be6E428` | `0xd29460877a3a9e0d89353571435bf581911a978aa4a25f1926cacbb8187cd24f` | `0xca1b095077baedc1...` |
| 203 | WALLET_BALANCE_CHECK | TxLens | `0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF` | `0xe71aef41b4dfa79170671a4b36ba6228eccae9eb3ae096047ff54e06847cf629` | `0x3ba5d6bd29e07cf8...` |
| 204 | WALLET_BALANCE_CHECK | TxLens | `0xfE9e8709d3215310075d67E3ed32A380CCf451C8` | `0xa4af11b0022be1d9b426fb0ed5043e30a0c6aeeecb3c39272a9c761757599639` | `0xb3ee50a9b63d7530...` |
| 205 | ONCHAIN_TX_LOOKUP | TxLens | `0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204e...` | `0x9519cdc78bfbc43998a9409afc4b39733886919eb8add254537a44a98a57a4bc` | `0x7eff9a837dab8ba3...` |
| 206 | WALLET_BALANCE_CHECK | TxLens | `0x564286362092D8e7936f0549571a803B203aAceD` | `0xe1dc8a30a1e3efe1d0f295fbf5e20a03217e23c8a27771b60f09d1c49c63eff4` | `0xebcd3a7b3f6ed073...` |
| 207 | ONCHAIN_TX_LOOKUP | TxLens | `0x1ecdd1b1b3d3b1cf1c3d2bbf7fcbdf3fef1e6b7a5...` | `0x5593c91b0b204a185581f4e3f2327516c7eecbe71589e12b17d4a3ed421f9d9e` | `0x599c3c83174798fd...` |
| 208 | ONCHAIN_TX_LOOKUP | TxLens | `0xa1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e...` | `0x515ade5fb70e0b1cc710bd9b0be89e4f0f521c4bc5483965cbe980ce0d5fa73c` | `0xd603e60442b5c252...` |
| 209 | ONCHAIN_TX_LOOKUP | TxLens | `0x88df016429689c079f3b2f6ad39fa052532c56795...` | `0xd4c4c9bd7764dd2fc8b5961fdb1df92175b24771995a6e91207fdd0d236d9140` | `0xbb733a7117f3a261...` |
| 210 | ONCHAIN_TX_LOOKUP | TxLens | `0x3f7f4a6a5f6c1c1e9e9f0a0b1c2d3e4f5a6b7c8d9...` | `0xf4da1682d2e2cd240acaeee3a7640da1256e01665c1a1a42fa9a059d3ee52879` | `0xfee9fb0780fb2ffe...` |
| 211 | ONCHAIN_TX_LOOKUP | TxLens | `0xb1e1f1a1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a...` | `0x44ae2889aa9cf78f65dbd35b5f19f4ebbef2856f1a92d6a78d0a012a6ddbc8a1` | `0xccdc47a21cf96127...` |
| 212 | GAS_PRICE | TxLens | `ethereum` | `0xd46be5f38018cd648a10fc493c92e927ef4ff97358ed4947a8e35ff4743dba32` | `0x72d6ea65fb40c74d...` |
| 213 | GAS_PRICE | TxLens | `optimism` | `0x4dccd46d1a34a45726a7af0f8c37b9e013a5e8d8dbce0e32557f2f262b1667ca` | `0x597b9f27d02471c2...` |
| 214 | CRYPTO_PRICE | TxLens | `bitcoin` | `0x3aa9775161376db6615ca708193ed1fc5cd473474adb59e2537169773a904d9f` | `0x29aab6dea8e7a396...` |
| 215 | CRYPTO_PRICE | TxLens | `ethereum` | `0x2252315678588f077cc663b77bb214f14bed08688d2257bb054798c328a9d1c7` | `0x6c0c36968ad3f11d...` |
| 216 | GAS_PRICE | TxLens | `arbitrum` | `0x99cc028dfce7638cc177cf68bd9a88a8f43818b3aa0c940b5ba5d0b9f2e0219e` | `0x9c801510cc623eb5...` |
| 217 | GAS_PRICE | TxLens | `base` | `0xa2bd1afbf9bb2d7585014dfd0a29adf9a8aff7f02a0217d4d7974e59fa38e271` | `0xceb8c940619dc470...` |
| 218 | CRYPTO_PRICE | TxLens | `solana` | `0x2ac8f9f3b9247d1a796b8d9d2b47c3d54b47bfabbc7f6ffca593ec0772a4c4af` | `0x344685d070b640c8...` |
| 219 | GAS_PRICE | TxLens | `polygon` | `0x03b909b3c60d8585edf349c699241398134c1f306f7a2be7ad66cde8501fc40d` | `0xb938187018f0be40...` |
| 220 | CRYPTO_PRICE | TxLens | `cardano` | `0x858d39fb63e11c9a084fcbc057ecb2d475035488b484399227de7ce636d066d8` | `0x9d45fb1c2b440ae8...` |
| 221 | CRYPTO_PRICE | TxLens | `chainlink` | `0x115f4719f4277095d0d00bc0c5c9fd8bc8de259dff48ca60853458fa5f254722` | `0x30c12907339bcba7...` |
| 222 | CRYPTO_PRICE | TxLens | `polkadot` | `0x67e667d85ed06bd994490b7fe87f7511a2763e5a0868e41feb2243727306548f` | `0x98ea3ee8ccc7e0b6...` |
| 223 | CRYPTO_PRICE | TxLens | `avalanche-2` | `0x36650615049ded1e88bd2ead7f455875173a055a5af5970aa8e49a36b5eb53e8` | `0x4f980ec6bbac9920...` |
| 224 | CRYPTO_PRICE | TxLens | `dogecoin` | `0x5a12aa48ae3bf4285ae8767201b4719d2e4adb4f796fccad3e5f9f3f2d28a3bc` | `0x358678ed936a2bb4...` |
| 225 | CRYPTO_PRICE | TxLens | `litecoin` | `0xbb3a30fa4c59720e60d7bb356b77ff067cfa166d26c84f64aca30dd8e80439c4` | `0xf694ddaf42b79ddb...` |
| 226 | CRYPTO_PRICE | TxLens | `uniswap` | `0x8e11720e76db4fcef4c33218f61e646bd63fa072385bb003da4f1bd1fd8034fb` | `0xb8c2dfc77e9af966...` |
| 227 | CRYPTO_PRICE | TxLens | `aave` | `0x8c46c24f5590af8e61627d516f160310c25047db863ff9aa99f336272942e11c` | `0x3f0e4e21c8cafedd...` |
| 228 | CRYPTO_PRICE | TxLens | `near` | `0xb46ea60f3263e12b58e71aa01702b278fb76655f7fb9b0faf74165b6bace930e` | `0x50a82aee7213b9ae...` |
| 229 | CRYPTO_PRICE | TxLens | `algorand` | `0x99d98de4df82e9e00a2368eb2dd9a5ee1790387187441c66053ed0e2cbcfbe64` | `0x25b4554e18829fd4...` |
| 230 | CRYPTO_PRICE | TxLens | `stellar` | `0xaf73eb4441bda94fc827e9a9651350475501b971f01b15c1842b7b10014d91cf` | `0xcbfe4a406565cbb4...` |
| 231 | CRYPTO_PRICE | TxLens | `cosmos` | `0x2012e6bd4176fd12867a20976e3a68b5e8d60a6489326f650a305347da342111` | `0x12c736d0175c7c1d...` |
| 232 | CRYPTO_PRICE | TxLens | `filecoin` | `0x9d90b7ba9cb77cff92dd0d91f0eef7ec2666d5ffe371dfb666ffcd906b7d5eb6` | `0x3abcec23f9db462f...` |
| 233 | CRYPTO_PRICE | TxLens | `arbitrum` | `0x887704da4c3b0f724d661a69afd2a77e8d952b8bc8e06a222918914260b0cdd3` | `0x46152648df33f59f...` |
| 234 | CRYPTO_PRICE | TxLens | `optimism` | `0xc969a668f8b2cb36d196e549b5e1bb92af2d9dab1658e0b076602d2d89049fe7` | `0x067341d322b8c5b1...` |
| 235 | CRYPTO_PRICE | TxLens | `monero` | `0x93db6073949bdf2a53c3622af8c70ca5323d532b7dbaa9ffce6d2b98a6f2cabd` | `0x058105841326bdd9...` |
| 236 | CRYPTO_PRICE | TxLens | `maker` | `0xfd0b0fb45077dfc8bd85b8cb3f4d183f44504db22fcc187d228f3a611ccab89b` | `0x9d611fe0a6cae8bc...` |
| 237 | CRYPTO_PRICE | TxLens | `the-graph` | `0xe272889008794ce86a93cb35f7c30b364112275cbd32b8be32c816675ef7aff2` | `0x1680cf2eddf59b42...` |
| 238 | CRYPTO_PRICE | TxLens | `injective-protocol` | `0xafdae359dfde67da4562c4067ec4ef9b52bb1d25f2a2e8798902cc2ecd15b8a6` | `0x4a88fe9020667017...` |
| 239 | CRYPTO_PRICE | TxLens | `sui` | `0xb798b48805a83e5145df6360e8ee215624baec929359a185fd9c982a77596228` | `0xc52712e344c20009...` |
| 240 | CRYPTO_PRICE | TxLens | `aptos` | `0xe9e93785dafa3810ef03545a11b2df20dd0640b2adc834c2266400f414f18e3d` | `0x5a34f494c1691e64...` |
| 241 | STOCK_PRICE | TxLens | `AAPL` | `0x8ea6dd5d5defd8c0d2771e6cbde5192bea3f65e32205c35fe2e6610607d8de5d` | `0xe886e957a4b9f88c...` |
| 242 | STOCK_PRICE | TxLens | `NVDA` | `0x6c1497f8a257ab8be2a8449f13e133b17bb9415941b52a336db738bd24d85908` | `0xf9c2c6bbefb59a6a...` |
| 243 | STOCK_PRICE | TxLens | `GOOGL` | `0x8aac3e268b3c1d730401bbe9382ba99254896f6c1a1e8b0207d5c7b0bbd2bcc0` | `0xad5d896f65f17f45...` |
| 244 | STOCK_PRICE | TxLens | `TSLA` | `0xceb8ce94fe0523bedec333c484588f90af6bcc77001e6230d5a3ade73ec020dd` | `0xa985117f2b88dc78...` |
| 245 | STOCK_PRICE | TxLens | `META` | `0x9881beff4ac2df7a332cbfb80ae14025d9e1f1ca65eeb929688912465bd16b9d` | `0x69e46b2f04ac5014...` |
| 246 | STOCK_PRICE | TxLens | `MSFT` | `0x4719e6bc949f18e473cc5e8a734a8da1722ffb2ecc9df2d4ff30811f27600cc9` | `0x27ed84d23d42101b...` |
| 247 | STOCK_PRICE | TxLens | `AMZN` | `0x98477d6b5140a3a74dc601b758267763ff42e23171973c56c10d62a20020b3ec` | `0xb193254666860abf...` |
| 248 | STOCK_PRICE | TxLens | `NFLX` | `0x186ae35f601dfbaa6b4ccac08558a1996d8bb29c2806828b692e34de14f3c07d` | `0xc69cb3169823fe72...` |
| 249 | STOCK_PRICE | TxLens | `AMD` | `0xdffb750ecc063dd5a570beaa90b3ead7c5cb5cb48852af45c5d99a98fbebb30a` | `0xf09e12fcb2824c2e...` |
| 250 | STOCK_PRICE | TxLens | `INTC` | `0xd8c61bb4debf21259c8faaab84ac9dbd24aa3d1c1252d8b1af72c92ad4063b52` | `0x1a4892b657d0b1ad...` |
| 251 | STOCK_PRICE | TxLens | `ORCL` | `0x800e6e23271d6c015d5fd0c1e545111da05aa13aabfb13e232e10a0d24a2eda2` | `0x344855295eb5d896...` |
| 252 | STOCK_PRICE | TxLens | `CRM` | `0x047c589d90e0b7737847cb6867d2db4979ae1f09fa83f60b3a26ff5011d503b4` | `0x4386ee191bceb7eb...` |
| 253 | STOCK_PRICE | TxLens | `ADBE` | `0xc234f3ebe563039908a4837edef101c35b6a0dd093d87c06d13895afc37f184c` | `0x218cd27ba893402f...` |
| 254 | STOCK_PRICE | TxLens | `QCOM` | `0x9ba744d7af973c5e5dfcc50987ea46631622ab0f1c71613bda58de2fe1b97d83` | `0xef9afef2d30834aa...` |
| 255 | STOCK_PRICE | TxLens | `TXN` | `0x802c8128bb53e46711bdb38179798bfc7c64222dc0854e4f966ab632a150d1eb` | `0x9b87700b8d9e4730...` |
| 256 | STOCK_PRICE | TxLens | `IBM` | `0xdf19ff23ea25f9cf73b95ad4bddeaf6c6e11f541cf02553b7291f9694df4f10b` | `0x30673fa1d28e0122...` |
| 257 | STOCK_PRICE | TxLens | `CSCO` | `0x2b1f6e1d455af09ab826b67000fc1213cbee916e752bfc69c07eb0e57fb3f7ed` | `0x5ccbe6e0273d119f...` |
| 258 | STOCK_PRICE | TxLens | `SQ` | `0xb3f136077c69689c0cbe1dd42fd737f98847e9337096135832611c9abadf8429` | `0x73a2f7e5e208d305...` |
| 259 | STOCK_PRICE | TxLens | `SHOP` | `0x71acd2f85430301e8caba73c09d0c3590c98b3e2a0a8a2a569281c8f529fd8c3` | `0xfedd2e6b1ceaabdc...` |
| 260 | STOCK_PRICE | TxLens | `PYPL` | `0xcace06eb66608f86af2e00f3d4361961caeb7768ce82b7d79733ef340aecd74b` | `0xc699919cce82bf62...` |
| 261 | STOCK_PRICE | TxLens | `COIN` | `0x18161ce38bbd69b0c9a01f4573dff947570689f65c6034bcf21932e1dd9ef042` | `0x14ef42dfe442ba8f...` |
| 262 | STOCK_PRICE | TxLens | `SNOW` | `0x979126aef5246ab648f9a064e188a4ab5b794e7ab0d8b508d3985bc9fd997b9a` | `0x7f4c7af42899aace...` |
| 263 | STOCK_PRICE | TxLens | `UBER` | `0x72315fe6695db4d66a86d1ff8bc477a9896dfbdb46f031d8d64054cbd225fa3e` | `0xb8e10769b7c64f9a...` |
| 264 | SSL_VERIFICATION | TxLens | `cloudflare.com` | `0x85d1cc5b7c55f5c6fd4ea23b490c1e238e0c1b32993b2dc5f1f4554b5135426e` | `0xe61398a7e6cdfe0b...` |
| 265 | SSL_VERIFICATION | TxLens | `github.com` | `0x7e008abf6df0e7733334ea86e2637c747b0fd1eaa9196c2177d6aa987d9fe86e` | `0x6b3bc0baa04914d8...` |
| 266 | STOCK_PRICE | TxLens | `PLTR` | `0xcd787ae45cab8929b266b1e8cf03805fd0a67f743217bfe0107bafbd69bb9d79` | `0x437cf49958a7e486...` |
| 267 | SSL_VERIFICATION | TxLens | `wikipedia.org` | `0x51d7bba92cb19d1f53cc67ffa7540849793bfde6badcaa00046e4a756f9cb80d` | `0x3c5fc9f860e511ef...` |
| 268 | SSL_VERIFICATION | TxLens | `mozilla.org` | `0x16a269977f898b42f71bd86704fc8e06ec98cadd248b6171b7e72f01278b2149` | `0xb1e3bcf045bed40c...` |
| 269 | SSL_VERIFICATION | TxLens | `google.com` | `0x8d460f0b58928c2a6a2527ab15504c13fff735c2d035a04a04b87c9c0190dc10` | `0x66d94dd249c23184...` |
| 270 | SSL_VERIFICATION | TxLens | `microsoft.com` | `0x3135986f32602fca857aeb427041bc0acc34d08647565fb70a00c4d808e05aad` | `0x45c4747303f3725f...` |
| 271 | SSL_VERIFICATION | TxLens | `apple.com` | `0x131a256bad1414e6bb5934ae48743bc2a73ae8c139de5938789bed6a8d83399a` | `0xc5e6182c88712204...` |
| 272 | SSL_VERIFICATION | TxLens | `letsencrypt.org` | `0x1dc240319c924386dfdb78537fa0c07fd0bccaa5aa9c560b3e0e11615b21a09e` | `0x73654e080b691dd8...` |
| 273 | SSL_VERIFICATION | TxLens | `ietf.org` | `0x9fd7dd796f49c88eec1e1ca09fd025b291955aaa3024b2fd8ae9f734660cb9c7` | `0x49f7fa17b2a60b77...` |
| 274 | SSL_VERIFICATION | TxLens | `amazon.com` | `0x8332eb7e794bd339406f53876c2f7b7f43eb7c93fe09cd26741905bfcb73ad83` | `0x04c976ad9e9ac844...` |
| 275 | SSL_VERIFICATION | TxLens | `w3.org` | `0x842d1bf28a447fd71e2ffd8702dcc58e469666f3f4816aae06dd98f3015b6050` | `0xf471720b507a9aa3...` |
| 276 | SSL_VERIFICATION | TxLens | `etherscan.io` | `0xf662e980e9abafbea846bfb6f7cc1448ccc908352ecebb0a371020751844b1d4` | `0xe301d5fcb780d460...` |
| 277 | SSL_VERIFICATION | TxLens | `openssl.org` | `0xad4e4102b61ad9a905b0dfe1e2f51085507556462d569e76d38755019097725f` | `0x9cdb43aba1e0ab47...` |
| 278 | SSL_VERIFICATION | TxLens | `python.org` | `0x3544c18bb043677988d95f3998e36bd16e80a4a33f4053fb5775fecc80a91523` | `0x96d62b9192f0abb7...` |
| 279 | SSL_VERIFICATION | TxLens | `coingecko.com` | `0x034b7a8376d17d0f33bd160c0450ba648fbb01d07cdfd97e1077c79ce5b434bf` | `0xdf7920fbe2ec0c9b...` |
| 280 | SSL_VERIFICATION | TxLens | `nasa.gov` | `0x30e1b84f65750d153a5ac76dcff0384654d874f88c3ddc3fcb92d99c760fd4e6` | `0x3524327ea4033463...` |
| 281 | SSL_VERIFICATION | TxLens | `who.int` | `0x833abee44d520d404b690e5a3382d9d17839ada9795c7d10de5b4739418b1187` | `0x5108c3c6c0186d60...` |
| 282 | SSL_VERIFICATION | TxLens | `npmjs.com` | `0xc3b8e60d411193914515f9f670f09a885915dc07a27f72de1b2e903cd017bb43` | `0x0a2b6e59a00ec96e...` |
| 283 | SSL_VERIFICATION | TxLens | `reuters.com` | `0xb48db550ae9cd707026fd7ccd812bb8be8bb7d4077ca7c6dac26b12c9c759428` | `0xa20477b7eec9dcf4...` |
| 284 | SSL_VERIFICATION | TxLens | `nature.com` | `0x87f5b9689200bcf0e6d769ea94b2f89c0506f48075aaaaec5b1524b7ba3b3c42` | `0x07203ab6cab73247...` |
| 285 | WEATHER_FORECAST | TxLens | `Lagos, Nigeria` | `0x0b4865edd9b9ace10df89030691f129fd54bd33035c98c3dbf8da4184338bfec` | `0x12ca5bd14fb281e0...` |
| 286 | STORM_ALERT | TxLens | `Lagos, Nigeria` | `0xa73e0152630f2875f522ddec4c0154bfbdbc5c8d2c39b60de28a120af0f9ad87` | `0x026e9f6f7a2c5377...` |
| 287 | WEATHER_FORECAST | TxLens | `London, UK` | `0x0dd117fd915f49e9d4fa9afb60c47cd608aa03f72a80ab81408dbc56c7c40475` | `0x2f3b7cf625a6da5a...` |
| 288 | STORM_ALERT | TxLens | `Tokyo, Japan` | `0x94515eedd14890a44031143f8d7ca7262826df7c04e0652af6a4017e95824b4c` | `0xedbdb01a60f0108a...` |
| 289 | WEATHER_FORECAST | TxLens | `Tokyo, Japan` | `0x81c666322dfd2689ed9c0e51fe959c2d7667fb021800ff8a201f0b0db4feadae` | `0x83bd6696ff5a7393...` |
| 290 | WEATHER_FORECAST | TxLens | `New York, USA` | `0x43dfc26d06cea692dfe2b95dd1a01954a34af360570e83fae645f208019521ef` | `0x66ee42d69987025c...` |
| 291 | STORM_ALERT | TxLens | `New York, USA` | `0x78ae9db91db3c67c44a065f9e9bb0b22b2bdff9a02aa3967060abbbaca9c72ee` | `0xd18347e64ac33dfd...` |
| 292 | WEATHER_FORECAST | TxLens | `Berlin, Germany` | `0x89aceaf3b719738095163691f88fb23e7564fce01d8b1d8f8032c0328392d0f7` | `0x068e20174221dfe9...` |
| 293 | STORM_ALERT | TxLens | `Berlin, Germany` | `0x4ae35423ae050b56a9b2d3982436c79de394763790c46fabe23a04ec31522e30` | `0x76903b8d47386db5...` |
| 294 | STORM_ALERT | TxLens | `Paris, France` | `0x657b2a6561c3aaa9eae08ca1b1b069d2575bd2af1c85c8f3007ff2144d86a324` | `0x7bae6c5d02565eca...` |
| 295 | STORM_ALERT | TxLens | `Sydney, Australia` | `0xa57986fa630c673fea4ff4e44a5d174abbcd9f726110353faea92074402328f1` | `0xcd6a68c277b30f96...` |
| 296 | WEATHER_FORECAST | TxLens | `Paris, France` | `0xd3e8ff8afe77123e61f127648a8d42dfbdeffad658eddf8f882c94eac6ca2ebc` | `0x46cdff2acb5663f2...` |
| 297 | WEATHER_FORECAST | TxLens | `Toronto, Canada` | `0x7159a0a261ae25e10745085c15d5dbd07dfc4b737c351952eab3eade299b60a6` | `0x72a899996fa2d0ae...` |
| 298 | WEATHER_FORECAST | TxLens | `Mumbai, India` | `0x01a0c8b83a336e5cebd7b02ba2088086c1a4f0d0d11821eba61d9474e73d98d9` | `0x2c163d61f73ca32e...` |
| 299 | WEATHER_FORECAST | TxLens | `Sydney, Australia` | `0x777ae1fdf0a75f2f9e5ec294c2ee6d09ecb7f0c9955b3e9ac54e516a2891595b` | `0x5f07980d1c95052c...` |
| 300 | STORM_ALERT | TxLens | `Mumbai, India` | `0x23add32d3bcaa36dd32207a407c0346c293bec3897bd88c1db03aa628fe625a7` | `0xcf6b2ee82775a4d6...` |
| 301 | WEATHER_FORECAST | TxLens | `Sao Paulo, Brazil` | `0x5d64aef57372a7556a0a8157aa30fd9cb4386c97674c470b0dd7abf44bd3863b` | `0xbcb6c5b9d8df7f59...` |
| 302 | STORM_ALERT | TxLens | `Sao Paulo, Brazil` | `0x6237ed439c90da10cf1c176650f6fd8938fd89363fd609656e0e7ba2e24f005e` | `0x803c6a055139789b...` |
| 303 | STORM_ALERT | TxLens | `Toronto, Canada` | `0x4b94798f7b2dd446da1b7eb21ca74ed366588bdd152bc2d85c482e92147ecb1d` | `0x772848bb1f08a519...` |
| 304 | STORM_ALERT | TxLens | `Cairo, Egypt` | `0x696c14f83e7d23397662498d74fc422830961962a97f060deb01eab6cd7bcfdc` | `0x81287388c7ce47ab...` |
| 305 | WEATHER_FORECAST | TxLens | `Nairobi, Kenya` | `0xe14f2fdc2fb08b9f42f613d4bcfc96b1ccb4c082aa35c84e273b49b659c0b225` | `0x6f2099875efb71b6...` |
| 306 | WEATHER_FORECAST | TxLens | `Cairo, Egypt` | `0x16e7d82a838fbd194dbbeb5f1b300a9e83184cc32cb5fe9b2dde1fa13ff2c6e7` | `0x513c1ab251f8edba...` |
| 307 | STORM_ALERT | TxLens | `Nairobi, Kenya` | `0xfc5adb5f78d77704db45427a74cdfa9dbfdd9298c229bfd7680b1fb51f8ab6f6` | `0x625ff54d3e4a7846...` |
| 308 | WEATHER_FORECAST | TxLens | `Seoul, South Korea` | `0xe12099c2ce6a62553e7f3746ed53c85096f4e15b4094bf73372adbfad782d490` | `0x4505f693e965533d...` |
| 309 | STORM_ALERT | TxLens | `Seoul, South Korea` | `0xe2fd1dbc62e669b7c31f06bbb6f40fb37fea91455e3814488e1f61eeee665052` | `0xc69db3526033560b...` |
| 310 | WEATHER_FORECAST | TxLens | `Mexico City, Mexico` | `0x1f69412ffa6a7c368b47e45cc093ecd5f2637ec2c206c8c962ede36702ca2fa6` | `0xdf0035174848424c...` |
| 311 | STORM_ALERT | TxLens | `Mexico City, Mexico` | `0xaaf09c42da2953654d514bcbf5abe65b7c45d7e23e60908a473977c4cb86e276` | `0xeec4b34e9743a358...` |
| 312 | WEATHER_FORECAST | TxLens | `Madrid, Spain` | `0x7521f8703b2f62010fbfb3c91ae2bd268d1c0de3f98b477cc180ec80c37723d1` | `0xd27e3d774c79d4c1...` |
| 313 | STORM_ALERT | TxLens | `Madrid, Spain` | `0x17a26b9bf48c0dd535ef3eb1c3583e53ed61903072cdcb839ce770a97cbf3cde` | `0x5dfaa8a5072b6e37...` |
| 314 | WEATHER_FORECAST | TxLens | `Rome, Italy` | `0xc77f13389599971ef3664bd1eb900b0d1bca0e4f8b716beb416d4b9fc62b7a16` | `0x6e27365edf698631...` |
| 315 | STORM_ALERT | TxLens | `Rome, Italy` | `0xae46ff4108a9892758ee5f6a7eb7b8badb2a0fa6b5bf2d0a6061292020c86435` | `0xa8882269c9f19860...` |
| 316 | WEATHER_FORECAST | TxLens | `Amsterdam, Netherlands` | `0xd486dce7fe9de2ff5319fcd70afc42aa346d9bfea2ae5d02b3a08ae38834d91f` | `0xf7add5225eb5d026...` |
| 317 | STORM_ALERT | TxLens | `Amsterdam, Netherlands` | `0x1e5e9e53012ccb951bd2c0315a0634181006560bb6b4506238cba1039fac94b6` | `0x0195d537cca59249...` |
| 318 | WEATHER_FORECAST | TxLens | `Stockholm, Sweden` | `0x2be64f6f9d52a4f3ee5df76ba0259ca8b4b0b593a0bd8294eaa8a1c4b24f0925` | `0xe4c4e7b9e799e1d8...` |
| 319 | STORM_ALERT | TxLens | `Stockholm, Sweden` | `0x06fcc73d9020d3b0f2b72483cb187da3641882a7fe038bfd98d3ceef8717ea05` | `0x353f03a4419b5cb2...` |
| 320 | WEATHER_FORECAST | TxLens | `Singapore` | `0xad70e604d92c898a59fb2f7ef5e98f9db356e9d17ff51ea430fa03c7ab33fbe2` | `0x87b0b880cf03e828...` |
| 321 | STORM_ALERT | TxLens | `Singapore` | `0xb18321cd036832eed320558fa0b7ac9799b5b177173d118d22da07a0449970be` | `0x0ca54633c857bef1...` |
| 322 | WEATHER_FORECAST | TxLens | `Dubai, UAE` | `0x9fd9d9856cc7be1266400f4d6685bf0e7e6d67c16cbf6a658c1f34f9420fa1b7` | `0xcba0729827b4e0f9...` |
| 323 | IP_GEOLOCATION | TxLens | `8.8.8.8` | `0xb0bdaa4436a057744b6e7ef46a80547ec0f9ce7bdb61e2b0ec5e592a9a6f83f2` | `0x92e62c99b731b88a...` |
| 324 | IP_GEOLOCATION | TxLens | `1.1.1.1` | `0xf8258155bced246f505759733b9c1cc4f854b606ebba09a92c02f9bd37562478` | `0x8caea6f3d1c4270a...` |
| 325 | IP_GEOLOCATION | TxLens | `9.9.9.9` | `0x33941f8ad96d602809255275c93af3b70b46e2db8549c2af8b66ef0a1ec45298` | `0xde6adaf8a0dcc245...` |
| 326 | STORM_ALERT | TxLens | `Dubai, UAE` | `0x8a8b73d7dd402d6e59032469c8ad8757996df4b906568a1c69a5f84072d02309` | `0x1ec047858d7f5199...` |
| 327 | IP_GEOLOCATION | TxLens | `208.67.222.222` | `0x7461fa1c6b9287d14a76caed9598a0f8e6571c8b799cc0de4faafc523f1c4e65` | `0x103c511aad0ae8c2...` |
| 328 | IP_GEOLOCATION | TxLens | `8.8.4.4` | `0xbd4db9ce1f5be35dd4c8eac1d72c9b023b77bfc5380771ebc53c483ed10437f8` | `0x6ae4680e772d477c...` |
| 329 | IP_GEOLOCATION | TxLens | `1.0.0.1` | `0x8f0fd2deb816ee0bbea49f2fa7bd9026b803ee8e59a25c977952ab8dcb39f2ec` | `0xa3cee15be7731808...` |
| 330 | IP_GEOLOCATION | TxLens | `149.112.112.112` | `0x2b12e4a7ab740911e1b5b60fa555b00b0026b8ef4b47f6682d1237934f0e8f2a` | `0x8b86d8f35a30055c...` |
| 331 | IP_GEOLOCATION | TxLens | `208.67.220.220` | `0x640bba59bb79e1c9e9a496adfd0f0c9b58134f38a6f2f441b94f25823fa1b924` | `0x722a6a6c3e63f890...` |
| 332 | IP_GEOLOCATION | TxLens | `4.2.2.2` | `0x9c75eb6b3585117d4dd3499f79a6606f0213cd78c95c1503ebbdda831512f8c7` | `0xb8dee39ee5981847...` |
| 333 | IP_GEOLOCATION | TxLens | `64.6.64.6` | `0x8acb58552cb98979e89e3df1cbdd552a56dd1383300239e392190a29b0a2752c` | `0x0e2a95710fa0d9e0...` |
| 334 | IP_GEOLOCATION | TxLens | `77.88.8.8` | `0x05d2dfb0486608f3127fc560bf7bcffed43bdf6a0a6723d1006faae116ec73a1` | `0xdfa27818b6098172...` |
| 335 | IP_GEOLOCATION | TxLens | `80.80.80.80` | `0xe6733fb0a948a4f8a337052276c3da69d6220580eb9e973cdb1e738cb23caee8` | `0xe2b236901b6f8b5a...` |
| 336 | IP_GEOLOCATION | TxLens | `76.76.19.19` | `0x4ce9eec7a33abb6b1a7050de93560f22ab195fbfbca17b3e9ca7920b72e8e96a` | `0x5795f2ae9fcd15c2...` |
| 337 | IP_GEOLOCATION | TxLens | `94.140.14.14` | `0xaf45c1cc2609638e2be9df21cbfbf7e738b0fafb8eff5e480948da9842f4c811` | `0x31a968f9dc522155...` |
| 338 | TVL_LOOKUP | TxLens | `aave` | `0x97d60269d1af73e5602c133583c08dd6d5ad8c7d1f4ef09bcce7943b9c443bdb` | `0x93795896e9cf9989...` |
| 339 | IP_GEOLOCATION | TxLens | `185.228.168.9` | `0x40e598da9e89b38f93c63b3f03a084cb30c7db507c4e6c586e45aac048d1ef33` | `0xe670e91b3390b82f...` |
| 340 | TVL_LOOKUP | TxLens | `uniswap` | `0x1a40d29a0b6bd4919400723a2278776c63733013f2c36e7f95c8d606156a31c3` | `0x75016db28407f61e...` |
| 341 | TVL_LOOKUP | TxLens | `lido` | `0x1f337de61d4ef2fc05c3e83dbd6d6e5889bd8ac06a39c2e2ccf4f6746df94663` | `0xceeb7015751f69fd...` |
| 342 | TVL_LOOKUP | TxLens | `makerdao` | `0xabf5a0169538c629c219fc260263457b32680675f920a7c40b9937fdcd7cf16d` | `0xad01f862dad90cf5...` |
| 343 | TVL_LOOKUP | TxLens | `compound` | `0x8e03372ac8dc1f693f9752a2634eaddcc4a8184054de564b59e11df57295c898` | `0xe6a48cf3ad5e172b...` |
| 344 | TVL_LOOKUP | TxLens | `pancakeswap` | `0x1d8a8e26d4922177d4552cd58171e820361809901e7a6156c5328830e154c736` | `0x5741dc872ead24be...` |
| 345 | TVL_LOOKUP | TxLens | `curve` | `0xfcdee7f3ca8b9f838960809fd63ad9b2d8f924364703132291e0314b8fdd99ca` | `0xb32641529ad810b9...` |
| 346 | TVL_LOOKUP | TxLens | `sushiswap` | `0xe3f8842b8d1d0db4a5e42285f32e1d14925a24baf8dbad06d926919696cfdff9` | `0x2b62693e32169bb1...` |
| 347 | TVL_LOOKUP | TxLens | `balancer` | `0xe1d9f5e9aa570af343b36c04cef36ad60a01e4711006d5ffe22ab48067a982c0` | `0x6e0fcedfdcfce1af...` |
| 348 | TVL_LOOKUP | TxLens | `yearn-finance` | `0x40d99216f992c34f852f2b7698ba25c0cb341b61547a001f45f28d6f1561fe02` | `0x008f5345884b563f...` |
| 349 | TVL_LOOKUP | TxLens | `frax` | `0xdbec0f54d52e1bedc2f716e5d0c4d7b9f610682a6f7f41106cc0c408f4a7d591` | `0x470a34de1f891ac6...` |
| 350 | TVL_LOOKUP | TxLens | `rocket-pool` | `0x768f1fd4d40173bf1e11e34cbd7f0817afd0e3917e93bf1723e2ca76d861d68f` | `0x90968c61ff615943...` |
| 351 | TVL_LOOKUP | TxLens | `gmx` | `0x26903b633ef4993216e9be9882eb79d195372f2b18390acda0a26b90cb35aa63` | `0xf0670c1e3dfda51c...` |
| 352 | TOKEN_HOLDER_COUNT | TxLens | `USDC` | `0x306bd34dff0295fbc1119da0ad2669876a4f2cc5dfd4e7192ae1360cda816ea2` | `0x8f78c263b4917184...` |
| 353 | TOKEN_HOLDER_COUNT | TxLens | `USDT` | `0xe64d673b00a76516d7cab3d8a16314291c6ce90626963ee99790438d07962357` | `0xea71baff610021d0...` |
| 354 | TVL_LOOKUP | TxLens | `convex-finance` | `0x1c45f5211d28fcdec2575f26a5cd9a477770260b42315d3082a1246f348acdc7` | `0x03700123129c40f9...` |
| 355 | TVL_LOOKUP | TxLens | `synthetix` | `0xd896b7cd750b27a4b6882e71a53f79406524bcd6dbc104d1c0e72f850f893c36` | `0x97468af6c82f8e55...` |
| 356 | TOKEN_HOLDER_COUNT | TxLens | `DAI` | `0x4c8880dfed01e06e73c046b92c3274591ad6bb91d1e6e46fde9cf670b48d20f2` | `0x41197cc80758f1d3...` |
| 357 | TOKEN_HOLDER_COUNT | TxLens | `WETH` | `0x659a11b363dc66b1bfc8145e059eff5c82b1b50f1c23ea8c99d34766110d0fe1` | `0x9a675b738128b821...` |
| 358 | TOKEN_HOLDER_COUNT | TxLens | `LINK` | `0xce72053cee153fca2193f3b1390e6c000a34680dd3176e0b8dda4809453d53f5` | `0x7347ee9c302bc18b...` |
| 359 | TOKEN_HOLDER_COUNT | TxLens | `UNI` | `0xa653cca25c86f7543df7dfdfedf5d4960d3ce03b47de2da8d866995b04de425e` | `0x2f03cfab5d71a86a...` |
| 360 | TOKEN_HOLDER_COUNT | TxLens | `AAVE` | `0x0f2fe65af80d39e2e270de8330c15868134e79880a37b0e48006cb4f1e6d9314` | `0x067ec0a368e877e5...` |
| 361 | TOKEN_HOLDER_COUNT | TxLens | `MKR` | `0xb377e237aabee18c1dbb4c3fd3aef052582354bacbb61494e3cea9300894d1f7` | `0xfe7a415e6316f01f...` |
| 362 | TOKEN_HOLDER_COUNT | TxLens | `SHIB` | `0x01e073ed4516bec1cc3f4a4e75f69902731adacd5fd344b242423d5edfbcb99e` | `0x25acb412607924d7...` |
| 363 | TOKEN_HOLDER_COUNT | TxLens | `WBTC` | `0x36ff83887719f98f24daf5a8748304fd9bd694599a443c93eea7d54e8c2447db` | `0xca98affa78556922...` |
| 364 | TOKEN_HOLDER_COUNT | TxLens | `MATIC` | `0x5d3835763b53a56540d740cfe84e849335cedc08c00eeb92053478e14219453a` | `0xce50ef0dff6ea5c5...` |
| 365 | TOKEN_HOLDER_COUNT | TxLens | `PEPE` | `0x7fc97d69887b4ad784dc7659d3543525241fb3823f99805deac9d19ad8b6fbcd` | `0x60664790c309fb05...` |
| 366 | ACADEMIC_SEARCH | TxLens | `quantum error correction` | `0xb1e0f0f4ffe4ac644dce4fee5d800728eaa973a71aa78574deacc8c4f5893fa5` | `0x02f1bdabaa17dfd9...` |
| 367 | ACADEMIC_SEARCH | TxLens | `large language model alignment` | `0xf6db806a3da8d88add7e99bd66f57d3372e4924742572ba21cf1607e416e03d6` | `0xd7dea8c8fa5e55d6...` |
| 368 | ACADEMIC_SEARCH | TxLens | `perovskite solar cells` | `0x11c69d6a3b01fec70613c5add65faceb76d8f8d1db5de85b47351f89d5a408ab` | `0x937ed18e5ac4c21e...` |
| 369 | ACADEMIC_SEARCH | TxLens | `mRNA vaccines` | `0xad300d40c4fd087436686b55acd41b2e90c8a7a8da4084f73eb5f02163677e0c` | `0x121823910acfa483...` |
| 370 | ACADEMIC_SEARCH | TxLens | `solid state batteries` | `0xfc24b5894e82399b1b6f9fe18d74e1c88908de15e7d145c4f1954618715d81cb` | `0xf43c549443d40853...` |
| 371 | ACADEMIC_SEARCH | TxLens | `carbon capture and storage` | `0x97113d9d9b24835d315cc697dd8ca6f77800fd04f37ef0f8cc351bddad7ab372` | `0x5771e78a48920faa...` |
| 372 | ACADEMIC_SEARCH | TxLens | `room temperature superconductors` | `0xc17476f5002e5c15da9ca30b24c9c1878fead8cc04f968bb3b86dce481eb9240` | `0xbc4d23fe4d3d97dc...` |
| 373 | ACADEMIC_SEARCH | TxLens | `CRISPR gene editing` | `0xf2176625febe7750695b0c0688843f00c72fbb017b16ea71ca67836ec42a2004` | `0x8e61b740f80c2627...` |
| 374 | ACADEMIC_SEARCH | TxLens | `protein structure prediction` | `0x7733f1efa881c9347b55036c6cad21d54111269215956d316b7f257552bb73e1` | `0xb4dc0b8e7ad47ad6...` |
| 375 | ACADEMIC_SEARCH | TxLens | `fusion plasma confinement` | `0xf11e9c208f5125f15494e750eff5655612d7b7c50aa8b4dc2dcfe9db994c9c02` | `0x7233bc75699cce9d...` |
| 376 | ACADEMIC_SEARCH | TxLens | `neuromorphic computing` | `0xedb017746e0e7756c5408ceb9138cb6b7bcc95ffad422af467eadcaab3bc937b` | `0xc65b90144d9ec597...` |
| 377 | ACADEMIC_SEARCH | TxLens | `federated learning privacy` | `0xec0ba22339d31849e2516b23d9d9c22f1c98d1cb6e674d5a0654114bf33c85a3` | `0xb86d3c343869d85e...` |
| 378 | FRAUD_DETECTION | Telegraph Sentinel | `0x098B716B8Aaf21512996dC57EB0615e2383E2f96 ...` | `0xc0ce0b2ddd1672cc2dd04b921d989d550571b3a2da5741f22d17c33b9b1d22e3` | `0xc412eeff4b9840e6...` |
| 379 | FRAUD_DETECTION | Telegraph Sentinel | `0x098B716B8Aaf21512996dC57EB0615e2383E2f96 ...` | `0x768c1979d9a1fe43d78173bbf65334692dced807407788d7b197e7319c723f37` | `0xd46f9d3d06c22870...` |
| 380 | FRAUD_DETECTION | Telegraph Sentinel | `0x7F367cC41522cE07553e823bf3be79A889DEbe1B ...` | `0xf19cfa0c2d423a3ae8454a5eaa284401e81245dd0686baf784dab003dcb4d745` | `0x1621f88a1f2ef7b6...` |
| 381 | FRAUD_DETECTION | Telegraph Sentinel | `0x7F367cC41522cE07553e823bf3be79A889DEbe1B ...` | `0x10f23153bb22bf1f3a988ec91d31eb8824e7ea570391d15cb48fc17fead24ecb` | `0x44a8d8db508eb38e...` |
| 382 | FRAUD_DETECTION | Telegraph Sentinel | `0x8589427373D6D84E98730D7795D8f6f8731FDA16 ...` | `0x7d96da58920b4136ed2d99be028ac2e68b118fdd91751f7e94a9d76ca7479d06` | `0x6b106c4945a8a089...` |
| 383 | FRAUD_DETECTION | Telegraph Sentinel | `0x8589427373D6D84E98730D7795D8f6f8731FDA16 ...` | `0x4a609f4fa1bb4060dc52ec591d8e7150ae2b21e5204e4bbda5735830e663766c` | `0x38ba9f05d9f74794...` |
| 384 | FRAUD_DETECTION | Telegraph Sentinel | `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 ...` | `0x5a7e2726587d2104f8ae2da607c0ed5879d3e6430eeeb907c80a49ac8ed07ef9` | `0x602b9afdae11064d...` |
| 385 | FRAUD_DETECTION | Telegraph Sentinel | `0x28C6c06298d514Db089934071355E5743bf21d60 ...` | `0x647f4eb692b210b277a23ddc0ed158a7d36963cfb1daae29042de3a8d58f34ad` | `0x93039090a72344d4...` |
| 386 | FRAUD_DETECTION | Telegraph Sentinel | `0x28C6c06298d514Db089934071355E5743bf21d60 ...` | `0x5f0ab186c0696f396f994b37840c2c03a2eeed3aada267a2c80a84e4df74df49` | `0xec2d4035dca661f4...` |
| 387 | FRAUD_DETECTION | Telegraph Sentinel | `0xdAC17F958D2ee523a2206206994597C13D831ec7 ...` | `0x4c675cdb9cd9075ba8a68a950bc88c6005b6a422f165164e7c5c3f086e9b4a94` | `0xfaf4c380d7034344...` |
| 388 | FRAUD_DETECTION | Telegraph Sentinel | `0xdAC17F958D2ee523a2206206994597C13D831ec7 ...` | `0x5cea1c98f37403e0094774b54ecf667f86edfe7e74552e9854256c160b933803` | `0x4bdff70ee0653b40...` |
| 389 | FRAUD_DETECTION | Telegraph Sentinel | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 ...` | `0xc673065fc664293369c73ef05ba63f76ba78d216ef32cc3a535396e19083b635` | `0xa1915e2b12eed8a8...` |
| 390 | FRAUD_DETECTION | Telegraph Sentinel | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 ...` | `0x0fc8b5890dac8e6e65753cfeee61f9cfb6550cd4199ee573c791561efee54e0f` | `0xe12b065d147c8344...` |
| 391 | FRAUD_DETECTION | Telegraph Sentinel | `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 ...` | `0x77d4ebfea847519b9dbba784e79eb3953e6379c408a2431515120cf254e6b86d` | `0xa1d6050f148f5aa0...` |
| 392 | FRAUD_DETECTION | Telegraph Sentinel | `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 ...` | `0x72d83efb17a2b58c1fdfc978df0edeedbcf13a16bf1e2b1c27aea83b232c2582` | `0x25c9edc7c93a4424...` |
| 393 | FRAUD_DETECTION | Telegraph Sentinel | `0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549 ...` | `0xc4a11820dcb6bb9750e32b6340f8fc434d3af89ba19717a254e07ff5f552cd4b` | `0xaace6cfecb7bf398...` |
| 394 | FRAUD_DETECTION | Telegraph Sentinel | `0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549 ...` | `0x25f527a27842867ddc897c853432e58d73f8b891d1907310c641200a063c7db3` | `0x439a77515846f6c5...` |
| 395 | FRAUD_DETECTION | Telegraph Sentinel | `0xDFd5293D8e347dFe59E90eFd55b2956a1343963d ...` | `0x92ae48f7f19adfe4aa6133378c984c09f2a0e745f71c1778e4157c84bde62388` | `0x967d103949ebc76f...` |
| 396 | FRAUD_DETECTION | Telegraph Sentinel | `0xDFd5293D8e347dFe59E90eFd55b2956a1343963d ...` | `0x51b72ce41f490951a592ce08bf49720ca1aa3713729b839d5b68c045eae7c54c` | `0x793d949e1148593e...` |
| 397 | FRAUD_DETECTION | Telegraph Sentinel | `0x56Eddb7aa87536c09CCc2793473599fD21A8b17F ...` | `0x8bb821d925ffe3845284a84376e47bd212e46964f8999dc383045a96d41a85c1` | `0x095625f5bae09886...` |
| 398 | FRAUD_DETECTION | Telegraph Sentinel | `0x56Eddb7aa87536c09CCc2793473599fD21A8b17F ...` | `0xf5d80b556c01eddcefb529b2d1dc49d475e6cbf908c053a7374051712305c6b0` | `0x6f5c9a3387a60ce2...` |
| 399 | FRAUD_DETECTION | Telegraph Sentinel | `0x9696f59E4d72E237BE84fFD425DCaD154Bf96976 ...` | `0xcc42f6e8910c2e6af53287e0cd82bf00feebf515f88110f860d1b2415b740e35` | `0xeb8aecfe666fbe02...` |
| 400 | FRAUD_DETECTION | Telegraph Sentinel | `0x9696f59E4d72E237BE84fFD425DCaD154Bf96976 ...` | `0xbe819f7e0ce0856d4655ae55ca4da520b7b3141a771e8a22e186cef78a639660` | `0xf65b1d456360fced...` |
| 401 | FRAUD_DETECTION | Telegraph Sentinel | `0x4976A4A02f38326660D17bf34b431dC6e2eb2327 ...` | `0x3b5255765b745553579606f8b6eebcbba7c2b3c5e78e3a912c21767e657d1be7` | `0x11adb2e2e86ce626...` |
| 402 | FRAUD_DETECTION | Telegraph Sentinel | `0x4976A4A02f38326660D17bf34b431dC6e2eb2327 ...` | `0xd674fe4b725f556cf786ab65c415bb343694d6ff708a6a45fb65b7364f3617b6` | `0xaae8236269e29b05...` |
| 403 | FRAUD_DETECTION | Telegraph Sentinel | `0x6262998Ced04146fA42253a5C0AF90CA02dfd2A3 ...` | `0x1b786c805f306aec6d6cedc1b9eba327009f41962e181cd8ff99be6cb7fb60dd` | `0x7c673e6c7e9568c3...` |
| 404 | FRAUD_DETECTION | Telegraph Sentinel | `0x6262998Ced04146fA42253a5C0AF90CA02dfd2A3 ...` | `0x51af4eb88890608cbdccde2dc3878654fa6485396bd8bc09821c59cc7f4529c0` | `0x9e376401bf7949ac...` |
| 405 | FRAUD_DETECTION | Telegraph Sentinel | `0x0D0707963952f2fBA59dD06f2b425ace40b492Fe ...` | `0xe028c7c304f1a72709c86574ee368cb6b276b6cf1d768e1bc5ebb3b93c22c5a4` | `0xb9cacd8a0c335e86...` |
| 406 | FRAUD_DETECTION | Telegraph Sentinel | `0x0D0707963952f2fBA59dD06f2b425ace40b492Fe ...` | `0x64ace4b8e4f3bb580ba233f3633d0699861ef2b90a43ca1393842acb15e787ed` | `0x4f4202f42ea83a98...` |
| 407 | FRAUD_DETECTION | Telegraph Sentinel | `0xF977814e90dA44bFA03b6295A0616a897441aceC ...` | `0x723b89471264e632e9289c673f8c99f3d95ece6f446762280e452cb35d037651` | `0x7a858eae66125e9e...` |
| 408 | FRAUD_DETECTION | Telegraph Sentinel | `0xF977814e90dA44bFA03b6295A0616a897441aceC ...` | `0x865a6d29d9d4f7acccee310fc928bd9b9f68a70579e88337ead03f20eff03671` | `0x6e6ec671ac675faf...` |
| 409 | FRAUD_DETECTION | Telegraph Sentinel | `0x5754284f345afc66a98fbB0a0Afe71e0F007B949 ...` | `0x3e1dbab2215c9cd506b96fc46e0d68019c69377d5af97aef504b851004440b00` | `0xe55d16ffebb8cd56...` |
| 410 | FRAUD_DETECTION | Telegraph Sentinel | `0x5754284f345afc66a98fbB0a0Afe71e0F007B949 ...` | `0xd1a331bac388a26ca640fac0b20c2b7b98f941fc217613fcb253e00b633e4922` | `0xe83c7e04bf498235...` |
| 411 | FRAUD_DETECTION | Telegraph Sentinel | `0x1522900B6daFac587d499a862861C0869Be6E428 ...` | `0xfb6d27ca4f5261f881d96c81419663c5a6b72b8e3521257461bac8b0eda1cbd0` | `0x696e7ca09993c95f...` |
| 412 | FRAUD_DETECTION | Telegraph Sentinel | `0x1522900B6daFac587d499a862861C0869Be6E428 ...` | `0x7798d2c4b4d2145bb6a33ff43671db6a598339e909cb4c7f176b0c9911607bb8` | `0x3c0e9fb411349a7f...` |
| 413 | FRAUD_DETECTION | Telegraph Sentinel | `0x503828976D22510aad0201ac7EC88293211D23Da ...` | `0xc799e6862478b863b9ca6882f58de6069bce76fd8557f5eb977745cbbe14822e` | `0x0fd44ee2ce9fbe88...` |
| 414 | FRAUD_DETECTION | Telegraph Sentinel | `0x503828976D22510aad0201ac7EC88293211D23Da ...` | `0xcd4fcc3bb5a1eb8b2f7a02916f13534d5a0aa928ccd50130d9b826b8c4e45f7b` | `0x501734f0d9ca3a6e...` |
| 415 | FRAUD_DETECTION | Telegraph Sentinel | `0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740 ...` | `0x980b2ac67be1eda3e2593d8ab84fa2ec067a55b3ce161f3b728fb486a56474bb` | `0x4549634d09585c70...` |
| 416 | FRAUD_DETECTION | Telegraph Sentinel | `0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740 ...` | `0x241ab5a16325906b1ee0d311891b5ea22de342ba08d74e5c3be6924c9d6c1919` | `0xc3a7743fee610369...` |
| 417 | FRAUD_DETECTION | Telegraph Sentinel | `0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE ...` | `0x8145f79f1f735104e608e8206800fedc2b514d881f78f0731adbe91c80953712` | `0x5173d6419a4f4955...` |
| 418 | FRAUD_DETECTION | Telegraph Sentinel | `0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE ...` | `0x2e569ddb147381bf429ebccbf324109ae06edd91cedc661e531d04889cbfcce5` | `0x2378a8147c9d4312...` |
| 419 | FRAUD_DETECTION | Telegraph Sentinel | `0xD551234Ae421e3BCBA99A0Da6d736074f22192FF ...` | `0xbfa95f36feecdfda97123fec8ff8e941919ea1bbc00fd4e8c795bc91f7cb6c4e` | `0xfd57055c521e94bb...` |
| 420 | FRAUD_DETECTION | Telegraph Sentinel | `0xD551234Ae421e3BCBA99A0Da6d736074f22192FF ...` | `0xebc83af7918cc009afdb61da81219a6945c83d290eadf5177740d2655ba3c15f` | `0xb9562b320237b455...` |
| 421 | FRAUD_DETECTION | Telegraph Sentinel | `0x564286362092D8e7936f0549571a803B203aAceD ...` | `0xe289bcb4c0cb4129bb5d594b2f6bb550d27230c29fe3ce46c2e6e199bb7923d0` | `0x88d7d2e640d71cca...` |
| 422 | FRAUD_DETECTION | Telegraph Sentinel | `0x564286362092D8e7936f0549571a803B203aAceD ...` | `0xc30e30f7475132704b0a5d700b8de942fc02dd7f9e40c440cc654281188804c9` | `0x33af144d6cb1c599...` |
| 423 | FRAUD_DETECTION | Telegraph Sentinel | `0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF ...` | `0x2dd500b4690c2ab13338f90cf7fd962ac5acc3af3e8f19bf2a2b19d9cfe37160` | `0xc299b1cff865df12...` |
| 424 | FRAUD_DETECTION | Telegraph Sentinel | `0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF ...` | `0x429529636f79c11903d41d781dea8a9a9255afbd62f8a1affaacbd79b07d5f01` | `0xd5ab13a7c81fa677...` |
| 425 | FRAUD_DETECTION | Telegraph Sentinel | `0xfE9e8709d3215310075d67E3ed32A380CCf451C8 ...` | `0x9d0fdae0d46a1dba7bbd270a780e28a307bf14b86d157d30ecbaea12c67a52b2` | `0x57a7aac7a1ac910f...` |
| 426 | FRAUD_DETECTION | Telegraph Sentinel | `0xfE9e8709d3215310075d67E3ed32A380CCf451C8 ...` | `0x2a6121fc207939ab349a134132a6f068d8d7cf8bca6a7181f53350ff290b5c8b` | `0x30745dd109bd8079...` |
| 427 | URL_SCAN | URL Sentinel | `https://sourceforge.net` | `0xe6b29a7b136766ebe0b1413e4d3452cb10f87535d4601e2dbae9d65ef5f03996` | `0xedb664310f74e502...` |
| 428 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://sourceforge.net` | `0x2105c8da0bbeb6559f185b18677fd38251bd0809ca179907303a0995fdcd277d` | `0x74a1700449ec72df...` |
| 429 | URL_SCAN | URL Sentinel | `https://gnu.org` | `0x15d202014be1435582bbd5b9d462bd2dbfd963be2fceec5147c1bec1b2786530` | `0x71453d6332a04396...` |
| 430 | URL_SCAN | NetWire URL Scan | `https://sourceforge.net` | `0xfa25830496c264597af7170d6e025efdaa98ee95f79ceee1ba4158d01561c1b5` | `0x4967b0e9eb6d207d...` |
| 431 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://gnu.org` | `0xb0febeb4a9372c2037c50888b96c4c28a35a5c17ec5bf7e39caff55cdf3d939c` | `0x37bc48df8aba84d3...` |
| 432 | URL_SCAN | NetWire URL Scan | `https://freebsd.org` | `0xea4d99d8c79410e8efff0945212245449b4b8cd3da3e709ea86cc22f545ced41` | `0xc3fef04659054c6d...` |
| 433 | URL_SCAN | URL Sentinel | `https://freebsd.org` | `0x3a15fa7da05a4c6638364f2d26e2613190f57f0389d157da74de12778f46db21` | `0x16e5f78e1fe81833...` |
| 434 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://freebsd.org` | `0x8ac712a1a81c4f64af3d7a71d01106500069c38d7ecaee30e98ddb4ae56b6b87` | `0xc0b6795abc92413a...` |
| 435 | URL_SCAN | NetWire URL Scan | `https://gnu.org` | `0xf299a7b5195afea0c87684e396e5b9950f82ab36a3b0ebc36103da197e3a9abe` | `0xb2a46543175343e9...` |
| 436 | URL_SCAN | URL Sentinel | `https://openbsd.org` | `0x52d865c8d499e670aeceb28c4ca7c7b3086e8fdcc78e0adba1b7851003f67fdc` | `0xcd00afb07150aa33...` |
| 437 | URL_SCAN | NetWire URL Scan | `https://openbsd.org` | `0xc8d9fad1158be90bc66c0f43468ea6f54850a708e52fe9cfe61c3479975b70dd` | `0x75d039aeccc1426b...` |
| 438 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://openbsd.org` | `0xce7cdd8ce7bedcd8582b8f9f453080caf18c3debf98d084519d1da88642d2c10` | `0x5ad24fc52484fe1e...` |
| 439 | URL_SCAN | NetWire URL Scan | `https://vim.org` | `0xa85d5cb9b8c29cdcfa5df47dd0a912fcd1052dca890f65f73f77cbdb6162cf87` | `0xa9776332cfebcb43...` |
| 440 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://vim.org` | `0x0f6ef8ff71845c39ff0d05225ed273d44b1d9b1ade5362bf6fc3487312687d61` | `0xfa0d2c1cdc3f9df9...` |
| 441 | URL_SCAN | NetWire URL Scan | `https://gnome.org` | `0x6c03096bdbc2cdec8e81b189f4c582cb9b9b321b75dcf56accdbbb805f7a1248` | `0x765d1d68cb88bc8e...` |
| 442 | URL_SCAN | URL Sentinel | `https://vim.org` | `0x12036d4e949b1b2640e9eb4a3e9cdd8234666437e6397888b8fd8debccf1d32b` | `0x4e44f93757ab70ed...` |
| 443 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://gnome.org` | `0x204d60b1a00a19f0f068e0b0641e9294542e08f12b371fa13750b5b24e6860fd` | `0xb9f66d210aa3f7ea...` |
| 444 | URL_SCAN | NetWire URL Scan | `https://kde.org` | `0xe76958557378ae076099f726865dc38bbed5164ef60f3f57b54365e4bd64f33c` | `0xbea76e2b074cde62...` |
| 445 | URL_SCAN | URL Sentinel | `https://kde.org` | `0xfb62f50cb8ea532fe57d856db014b67d7a7286977bd87c77d60a1d676080c75a` | `0x23112d273e46e50b...` |
| 446 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://kde.org` | `0x44d8642e16be86eb12a8a0d7539a3aa7de7dc69daf7d12954b2153863d62978b` | `0x0374cc4d559fafc7...` |
| 447 | URL_SCAN | URL Sentinel | `https://gnome.org` | `0xcb2b1f28d1ebaf7ad0abe1381575c6f812911dbc4dac2a93afb04c23699097e0` | `0x2606b3404c9b1029...` |
| 448 | URL_SCAN | NetWire URL Scan | `https://blender.org` | `0x47addd0c5fcec13cc0a1525e6ee691cd5c60f36fd95da06551005925fe50f13d` | `0x8b2b7155a66bc94e...` |
| 449 | URL_SCAN | URL Sentinel | `https://blender.org` | `0xfa886bcca686dbeec67a1f2feebfa910cc6dafddb71220d35dae5ebeccc331a3` | `0xbbaa4774fa9dec84...` |
| 450 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://blender.org` | `0xe7837e882d314863af7f47ebb7890e663f692fe2552f536d5756435f0271f7ec` | `0x971331998b556d82...` |
| 451 | URL_SCAN | NetWire URL Scan | `https://inkscape.org` | `0x127afab6a0fba0202f26d91b7f319f0b832f7bf0348ca171a67b36629e42db9f` | `0x678d23b44911fe48...` |
| 452 | URL_SCAN | URL Sentinel | `https://inkscape.org` | `0xedd587737ec4fce66a86009455afec56202d93512ea904ed7d723dcc4eeda714` | `0x9cf0b898c36ef144...` |
| 453 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://inkscape.org` | `0x2d4f3b1a43acab72c798d07eaf1416e33b32e8048d6784602fab55cb237ce887` | `0xedff7fde4fa755c0...` |
| 454 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://gimp.org` | `0x4cf8d9efdf66e60241ab8f5e6e3d95a1772819a8b667fb5a9f76ab75fa99acab` | `0x4ae828d73f521cf5...` |
| 455 | URL_SCAN | NetWire URL Scan | `https://gimp.org` | `0xe26f8d5cf09236bc32d2d2cbdd00df70d479706785468e3bbe4225fd2a9cf157` | `0x0164eda79f95b49c...` |
| 456 | URL_SCAN | URL Sentinel | `https://gimp.org` | `0xf1a355755e1f7a74f366b948d5e22cb0ec07d8237edf24c1cf00adbfcefa2587` | `0xecbcadccc90be565...` |
| 457 | URL_SCAN | NetWire URL Scan | `https://libreoffice.org` | `0x808a39af73b7d7c942d331e4d2b4b14bc89c1c9035740bfcd45b1cb77b979d7d` | `0x100ac538fc72f9dc...` |
| 458 | URL_SCAN | URL Sentinel | `https://libreoffice.org` | `0x24e2016a2e633525baff60170a930890b5be7b3b5cb9aac1a2434489d7186920` | `0x2fe36a367252ee7b...` |
| 459 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://libreoffice.org` | `0x54c281eef7843bce4138939cd6225c39abe17e173ac1f18cdb48dae27249870e` | `0xa701715d80ecbfb5...` |
| 460 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://videolan.org` | `0xda12c3d0e020ac805401213e3ff4bbc7454a47892fceba2a6df7c76478c651f3` | `0xe3d0cb314f59aff8...` |
| 461 | URL_SCAN | URL Sentinel | `https://videolan.org` | `0xe8e02f581b635be5f60a7e99c5d9ab31f0ab5f9e3b3f08181884784eee36b438` | `0xaf659deb3346fa2c...` |
| 462 | URL_SCAN | NetWire URL Scan | `https://ffmpeg.org` | `0xf854989c253c073fbd33d9864356413e6374c741ad8ea74769d0af357d880904` | `0x50d9580939b15ea8...` |
| 463 | URL_SCAN | URL Sentinel | `https://ffmpeg.org` | `0x2248ccaad86760fec9b454cd10518eff39d78d647956eb91cda6ead1320d9069` | `0x41a0772c0db7b17b...` |
| 464 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ffmpeg.org` | `0xe70496d7c1ea9dc48330465b34f7d9e787c214b1a16422414dc19c91acdb35b2` | `0x782ce2c5397e7009...` |
| 465 | URL_SCAN | NetWire URL Scan | `https://curl.se` | `0x146cb53ad877db88720dbd90ded3f4c56b393b881b690982fca0a9a06a777708` | `0x8a66139dd2f22715...` |
| 466 | URL_SCAN | URL Sentinel | `https://curl.se` | `0xd67bb4aaf00b12ce8ce18cb36decb6c5402af719beb95beb0929de104dcbdbc8` | `0x13b7c9183f704f16...` |
| 467 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://curl.se` | `0x3a7ed130f81b84e46dc1065d175e06c4d812285ff70e2cada7dce39da5e1db26` | `0x493194a318921182...` |
| 468 | URL_SCAN | NetWire URL Scan | `https://videolan.org` | `0x3a1b604f8455dc265f7484d435eeb306ccd344fad58b6438b3bf6d38d50115f2` | `0x57b87c046a2d301d...` |
| 469 | URL_SCAN | URL Sentinel | `https://openssh.com` | `0x58ba68d3238b654a9000b2206f5ef8dadded72633e93b8fc828f7e352da7db12` | `0x70ca248ad70b8f60...` |
| 470 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://openssh.com` | `0x013c0563553ccf4f798aa43d4aa07c6a627e7da5f0910671649d6d299afeebec` | `0x930d8f63707e8aa9...` |
| 471 | URL_SCAN | NetWire URL Scan | `https://haproxy.org` | `0x4553b76a0db6c59ca8a59f1e1ce7cce015ad9dba7b6d8ccd1b2ba1058b8ff80e` | `0x01ce040d2a18341b...` |
| 472 | URL_SCAN | URL Sentinel | `https://haproxy.org` | `0x578d2a6a862183e5f945da41d7e0c653cebca841c3774d0b2662403094178bd8` | `0x6824f280f91e1ceb...` |
| 473 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://haproxy.org` | `0x0483ce400b4d105602647549aea3a1f5745df7bb01568787d8edfcc6426d55bc` | `0x91a0774b57c18e05...` |
| 474 | URL_SCAN | NetWire URL Scan | `https://varnish-cache.org` | `0x39e968c9db2ba83646aaaa0138d6032d661fc96bfb4ae88a1682b0e088b10798` | `0x7707a8fbcf7b7e23...` |
| 475 | URL_SCAN | NetWire URL Scan | `https://openssh.com` | `0x5367bca94af202946c786a7aa61e0c2f84dc4c83c944afbc4aa635117f07d677` | `0x734b755bdbd38f9b...` |
| 476 | URL_SCAN | URL Sentinel | `https://varnish-cache.org` | `0x9f1836c94a50844ad0c8d9dc33f3c29c6f1aaae5ba96024a1654d29b2c5bf3a3` | `0x245904f2ae11da80...` |
| 477 | URL_SCAN | NetWire URL Scan | `https://rabbitmq.com` | `0x0b88a491d3665ad1452b521371de59d23b98476d4e261055c9f96810af5cbf95` | `0xa6c1e82e54ca7291...` |
| 478 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://varnish-cache.org` | `0x256f06d6321bbc256103f92526032cbb73a20191ebdfd6cd19a2f98a6258c5a1` | `0xcc1b26a37399dc4e...` |
| 479 | URL_SCAN | URL Sentinel | `https://rabbitmq.com` | `0xf8722783979d79d3eaba70bd34f5928b2034350124cb829ef9a98dcc99392db9` | `0x3a6bda9f2252cb33...` |
| 480 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://rabbitmq.com` | `0xf87fcd69eb7f5ff8cf840db5bb4e24caa21ef2902428c35eb8043b22b7ce6703` | `0x3cb775fb4159ae10...` |
| 481 | URL_SCAN | URL Sentinel | `https://kafka.apache.org` | `0x5a3a35145d790dad50f5d5c1e3744999d156162d19563f94dcfdd1cf6f2d7f38` | `0x262bff130388b7a5...` |
| 482 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://kafka.apache.org` | `0xf705dda48130eaf05a73bb8a58df8900ce1a6a645030072677167861908623e2` | `0x0b45d4e18167e6af...` |
| 483 | URL_SCAN | URL Sentinel | `https://cassandra.apache.org` | `0xfccae4f23fa66422892b7604ab3539f79b7ddaa4371581901fbc1b55a3c4b573` | `0x04a01f45367abe9f...` |
| 484 | URL_SCAN | NetWire URL Scan | `https://kafka.apache.org` | `0x83717f252bea99f8535402c243cb7dd4b465d4e1317f55fdfa83cae378c60feb` | `0x5975e8788856aca6...` |
| 485 | URL_SCAN | NetWire URL Scan | `https://cassandra.apache.org` | `0xf7cbe000ecc3df9b582fce12c357e714812d071bca738beda172cb8a38482689` | `0xb2fb621def86a641...` |
| 486 | URL_SCAN | URL Sentinel | `https://spark.apache.org` | `0x0ac9c6c945472056e19408dc70211f562a3313a39db334e88f33a28afbbc1810` | `0xabf35e77f3213387...` |
| 487 | URL_SCAN | NetWire URL Scan | `https://spark.apache.org` | `0x9ea07f271fa2b77a85562990cc344400a2536c9236ec7560b9dda34d6a180899` | `0xa56a1c19c59b3136...` |
| 488 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://cassandra.apache.org` | `0xe49311a65e1fdd1aa3d5ea7847a6a9fe11dc7eedd3125566126beae94ebd0a17` | `0x006eb61f66408e74...` |
| 489 | URL_SCAN | NetWire URL Scan | `https://hadoop.apache.org` | `0xbc9becfce3c16ca28390953d6bcdd3797d9c3128ff55f5b8960d29cf92165dbc` | `0xfdb1b9da961d25b0...` |
| 490 | URL_SCAN | URL Sentinel | `https://hadoop.apache.org` | `0x22f764f29286200d82b7423e352650ace83ee59abbbfb3763fbddb634d9a4b57` | `0x4d4c57b53e1e736e...` |
| 491 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://hadoop.apache.org` | `0x16b9c7e6b166ceb0dce6e26a0044376bdf21f7f8cc2a6ce693a1cf419c312626` | `0x281070074c76fd39...` |
| 492 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://spark.apache.org` | `0x9745ce8e070c4c759effb35f7779594027efa0425bf17216662021cbd1be1b17` | `0x35f04cbe94ff6eb3...` |
| 493 | URL_SCAN | NetWire URL Scan | `https://airflow.apache.org` | `0x3854dc48c5226aa74d2648ed1ac698711b0a296a84d43ca84fdf7cdae6573ce7` | `0xee567c454307310e...` |
| 494 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://airflow.apache.org` | `0xa9bb151d99455161cf4d4bcbfc1083d037365427bd90ceb3a9a6620059951ff4` | `0x483b7ae0b9552642...` |
| 495 | URL_SCAN | NetWire URL Scan | `https://gradle.org` | `0xb457582bc2a894c3a0c90b1a5c9552b53a15f5767bfaa50b2c772ce71912f2c3` | `0x1d4ee705b308ea2f...` |
| 496 | URL_SCAN | URL Sentinel | `https://gradle.org` | `0x40bc972dd513bc3843abb30ec14e60b0aa132815925cb6dc3b316eb12cfa193c` | `0xb6e1032abbf1acf1...` |
| 497 | URL_SCAN | URL Sentinel | `https://airflow.apache.org` | `0x1cec943d9f2c16d5090684c25a192402b4b5c1adcc9f3ebb251985ed14075fba` | `0x598d9928120ca568...` |
| 498 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://gradle.org` | `0xf3dd3164355d59536164b29e4d8c87dba1bb32c76939b9074d05ba89f1fc5be5` | `0xfc10b801e7a150de...` |
| 499 | URL_SCAN | NetWire URL Scan | `https://maven.apache.org` | `0x9b1c7c50632fc74ce0423e2337fabf7fa01b723e757fb2f072122b47c001b3ea` | `0x1ba9864dbee26cf9...` |
| 500 | URL_SCAN | URL Sentinel | `https://maven.apache.org` | `0x4d789e3826d24f0cc8701019eb150bbd89c259e13500ceb7b820e40efc163557` | `0x3cfa0971a745dc54...` |
| 501 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://maven.apache.org` | `0x50cb9a85e5e63922c79d26b3300f4cb44470e7e99be9981705ab1f998cc2aa45` | `0xe1475cdb8f0c966b...` |
| 502 | URL_SCAN | NetWire URL Scan | `https://scala-lang.org` | `0x808b27f43a3e221160c977af49efb340192f7c666bf5faac168f278b1effeaef` | `0xb9913c74dee7686a...` |
| 503 | URL_SCAN | URL Sentinel | `https://scala-lang.org` | `0x13b747c03ff06533a056ed43630a87255786656b039ef619172ccdb06c8706ef` | `0xd7be0587745525af...` |
| 504 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://scala-lang.org` | `0xfbc3ff85d374026d1d3d65a93304237dded9300c670aa983dc76d5187eefcc44` | `0x4b6de4402e14e91f...` |
| 505 | URL_SCAN | NetWire URL Scan | `https://swift.org` | `0xfb2cccc4aa0b388615283ee474a6dc3d1f67477e523abbcff633bcf962144e89` | `0xe2eac5d1e644d700...` |
| 506 | URL_SCAN | URL Sentinel | `https://kotlinlang.org` | `0xc40c5853ec0691006344591e7d1282cb5bbaeceb82cf532df27fa55d18d33d37` | `0x065c8787da1d62f7...` |
| 507 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://swift.org` | `0x515aa931f43c7973b5f74826223d1476d7b6ed50bc873ef8fd59ba8cc24b41b9` | `0x71da5d2deb8b0163...` |
| 508 | URL_SCAN | NetWire URL Scan | `https://kotlinlang.org` | `0xc7098b790a7a97cbdf5e9fb1f6964f1a50904e07f974344fbcddcb1066589d3a` | `0x860c2b1110ac1e2a...` |
| 509 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://kotlinlang.org` | `0x4fe749b55d7369e10453e983b3df9391586f66d35b309d22828834494a1b0366` | `0x692925532e61b995...` |
| 510 | URL_SCAN | NetWire URL Scan | `https://ruby-lang.org` | `0x138d42b220b6fa7f690167f73f5d8ebe95fc9a36183bc0509b00b9e814b720cf` | `0x900e0c0c3231deb4...` |
| 511 | URL_SCAN | URL Sentinel | `https://ruby-lang.org` | `0x7a120d34f59c0718fed60e12f9ce51676467ce49f34cd505c0a62572be41f255` | `0xd2ac816f3a23ecc9...` |
| 512 | URL_SCAN | URL Sentinel | `https://swift.org` | `0xca1291502a5705f9174d696e664db1b75944dd7936f7923781d7450917e595a5` | `0xc63eb0a996cde10e...` |
| 513 | URL_SCAN | URL Sentinel | `https://php.net` | `0xa0e996397435302dd18d440bd037db689ad12cad3e6c7cf34e12fb258096ac45` | `0x7898a0ca65f48fb8...` |
| 514 | URL_SCAN | NetWire URL Scan | `https://php.net` | `0xfd56bff456b7ad3f0af44914df145732f193e8b749d881b6842dcf9552b25549` | `0x080210a5a14eaad6...` |
| 515 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://php.net` | `0xffad7a265add7d6ff37b4cadfd9d6c9890670aa58cba95711494decd54a4cc63` | `0x1562549a2e9af0ed...` |
| 516 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ruby-lang.org` | `0xc842c11cdb38b51588706efbfe10ed5cf99676a342a7f5f6fdb38eb9ebc8d206` | `0xc7a9edbbe0719860...` |
| 517 | URL_SCAN | NetWire URL Scan | `https://perl.org` | `0xc16324e4df55d3c2b3ce9c3d37e4b695cfa57b0d0f38cbec1e9658d2d6bb5397` | `0x16b1017925aa3be1...` |
| 518 | URL_SCAN | URL Sentinel | `https://perl.org` | `0xb9c7531e03c4e1630808f025aa1929e4923bb3836b72cd7e6e2cc1dcbb70dcfb` | `0xeb0234ced3187e8d...` |
| 519 | URL_SCAN | NetWire URL Scan | `https://haskell.org` | `0x50f437ddb463160eb7eeabf8ed57a9280fac320ad3522f33afe1c116afad7cff` | `0x99caf8db5e4288e5...` |
| 520 | URL_SCAN | URL Sentinel | `https://haskell.org` | `0x9d28c0758712555b6f95ba0e0662de8bdf33d13950e9270bb6194352c9ffe6b2` | `0xd70a9af6d0441955...` |
| 521 | URL_SCAN | NetWire URL Scan | `https://elixir-lang.org` | `0x9ee995eb6ac7276608bfe1af2737259242a173ae63efa53bb29a40a6a9cee6d1` | `0x025322f56dbfb1de...` |
| 522 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://perl.org` | `0xf02771ba163efd49e2c25b70b4f4d132b2defa0cbcce2e19cb41e679a3b85d2b` | `0xfee6862b24607bc6...` |
| 523 | URL_SCAN | URL Sentinel | `https://elixir-lang.org` | `0x36d4c44acc6f7ae558988bceff7abdb6300455cf63a84fd8e362c0d0a3eb33f4` | `0x2cf9e97b2bbc6257...` |
| 524 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://haskell.org` | `0x0fdb8be05a22bb728925518233f4f4c3f7f0c248ad03ce59878360684b608263` | `0xd6fd1fc422bfdb14...` |
| 525 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://elixir-lang.org` | `0x7d7e01b2e26cf319c5a7d4a5bfc06a820fa77473394816f27aca6e0055261129` | `0xe841bbf998f77a53...` |
| 526 | URL_SCAN | NetWire URL Scan | `https://erlang.org` | `0x2f28a513cdf2b11487793d266bdabbee0facba25ef61f4b7a417d8ae295923a6` | `0xc1b3ce100e702f86...` |
| 527 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://erlang.org` | `0x76b8d0f2e6dbf162f11e8308fcb530da34be87e24544bdc785a49735379eefc4` | `0xef3f859be89726a2...` |
| 528 | URL_SCAN | URL Sentinel | `https://clojure.org` | `0x2908c5b5fbae310f70e6fe674935737e0bb1e9db85c16a26fed8aa251fe9540b` | `0xbdff41788b248fdf...` |
| 529 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://clojure.org` | `0xf9e2c57d4a6b009b9ff29a09bdacc73b2e592f9de3b5429ee17c47474e2c9630` | `0xefb6cb113ac860e6...` |
| 530 | URL_SCAN | URL Sentinel | `https://erlang.org` | `0xbfcfddca383857ccf9dc8bbab47cf755e46904c7735c0cdba2e9790c4f3c865a` | `0xa406ce9af3bd2a8e...` |
| 531 | URL_SCAN | NetWire URL Scan | `https://clojure.org` | `0xd60026694c9a91b020986b2f665a239936c8169bc6db9ef190e0d6e5c5db100c` | `0x24b3333d155776c7...` |
| 532 | URL_SCAN | NetWire URL Scan | `https://julialang.org` | `0xeec9523ed4d754210fd9aaba3aab00a0f727f18d890334cda16fc91ab22d6f03` | `0xfb6a6fe8bc94df56...` |
| 533 | URL_SCAN | URL Sentinel | `https://julialang.org` | `0xe6a6abaa713eb2b875436c48508f98eb0e36d9097d17f754aa06dc60f3b58fcf` | `0xb22b6f38483f8733...` |
| 534 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://julialang.org` | `0xa641b63387a7c44dbdc697d6f3e9dfe4085a4b3941676b9092da19db25156fa8` | `0xfd801a3bdcdeeee9...` |
| 535 | URL_SCAN | NetWire URL Scan | `https://r-project.org` | `0xd95e26011ffe9694384465b2ddd869d4f3110700596ac408e6d63e9e0a4b5266` | `0x1bf0e8c266606dc9...` |
| 536 | URL_SCAN | NetWire URL Scan | `https://tensorflow.org` | `0xc55ec60ccb42b7824ffa5d20432e9e8e76073557251f97c2c4c5b190484f19e7` | `0xbe3d4231ddbe66e6...` |
| 537 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://r-project.org` | `0x5fb3586c1f41fd14e0ea3e3d4104807fa9a65c1b0c0848c45ddcd2f626df8705` | `0xe11043713bc23b3b...` |
| 538 | URL_SCAN | NetWire URL Scan | `https://pytorch.org` | `0x7d550c3cb11e0a3e3a1534c440128ec701519f6a095b302c93e145dfa5fc6ad6` | `0x023ab7156deaea2b...` |
| 539 | URL_SCAN | URL Sentinel | `https://r-project.org` | `0x625a9d4dc7dd15db573233455b89ab3e8dd2087a21b0dc66fb6d93f2c2eebaa3` | `0x741eedb9df118031...` |
| 540 | URL_SCAN | URL Sentinel | `https://pytorch.org` | `0x98d962596f6927a9a80395fad43da6c60ed9bad594d213d63b3e99fd5df3ec5f` | `0x07079aab14ace83b...` |
| 541 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://pytorch.org` | `0x837a57c8cbe0e2a55e21056814c36b485fe9816e6b985d996e7d2c8c12f71e85` | `0x31856dc661cfe91d...` |
| 542 | URL_SCAN | NetWire URL Scan | `https://scikit-learn.org` | `0x81b92492dfd870ee79908f87cb9c8e31faf010142ef67fd556ef28569e9632d0` | `0xbe0ebd59f8b6b094...` |
| 543 | URL_SCAN | URL Sentinel | `https://scikit-learn.org` | `0xf03366ff150fe4f5ba7dd1709042517b207789637ccbb1b28a05a018905c301d` | `0x1407475956a5b57c...` |
| 544 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://scikit-learn.org` | `0xede4a63ee1b6df8121fd5df77ce987799198ba10c376c922366d369180746b14` | `0xdb6ec8b55d01d333...` |
| 545 | URL_SCAN | URL Sentinel | `https://tensorflow.org` | `0xa0ac5c98c64ed81c257b7c11753ee7dd3f37070c72a375790ff615b7ca797549` | `0x58c5732f475d1774...` |
| 546 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://tensorflow.org` | `0xf17d6ae612e2c4416045e4dc44b913c3795ba074aa8b7880ab286ded6331449d` | `0xf79823dbbf51dfae...` |
| 547 | URL_SCAN | NetWire URL Scan | `https://numpy.org` | `0x1f1622267fa86ac951be3cfeca922a1866b0a9af69ea7b61eec141b9a22f66e5` | `0xb274a6a4685caed1...` |
| 548 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://numpy.org` | `0x9e8a8a9cc005a0d61a47142138216c105d85465057c89150603b53b83cc2f5d1` | `0xd03948ee66fefc02...` |
| 549 | URL_SCAN | NetWire URL Scan | `https://pandas.pydata.org` | `0xe1b9b735782f055257f3c88fb78899774f6bbd5feeb57f600378ce59fad41649` | `0xfdb8a827ff64b27c...` |
| 550 | URL_SCAN | URL Sentinel | `https://pandas.pydata.org` | `0xc44fc792051bfad4dfc6f35a7ec88a63b92ffe2b0f4f7775cc14c2e8b3733ad4` | `0xa29b5c491d966d1d...` |
| 551 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://pandas.pydata.org` | `0x8ebdd8cfc15552ccc23bbbbb936c6e51f6ddb16e0e64e78c2b48d610ad5fdc1b` | `0xa18d5a846dc24e6c...` |
| 552 | URL_SCAN | URL Sentinel | `https://numpy.org` | `0xcda45e171bb5f3b5542f536d59d977cb1e3e5c54a5ab65ab8a04ba5b8120b225` | `0xff756db714800b55...` |
| 553 | URL_SCAN | NetWire URL Scan | `https://jupyter.org` | `0x2d028c689d0cadb2ba0aa1a49cf0aba6fb64d52ebed21bdb5c77964e893e4333` | `0x55097e0be0b901a3...` |
| 554 | URL_SCAN | URL Sentinel | `https://jupyter.org` | `0x7a8ec514fa8cd3449a57707646aeb3ea93b727f4d9408285b59a5e24b4100189` | `0x8b855070ba734b1a...` |
| 555 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://jupyter.org` | `0x7c5552caeed65f74d76ca2880562f5d8a1f42b0b75259059d7769be207df0541` | `0x03723a535df4bd16...` |
| 556 | URL_SCAN | NetWire URL Scan | `https://anaconda.com` | `0x0adc771951c41d1da017ed658c7031c21f5b37d952d31bd38a89cf62d4ed5513` | `0xa3e554860aba5d3b...` |
| 557 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://anaconda.com` | `0x2dad2608f195709147f3acada57dcccc74ce425dba54a25246ff877851f62f8e` | `0xe0b920bb73ae0451...` |
| 558 | URL_SCAN | NetWire URL Scan | `https://huggingface.co` | `0x43412b01912580464bf27f2368b57d2066a17beb6fe980419c9bc31bd9ef1739` | `0x014e4b0a0f631b86...` |
| 559 | URL_SCAN | URL Sentinel | `https://huggingface.co` | `0xd887e2b0625a078573f89536d9074633cf14de459eccd0f24803da0b93ed2043` | `0x92e492394e20f1a7...` |
| 560 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://huggingface.co` | `0xc87c545e7a8decc441b93081037d50a1ac75ee1142e36f33ae5a9a95315c3d71` | `0x4f3344fce5df36ff...` |
| 561 | URL_SCAN | URL Sentinel | `https://anaconda.com` | `0xcb4749334a999d56726f2ae8c2ce41ae64425f0ebc38c14af926f08bb1528ed1` | `0x3b1a38d3a8c8191a...` |
| 562 | URL_SCAN | NetWire URL Scan | `https://openai.com` | `0x6c8653008c01a013955d75c036750b9ddb54466701ed64d1a17cbdca0a986ecc` | `0xda26de3d9ae25b7f...` |
| 563 | URL_SCAN | URL Sentinel | `https://openai.com` | `0x733dc1f2788d2cf2c07cc41ade335cffc6171fe014d9c81ccfec3eb9abe4f718` | `0x24aca201c3336922...` |
| 564 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://openai.com` | `0xa346bb7a590afd302bc57977ad41ac113d7479d217fa6a5598fda446847a4aaf` | `0x9c356bedb1a5aa7a...` |
| 565 | URL_SCAN | NetWire URL Scan | `https://anthropic.com` | `0x5c631b0a05a994753d1e04909a464098963e343eeaeb5cb4e7014ec9784d5116` | `0xd32fe227ff7bbc7e...` |
| 566 | URL_SCAN | URL Sentinel | `https://anthropic.com` | `0x4414067ce0855050a32bd00cef09d652a35e15f33ebe256bb1e176df2b55e242` | `0x0733d1725b8f643d...` |
| 567 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://anthropic.com` | `0x15ccfffcc0f765ddfb51b80df2a2d959e5b678cf7fc2fa06a471d25c3200da1b` | `0xcd0cd6afa2ae3777...` |
| 568 | URL_SCAN | NetWire URL Scan | `https://deepmind.com` | `0x9444186b3c236153e225ea722c1ea07ff86fa27af44c260ea67b2a35abab6678` | `0x3cfa8cfd3cda2ee7...` |
| 569 | URL_SCAN | URL Sentinel | `https://deepmind.com` | `0x014bb7ab6140f498dcf9e1f52400f9831be781f059c6c51b64b69e13de6e43ac` | `0x40366f6d3a0cc9cf...` |
| 570 | URL_SCAN | NetWire URL Scan | `https://mit.edu` | `0x0fae82d3d4f2e78931fddea34d842bfe70d380b2f31c14b8fc218dab78b926fb` | `0xad010f67324fdde5...` |
| 571 | URL_SCAN | URL Sentinel | `https://mit.edu` | `0x2ef29fc4c0cbe3e4c3cb45916cde61de59be441483972f77d11298c69c84b034` | `0x35c68da19fc7184a...` |
| 572 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://mit.edu` | `0x74462212aaf81b7b240629acae427421e5d91ff55b8eba0c3d9f5de6ecc40f51` | `0xd4ef025cc56878bb...` |
| 573 | URL_SCAN | NetWire URL Scan | `https://stanford.edu` | `0xd6aa554a49be946f1e6690df43b3c057158de4dec95f81e42b97fbd722f4d439` | `0xbbb09a662d5b5b20...` |
| 574 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://deepmind.com` | `0x1da876e7fcd9f8041c56c3d56be7c628acbb1f7fc2089098e1ddafe0b4326547` | `0xda6280b686e0a614...` |
| 575 | URL_SCAN | URL Sentinel | `https://stanford.edu` | `0xff90d31ae0102e17480bac01f5f5f503a9321039051256b3fad9f9533475964c` | `0xc8488744abbc0556...` |
| 576 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://stanford.edu` | `0xaea449dfa998ebff676b90290a35e989c3142631c5d60870557123e51a0e36e0` | `0x3cbf4b4def7008e6...` |
| 577 | URL_SCAN | NetWire URL Scan | `https://harvard.edu` | `0xedb454cd4192b4735c28dfc2e50f2d950fefb719c70259ef8c153a60266a94cd` | `0xc27be13f09b447a0...` |
| 578 | URL_SCAN | URL Sentinel | `https://harvard.edu` | `0x5caf6e667eb95888fde3b7dafbf0af5e7ee444cbdfe8e99d37335f8f055d05f4` | `0x35661a0b8f69f024...` |
| 579 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://harvard.edu` | `0xa88eff7cfa4e542a9d8c4e2abd49729eff7f02404594e26aee55249ac14ac41d` | `0xa2f76ed374a648c4...` |
| 580 | URL_SCAN | URL Sentinel | `https://ox.ac.uk` | `0xe8d0326a92fb1631ad2e2e63d3439bbe831e4cd21d7695c85295026e8df8cacb` | `0x6d8f999ac4464ce9...` |
| 581 | URL_SCAN | NetWire URL Scan | `https://ox.ac.uk` | `0xbeb3a8c3729d46f6259245a39b45beea05490129998dd5cf10bc7ead630460f5` | `0x521027e83b8e2936...` |
| 582 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ox.ac.uk` | `0xcbac5befe228c6f277831555625f9f6f7e473b75fa9daec5eff27410957fb3db` | `0xf516b305a1d0e1f7...` |
| 583 | URL_SCAN | NetWire URL Scan | `https://cam.ac.uk` | `0xdf6df334756d674eed9051fd6295a83c729d597aecba417951217079c874222d` | `0x91d0a4f21fa9b915...` |
| 584 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://cam.ac.uk` | `0x0dee6f305511bd7bae68600408916f9b772551f77fdb6a05a6ff69eb5e609671` | `0x14f5893bed628792...` |
| 585 | URL_SCAN | URL Sentinel | `https://cam.ac.uk` | `0x73f7035dd87a6a80972a3e68fd52d9f11ce93638a4579faab6748d50c82f90f1` | `0x05b665f13f02f4a9...` |
| 586 | URL_SCAN | NetWire URL Scan | `https://ethz.ch` | `0xf2284a74a3435f203b9888a2f18c079080230c052216ecad9014edd7d58ad133` | `0x3813447f9ab1ec90...` |
| 587 | CRYPTO_PRICE | TxLens | `tether` | `0xc06214e255cbce1c0b1467764871628c7ff381170ad5f157a4ac3c42996744a3` | `0xbd07bc918f8ebfce...` |
| 588 | CRYPTO_PRICE | TxLens | `binancecoin` | `0x742b61652cbee5f58c571f2f1f7f8dc5245237e9086c1475bd9d859eaa4ed951` | `0x333e85a8d6b8d9b7...` |
| 589 | CRYPTO_PRICE | TxLens | `ripple` | `0x6bf27803d979d1d888f56d248d2c6892e1efb0dfcc3e2f2df1efe924711287ef` | `0xa5f14fc04013f823...` |
| 590 | URL_SCAN | URL Sentinel | `https://ethz.ch` | `0x05937d72dd7686ee0c273864f9516b3f9103bafb0c4265c25983e31b523ab425` | `0x0181fafcb24c719a...` |
| 591 | URL_SCAN | PREFLIGHT Infrastructure Signals | `https://ethz.ch` | `0x2510e037cdc620b132ea43d0e9af8cbafa3205a723a398f5530dc12ac5a9fb59` | `0x43e8ca777bebc30e...` |
| 592 | CRYPTO_PRICE | TxLens | `tron` | `0x8c0ef2e63b7f473b9452f82ddb584d25d119f1404ffa1be8f373e43ac54c7438` | `0x1c2089df9723985b...` |
| 593 | CRYPTO_PRICE | TxLens | `toncoin` | `0x741c042cca16b13a9ae56824b33320d2c69d0fafb0b78ae059f1fd6a26b549fd` | `0x06404cb3df54603c...` |
| 594 | CRYPTO_PRICE | TxLens | `theta-token` | `0x1f7b6218961f88b346be658622ce652c20beb21f875b4186e08299cbc6233bb3` | `0xbcfea1ed6911b1ff...` |
| 595 | CRYPTO_PRICE | TxLens | `vechain` | `0xaefc0b9aa2dc4bdd7407985b3a8a3b75a225d4d8f1fc90aee21754d7bdbc528d` | `0xe1867387baaa4662...` |
| 596 | CRYPTO_PRICE | TxLens | `hedera-hashgraph` | `0xfc6082e7f86ee67fc9bbd458d11afa2adb66a2e657e35fa351a71a40ade7a050` | `0x648e73b4f8f0eaeb...` |
| 597 | CRYPTO_PRICE | TxLens | `elrond-erd-2` | `0x15f0f8f93789a1d8062537ee26961c185a93bc4dffd247600571265e82f04483` | `0xfd97636a68e20971...` |
| 598 | CRYPTO_PRICE | TxLens | `flow` | `0x6a236b1b03b8a9cdc802eae5e0a26a08ad35c60d92e3462bcb062a0d9df0ab35` | `0xb59b5e3b46286e3f...` |
| 599 | CRYPTO_PRICE | TxLens | `kava` | `0xc79918b3a236a65a5cb58fd0a3e5b83f786b038e539d8dca200bf96c5e01c19b` | `0x7712119809662a6f...` |
| 600 | CRYPTO_PRICE | TxLens | `zilliqa` | `0xfec3f917951248abfe214a6c3457c17baa1f60bd6507455ff5d4e2fdb24a7081` | `0x5eccae4e232c4f00...` |
| 601 | CRYPTO_PRICE | TxLens | `decentraland` | `0xee05affceb50d3be3dc75250e51aad7ff61b4f725cfd105e22941885807b7421` | `0x7ddedd5743fd9623...` |
| 602 | CRYPTO_PRICE | TxLens | `axie-infinity` | `0x7a4c5bbbb453d542a9a0e2a1d14c119145630c61f28f2fd1209e7840d2030611` | `0xa922edc267346dc9...` |
| 603 | CRYPTO_PRICE | TxLens | `chiliz` | `0xff3e6dac8a0e4bb7315d6f7f5cb53bdb14da3ac22d370e1082a78f4e28bc41fb` | `0xdf91b4da9fa86024...` |
| 604 | CRYPTO_PRICE | TxLens | `enjincoin` | `0x7e30ada021ffc3c74e21a131b81f4fb70c928c6f264c929d2e564f385a2af3e4` | `0x6092b395e783a84e...` |
| 605 | CRYPTO_PRICE | TxLens | `the-sandbox` | `0x3e4ae773d55715de46d5df4dd8b0b4165ec09ea604ffbf534fb601365f5df1d8` | `0xcd1c5f92c0fafdbb...` |
| 606 | STOCK_PRICE | TxLens | `JPM` | `0x3419080cb4a5e0adca74f40fede69bb1c697d8887f128d7c536d009c4d70eb88` | `0x5dbcd91c4b2e37de...` |
| 607 | STOCK_PRICE | TxLens | `BAC` | `0xadfa7abb8b2754b4527c641f0be5f35cb511f04de89593da770e93ee36fb8ca3` | `0x13e4bd5f4f1ded58...` |
| 608 | STOCK_PRICE | TxLens | `WFC` | `0xcc3ed4c8072020df22c3c5b72d4e15536dbb8df00491158cc17c99e805093f54` | `0x206874c55750c965...` |
| 609 | STOCK_PRICE | TxLens | `MS` | `0x738c2f74560fe4e7e11e22317bca7103eb5c3c0605ce7a2aabeff1be5787905c` | `0x0df68bb580f355fc...` |
| 610 | STOCK_PRICE | TxLens | `GS` | `0xe0552aeed948777fec2d904f066c6eac8e54903166290927575a1c454d134d54` | `0x783549b33b8c379e...` |
| 611 | STOCK_PRICE | TxLens | `V` | `0xbbd93f4dda59f1cc0ecd87db98b04e23f2134bd2d9fa01fdc4738d76f83fc985` | `0x13fd6e9773b10aa5...` |
| 612 | STOCK_PRICE | TxLens | `MA` | `0xff8ef011b8793475e958261f6ac0356bf14cf26857bf46680ed15c06c793053b` | `0x51b579be09a92576...` |
| 613 | STOCK_PRICE | TxLens | `AXP` | `0xba3ad0e799ae785a7c0bce8079b99f07e32878b9d2c7f712d4abb05ef91da2ee` | `0x6e039285b99f2292...` |
| 614 | STOCK_PRICE | TxLens | `MRK` | `0x2e8bc2e2df92060060e064bb41277fecdb50ff4ca294a72f31cd41952b18f623` | `0xedee714b6d2ee341...` |
| 615 | STOCK_PRICE | TxLens | `ABBV` | `0x8d18cf4d507a54e42d02f026b94f4e857b699f4b9c2db4b495bab484c05c449b` | `0x444180a9746a7097...` |
| 616 | STOCK_PRICE | TxLens | `PFE` | `0xd02cf90a78ee1381ff6bddef4de358f8d5d4635447b233e490079cfb522b1418` | `0x2259c585e1f2a836...` |
| 617 | STOCK_PRICE | TxLens | `UNH` | `0x6049c02e3b9c93e94abde1b5f594e16774fdccca28a8ea7e0afcd2bd04242dc3` | `0x920df6231c4e1196...` |
| 618 | STOCK_PRICE | TxLens | `LLY` | `0x906817efeff0187f9855f60851c146dc0ff7bfc9f65eabd59b8eca5064d40d07` | `0x3500a2d65e31153e...` |
| 619 | STOCK_PRICE | TxLens | `CVS` | `0x74b78e3fae420d47b2fe97c054530e564a757781735b2a515e02c91a87228e14` | `0x73a288024916b8a7...` |
| 620 | STOCK_PRICE | TxLens | `XOM` | `0xab9f5796b0827de57065309bdfee0c6a850113b9d383783e27b93de959649eb3` | `0x6628196ab6f04d46...` |
| 621 | STOCK_PRICE | TxLens | `CVX` | `0xfa4fb6bb7c3e32f376d1b19720cd4db745c62288d6767c9664f6dc80e1d3287e` | `0xa5357c44f4c4eba2...` |
| 622 | STOCK_PRICE | TxLens | `BP` | `0x6da09521c58349eb995e32165c6f492323a61e673d226658cfe10debc4db154c` | `0xe2302b7a312677d9...` |
| 623 | SSL_VERIFICATION | TxLens | `gnu.org` | `0x6625147728f826442bc52c0344d865cc5cb7502e981bd050e486abf093a8b1db` | `0x0f45212f395f80e1...` |
| 624 | SSL_VERIFICATION | TxLens | `curl.se` | `0x91fc70f4de54a6230dc98994f296fb9f90d61315eafe1caec612fa02888c3f20` | `0x756b23727d4e37cd...` |
| 625 | SSL_VERIFICATION | TxLens | `kernel.org` | `0xab497d65899976fd732b5a60e9d98592a9fec0fa8e3ed99405c6fa3e6e362530` | `0xbecaf33648483fa8...` |
| 626 | SSL_VERIFICATION | TxLens | `openssh.com` | `0x727d95301107edb2ba227c682613df62cb529150f1431f4cd1879b456ecea7d3` | `0xf5c1fc3c0ab729db...` |
| 627 | SSL_VERIFICATION | TxLens | `redhat.com` | `0x9f2bb288f94123319249ac9f179520e2b29290e3ab791d2cc5025c73ccc3f7c9` | `0x2fcbdcb3488c330e...` |
| 628 | SSL_VERIFICATION | TxLens | `suse.com` | `0xed8b22b5642699e7b4e8409c729ab8fe16163f0bc570c1ef658c27cb75c38588` | `0xf873e9bf4c965595...` |
| 629 | SSL_VERIFICATION | TxLens | `ubuntu.com` | `0x568297bb446639c8f1dd584e8708876c0d5dc80eecac657948c25a7a25ed3358` | `0xacf65cbeedbc5c32...` |
| 630 | SSL_VERIFICATION | TxLens | `debian.org` | `0x8491b14308fe7a43fb85fae2fb31de4fb30870046ad33e4d6bcf0fb112084a13` | `0x2615f60da207e80c...` |
| 631 | SSL_VERIFICATION | TxLens | `archlinux.org` | `0xd1772331f9da05f8dd64f4d332ce73a17addca7006215c1692377b1f65df787b` | `0x745b4181a3314516...` |
| 632 | SSL_VERIFICATION | TxLens | `gentoo.org` | `0x93e7ff6a165bd56305610661328d2c5af61458e4625e81ab1aeac4c5e246fd4b` | `0xc3b77c0d9170b653...` |
| 633 | SSL_VERIFICATION | TxLens | `tensorflow.org` | `0x1e3e897d4e5a97a27590ee2b022b0b50f4a2467f847492cd9bdc39a8df98f547` | `0xe2ddce55ef09e735...` |
| 634 | SSL_VERIFICATION | TxLens | `huggingface.co` | `0xe59aeba3fae5095277068ba3abb9b8f779bdd877b53639f6ae7432ad7b59e424` | `0xddcc6ed779920ec9...` |
| 635 | SSL_VERIFICATION | TxLens | `mit.edu` | `0xc1d6498829dd9ea31ef6d199e0b8f6395c449a1502f33f0132be499e809bfdcd` | `0xe4f8fd1f772ee8ad...` |
| 636 | SSL_VERIFICATION | TxLens | `pytorch.org` | `0x7999374ee64d01158d684363e6f0f19f8999b245a3acbfac270a31be8531d933` | `0xd772ecc4818735cd...` |
| 637 | SSL_VERIFICATION | TxLens | `stanford.edu` | `0xce17156786371fd0de363b23056a74405ebc22367428db423f249dee61ef3ee9` | `0xb41bcbf9f25b6180...` |
| 638 | WEATHER_FORECAST | TxLens | `Abuja, Nigeria` | `0x2358b3604653895accf8a02f24406519100aeb01e1f94545e6e6bbb1e63d6034` | `0xbc4de05ed37ff363...` |
| 639 | WEATHER_FORECAST | TxLens | `Kampala, Uganda` | `0xc77eabfd268960b7f5655ad233db789483b55f9b3fc22adc30a299cefe732386` | `0x8819e7d600cc5114...` |
| 640 | WEATHER_FORECAST | TxLens | `Dakar, Senegal` | `0x4473bfc571555aebb1101bb98e431309e0ba382b8ad52f07d2e7cb641c0dfb1d` | `0x971bddd14db6ad06...` |
| 641 | WEATHER_FORECAST | TxLens | `Accra, Ghana` | `0x28b3844f0f361bdbfcc2bf57f2828a9cc1daaa3c9f4d65817e7395520500de48` | `0x59170192271c875e...` |
| 642 | WEATHER_FORECAST | TxLens | `Addis Ababa, Ethiopia` | `0x9176bf76d2c7e15046c4811e93a677970bb1b856126b324b003a644182850c9e` | `0x30628e60a09feb91...` |
| 643 | WEATHER_FORECAST | TxLens | `Dar es Salaam, Tanzania` | `0xe16ac8ffabd01a5d0f7b085aefdd5de9961f42fd3e4c35699da417a3b2fc13f1` | `0xed9a7ed0371564a3...` |
| 644 | WEATHER_FORECAST | TxLens | `Casablanca, Morocco` | `0xf0c20e6790ea4797e398f9d3565a9dd2ae914c495ae0f94efc8ba6cc50cee42e` | `0x5e9c45e5e19b1910...` |
| 645 | WEATHER_FORECAST | TxLens | `Lisbon, Portugal` | `0x7c39b2bf99f08f41fc88c6d6d69d105240ae86ae162c09b6691b2942c8288daf` | `0x8d77b6706ef685a4...` |
| 646 | WEATHER_FORECAST | TxLens | `Dublin, Ireland` | `0xdd68770a89364167e28341263655b422982052002777cad65810913aebb58365` | `0x6db69ba45d535fa4...` |
| 647 | WEATHER_FORECAST | TxLens | `Oslo, Norway` | `0xd0c035ea21d876c6396076defa0e32d205a148479f355f976e241fef0e2b6609` | `0x50f3f9154bda6622...` |
| 648 | WEATHER_FORECAST | TxLens | `Helsinki, Finland` | `0x1636713a580a5e82a79910fa38c6f86cad319d811b693d134308e87d05ca0f67` | `0x12e5d6bdd320744c...` |
| 649 | WEATHER_FORECAST | TxLens | `Prague, Czechia` | `0xaba93530962cad76faafe1852f155c33e7e0204eb461e6ced98f39bd0779c26e` | `0xbfdff0a7c3e62758...` |
| 650 | WEATHER_FORECAST | TxLens | `Warsaw, Poland` | `0x0d496bbaff4759633f571ad1b176c579a8a9d8e0b43d0f1ef4f0d5acef0666db` | `0x7eea923b643df24a...` |
| 651 | WEATHER_FORECAST | TxLens | `Vienna, Austria` | `0xb6ee00771d33555d886ee59676c85edbd51c6a28fe1c03d3362811403529bbd8` | `0x851e0d54e3c70e06...` |
| 652 | WEATHER_FORECAST | TxLens | `Zurich, Switzerland` | `0x4b8814ca43675fe3e53ec9718b4618fe61df19416010886cf55296cfce3f9b63` | `0xfca71c21d547582c...` |
| 653 | WEATHER_FORECAST | TxLens | `Bangkok, Thailand` | `0xfcaf047feb66a77fad775850e0ac95c255fa0dd79bf34493ad785ddf92d2d4dd` | `0xa5ed0e054011371e...` |
| 654 | WEATHER_FORECAST | TxLens | `Manila, Philippines` | `0x63410a70230d2ecfae7f4ea8ed11fd64033c3aa5d428289c5980278b043d23ad` | `0x6619109e7aed82d9...` |
| 655 | WEATHER_FORECAST | TxLens | `Kuala Lumpur, Malaysia` | `0x3ce14297a08f8c6fd5b34a60967b64d64619cb366734929b617dd5191abba96d` | `0x49bd2c891587d976...` |
| 656 | WEATHER_FORECAST | TxLens | `Jakarta, Indonesia` | `0xce4181a9779aac62ecc3454788d2ee2ea2bb628c2ad42b24d2b2452b8c2f3fce` | `0x7272bff7d03b9fdb...` |
| 657 | STORM_ALERT | TxLens | `Abuja, Nigeria` | `0x2223927c9eaa53065a2cce51fd95a83e1c1d074bb0f1f509427897c69e1885c0` | `0x532c44699f3147b3...` |
| 658 | WEATHER_FORECAST | TxLens | `Hanoi, Vietnam` | `0x28050e46983b33b6526f4ff2152b6e3bdaade40fb0d8c25ac765962f1e2b1ef7` | `0x0c6d1cd08619c370...` |
| 659 | STORM_ALERT | TxLens | `Kampala, Uganda` | `0x4c9a44a8ee1a36e402dcba3c56504c66070521f1b29cfc1bb672892d45a47a89` | `0x2f700c4770ade604...` |
| 660 | STORM_ALERT | TxLens | `Dakar, Senegal` | `0x4fb26c010b453039d001decdada79a5886865c0e828c64539033e5691bbfb5ef` | `0x210f5ae7ac0c9029...` |
| 661 | STORM_ALERT | TxLens | `Accra, Ghana` | `0xbb1fd42608ddec820df5fd478e72b6e29cde33400be87f23e13a96835613cf8b` | `0xd667a14322f0cb17...` |
| 662 | STORM_ALERT | TxLens | `Casablanca, Morocco` | `0x0cab3cb0dab50c6c611045887b069dd99eca06217bbfac17b1893e70f799104e` | `0x057c9a0dbdc2fe67...` |
| 663 | STORM_ALERT | TxLens | `Addis Ababa, Ethiopia` | `0x815e794f5c55a041b63ea4ae5fca810f6f7af86bc3d5066d5d86f8db9dd27785` | `0x3c272e9f04d0dbfe...` |
| 664 | STORM_ALERT | TxLens | `Dar es Salaam, Tanzania` | `0x7435d9901a1cd8e3587680908fd76b77050d835062d473178170f1669833ab0d` | `0x7e31d430180a211f...` |
| 665 | STORM_ALERT | TxLens | `Dublin, Ireland` | `0x7390981ef30d5721077b55ee408f9e12d281746b7f6acabfe90b0d077a32eb8a` | `0xcc967c844ccfab2a...` |
| 666 | STORM_ALERT | TxLens | `Lisbon, Portugal` | `0x4058b972164408f26b9653fe2b92dc836860da54d8d5052aa223e0c4b5e0dddf` | `0xb648dfa046027a30...` |
| 667 | STORM_ALERT | TxLens | `Oslo, Norway` | `0x74f15043bb86ac5a6fdb4e065771b790159735da4be9388c371b3883d7d9790f` | `0x40892bccf34097d5...` |
| 668 | STORM_ALERT | TxLens | `Helsinki, Finland` | `0x3cf99c0f6e33c125fd8a949875229a0d176dce239eaee08bac2599d05d413cd5` | `0x5859241092c746ff...` |
| 669 | STORM_ALERT | TxLens | `Warsaw, Poland` | `0x92182a321865a239e30227982875ab9d2edaa42de3142cc236e147c05ead50f6` | `0xaff23e4063a970d0...` |
| 670 | STORM_ALERT | TxLens | `Vienna, Austria` | `0xc64f83184377c0902d7e63a9d55c0a127595823f2c1400ab168e5d72a480c183` | `0x00e703adb79e1ccd...` |
| 671 | STORM_ALERT | TxLens | `Zurich, Switzerland` | `0x026d7184c72f9c2e721a697b540831461e7df02e081629c3cfde4c6f56f1f575` | `0xc7fc924cd07b5c15...` |
| 672 | STORM_ALERT | TxLens | `Bangkok, Thailand` | `0x4fb951e27e07b877bc59967cdfc36c27456f1d0187f833dd7dbdb15d1e1727f2` | `0x6d2f0dee5f14d527...` |
| 673 | STORM_ALERT | TxLens | `Prague, Czechia` | `0xb965c98ed771145f07ce0d6f9c470688a6f7c676030ca06badc53aabc9ed84e6` | `0x8e338f509d708d5e...` |
| 674 | STORM_ALERT | TxLens | `Jakarta, Indonesia` | `0xfc6dd2398494b0e48127c94f4c74666bbf64f5a928b962c39c070d9dc7cf33a3` | `0xb706d2ca614de787...` |
| 675 | STORM_ALERT | TxLens | `Manila, Philippines` | `0x06d89a01c887adba4fee14121e5596d414267dd8af06ef1ad9d5df71000010e8` | `0xbc642b1af5f0e1eb...` |
| 676 | STORM_ALERT | TxLens | `Hanoi, Vietnam` | `0xa5b32bae9f0a2683dc873e5eb5774a4470113d6af5fd55861485e94e2070c1f3` | `0x1aa44c75b5ced223...` |
| 677 | IP_GEOLOCATION | TxLens | `208.67.222.123` | `0x87d0abfe7901f6792b0701ce6c68bb1f47db9782fed2e1d95d87253b8dddca22` | `0x00dadf67d2934e50...` |
| 678 | STORM_ALERT | TxLens | `Kuala Lumpur, Malaysia` | `0x9cca8772d8a28a1cae162c94f989b508fa5e8b9987026f95540ce68e19cce42f` | `0x68c57e579e4e02d5...` |
| 679 | IP_GEOLOCATION | TxLens | `156.154.70.1` | `0xf154ef4d4f99d57657b19e6ebe6b142fa60376b8b87e8b4c58968727c51aacf7` | `0x3c9f8b25301b8a66...` |
| 680 | IP_GEOLOCATION | TxLens | `8.26.56.26` | `0x5e4d86a1e6c073dbe5b61fd54dd03636d8b77f1b75408cecfd8a88db1957a700` | `0xd8771b720bc75d21...` |
| 681 | IP_GEOLOCATION | TxLens | `199.85.126.10` | `0x8c9921aaacd3a27b236bc43b0de2fb1af46730de79802304c667c16ce3f046e3` | `0x1709944c747b826b...` |
| 682 | IP_GEOLOCATION | TxLens | `199.85.127.10` | `0x4ef840f8aac9ecae349727f940e4b419b8f6e4dcaf46fbc222e85900556af0d9` | `0xf315c67ec790383c...` |
| 683 | IP_GEOLOCATION | TxLens | `156.154.71.1` | `0x49c3a4ba511a2b5b19b56fe3232dbd47234851dc0d85b1e9bdece6da8589e5c4` | `0x0b683a18e41cd334...` |
| 684 | IP_GEOLOCATION | TxLens | `8.20.247.20` | `0x7a006b2391edc7c398e8a3be10cd581f5758f078b1df6e109df870bf7d957324` | `0x0060ce9eeade08a3...` |
| 685 | IP_GEOLOCATION | TxLens | `195.46.39.39` | `0x85bbf435b0a31ee365d8ee40482290d13a75e9031b35e8948c733574b4196065` | `0x13da5f69f1263df3...` |
| 686 | IP_GEOLOCATION | TxLens | `195.46.39.40` | `0x24e694468c55177f97807028e9b78879d49a7933356e32ae730827f466c27a67` | `0xbbceb62cf269f0be...` |
| 687 | IP_GEOLOCATION | TxLens | `216.146.35.35` | `0x3356cd11f4dc033fcaa999e725ece6e2d338fc9c4faa1ed1a6a65ec1f0f13c2a` | `0x424b9be1f5e24f2b...` |
| 688 | IP_GEOLOCATION | TxLens | `45.90.28.0` | `0x5181dbfb255dbf02e236f0fdf5b1cdcef368d39837851de283d1c743e8f7a6cf` | `0xfadd31cb6c111ca4...` |
| 689 | TVL_LOOKUP | TxLens | `spark` | `0xa889dd2a03feefa467d44bdd477eb8a61dbe0b8ca82e4e5826525431e01f3688` | `0xf7bb1751bfcfb344...` |
| 690 | TVL_LOOKUP | TxLens | `pendle` | `0x2254d740298965ae521ae848ae7291ba2670e72cf8e46269ace6841765a5dbb0` | `0x91afc26bb61e895d...` |
| 691 | IP_GEOLOCATION | TxLens | `216.146.36.36` | `0x312abbbd5bf9b103b99012ddb6e6567ef4b1582cd06a7420cf578df2dd1f06ef` | `0x5005a066c0f98dab...` |
| 692 | TVL_LOOKUP | TxLens | `eigenlayer` | `0x007155df81702e99f46ae5d1911b5c889e9215796a9278e850a38ac42d0b2057` | `0xa13fa469b602b3c8...` |
| 693 | TVL_LOOKUP | TxLens | `ethena` | `0xec541f17eea9823d4e829ec7856ea9edf8e7affbac3ecfcf71477982a8617824` | `0x25db6cea4d9089d5...` |
| 694 | TVL_LOOKUP | TxLens | `morpho` | `0x711a449b98d3bcc41401f5799e961b33f80bfd421e8c26fa4eec18c002796a1f` | `0xc649979765fc308d...` |
| 695 | TVL_LOOKUP | TxLens | `jito` | `0x03546bb593bcfa78072c9a20de1c9b4f2ae532c833381fcd552b3aa1c5e1eccb` | `0xb08f553b8a1b3862...` |
| 696 | TVL_LOOKUP | TxLens | `orca` | `0x87e17394572c24202a51e9d312bad2be15d9841ab52bdef3d793803133d6568f` | `0x9c1586159a43afee...` |
| 697 | TVL_LOOKUP | TxLens | `marinade-finance` | `0xcf9ce911543a00d19f4e45c2b661859c8cecd05fd564d2b346399deb4f0aa1ce` | `0x25534e76f1f29442...` |
| 698 | TVL_LOOKUP | TxLens | `benqi` | `0xfda435d1f049aa4ebd81d04ee40bc2fd096698fef26f19a1258231a7bc00fbda` | `0x0f50c8cc51411413...` |
| 699 | TVL_LOOKUP | TxLens | `raydium` | `0x9e6a9b3692feb166b6f6e2e017ef2a246ab6d732936ab91a6e5e601166e1be4e` | `0x0f50c8cc51411413...` |
| 700 | TVL_LOOKUP | TxLens | `trader-joe` | `0xe16aa1ffc19f812d71b448bd9c3e129257d32349a956bffc5c06bd0c8be79f3f` | `0x1024ec9986a6d6d2...` |
| 701 | TOKEN_HOLDER_COUNT | TxLens | `LDO` | `0xa99031b5abca4976bb519f1a1bc6ded3acf7289c6ff23361cd8d784499cf3ba9` | `0xfe3addc402cfea2e...` |
| 702 | TOKEN_HOLDER_COUNT | TxLens | `ARB` | `0x24976ad65a50241af552d79c04838e5ca5b22d7a2e13b4a12162bceb6bd8b26b` | `0xbae9d62693798f4b...` |
| 703 | TOKEN_HOLDER_COUNT | TxLens | `SNX` | `0xdc4f2f6ffd2322372ffc0c7f0d43dedefe63f462901df11afc02f11fac69173a` | `0x1bfb4bf1514ff844...` |
| 704 | TOKEN_HOLDER_COUNT | TxLens | `COMP` | `0x1a78c95c6a877eea5f6144e94d420fd1a8b41f7b93a0f7a8e7e48dc17f3fe36f` | `0x10550ad43bfa7097...` |
| 705 | TOKEN_HOLDER_COUNT | TxLens | `GRT` | `0x53d44cf03a16b8319a30c55aca6210951953b704dd9e9468184ba4cf8b5288d8` | `0x9275ff88a9f71bf5...` |
| 706 | TOKEN_HOLDER_COUNT | TxLens | `CRV` | `0x8ad243be999d9140dac217876ce3d43a0664adf214ef5516271ed53303737ca4` | `0x2afa808fe48b921a...` |
| 707 | TOKEN_HOLDER_COUNT | TxLens | `SAND` | `0x36e68eaf88b21a4c21d41c1b8ece4c6d63a81773e8ed9bc8fc7a0ee1d02d8716` | `0x74b9b95811cf8e3a...` |
| 708 | TOKEN_HOLDER_COUNT | TxLens | `OP` | `0xb9678b33a426caec50d884126d73521222c86fc79c02ea99c0315bd74601ec56` | `0x1a5ebd7521aa558a...` |
| 709 | ACADEMIC_SEARCH | TxLens | `graph neural networks` | `0xd8b3bad26d19701d1dc7b4b6d568dfd6b278956cd41e53d404a0f2b880edebc0` | `0x211acb572945cfc8...` |
| 710 | ACADEMIC_SEARCH | TxLens | `reinforcement learning from human feedback` | `0xb5823785e07defce941a126c4e6db05e5497a5aebfdb71cb62822a7464907eff` | `0x1b59b38e015c762c...` |
| 711 | ACADEMIC_SEARCH | TxLens | `topological insulators` | `0xf1ffcdb75cd33dfe8083db7033d2baaa55e554bf4dc1337236617d9bdf232a0e` | `0x7c0ec36dc95f24bc...` |
| 712 | ACADEMIC_SEARCH | TxLens | `antibiotic resistance mechanisms` | `0xa18c103c18ee6e0b777612cd411172df8783364b05d34163f561aed572285c45` | `0x3bf774689c5d8277...` |
| 713 | ACADEMIC_SEARCH | TxLens | `exoplanet atmospheric spectroscopy` | `0xcc9fb0ec78d9f416e24db24b633f3ddb32477e58db171c49a7d2ec0150e57c1c` | `0x498831634865f907...` |
| 714 | ACADEMIC_SEARCH | TxLens | `gut microbiome and immunity` | `0x15e7cc17b75bde74de6f9811a7cf97e8e51017c82d26a2149519edbca790f34c` | `0x0ddc138238bbfc53...` |
| 715 | ACADEMIC_SEARCH | TxLens | `lithium sulfur batteries` | `0x2e01eca94174b501d36ea8f3439567de2f50b250317d6a9ea6d0ef33b85e923b` | `0x0dbb852f4e9000a1...` |
| 716 | ACADEMIC_SEARCH | TxLens | `photonic integrated circuits` | `0xcbf6dc2139c3d10795731bd31a27fe32db60afd2e90e37d323e2d15e3e5547b9` | `0x805d3cbf7ae07976...` |
| 717 | GAS_PRICE | TxLens | `bsc` | `0x73f5bd84fe88bffa65b6e0d4b9059e7260e81938e97a53ee56aedfe72b338c4c` | `0xf44c4dc5ce463553...` |
| 718 | GAS_PRICE | TxLens | `avalanche` | `0x4b056f4ec7e9ed87cfc8904486b922d3c0714a23f7ce7acb3ff71e0b171ae9dd` | `0x709c45dc0967ba67...` |
| 719 | GAS_PRICE | TxLens | `fantom` | `0xf90c2b131aab39fca9d3bcb82c81b9b44240c84bde471eed455efc1a5d393311` | `0x4962b0b0bc732347...` |
| 720 | GAS_PRICE | TxLens | `celo` | `0xd6edf27a41c99c345e88922a2e4f343a7b6d8bdd23e89314fa74363c368581e5` | `0xeb8ae94b61243bf2...` |
