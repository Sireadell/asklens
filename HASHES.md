# Signal hashes

Every row below is a real Telegraph miner response that AskLens paid for
and received. Each carries the `signal_hash` the network returned, which is
resolvable at the Engine by anyone, and the on-chain transaction that settled
the x402 payment for it. Nothing here is generated, replayed, or estimated:
if a call failed, it is not in this file.

**426 signals** across 14 intents and 5 miners.

- Collected: 2026-09-07T21:59:30.824Z to 2026-09-07T22:13:47.458Z
- Paid by: `0xA8Ae7deF7692C81a0Cb8Cd8eD55B60a56e417076` (Base Sepolia test USDC)
- Settled on-chain: 426 of 426
- Spent: $4.26 in test USDC

## Per intent

| Intent | Signals |
|---|---|
| URL_SCAN | 180 |
| FRAUD_DETECTION | 49 |
| WALLET_BALANCE_CHECK | 25 |
| CRYPTO_PRICE | 24 |
| STOCK_PRICE | 24 |
| SSL_VERIFICATION | 20 |
| WEATHER_FORECAST | 20 |
| STORM_ALERT | 19 |
| IP_GEOLOCATION | 15 |
| TVL_LOOKUP | 15 |
| TOKEN_HOLDER_COUNT | 12 |
| ACADEMIC_SEARCH | 12 |
| ONCHAIN_TX_LOOKUP | 6 |
| GAS_PRICE | 5 |

## Per miner

| Miner | Signals |
|---|---|
| TxLens | 197 |
| NetWire URL Scan | 60 |
| URL Sentinel | 60 |
| PREFLIGHT Infrastructure Signals | 60 |
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
