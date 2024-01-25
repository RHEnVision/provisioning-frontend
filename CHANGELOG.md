<!-- insertion marker -->
<a name="1.13.0"></a>

## [1.13.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.12.0...1.13.0) (2024-01-24)

### Features

- **[HMS-3332](https://issues.redhat.com/browse/HMS-3332):** Migrate to PF5 (#365) ([295c472](https://github.com/RHEnVision/provisioning-frontend/commit/295c472c36f4edd71f0d8b4dd90774d33950d5b0))

### Bug Fixes

- **[HMS-3373](https://issues.redhat.com/browse/HMS-3373):** update msw and frontend-components-config ([dfc42cf](https://github.com/RHEnVision/provisioning-frontend/commit/dfc42cff973439172a06f2d423219f2fbe3644b7))

<a name="1.12.0"></a>

## [1.12.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.11.0...1.12.0) (2023-12-05)

### Bug Fixes

- **[HMS-3203](https://issues.redhat.com/browse/HMS-3203):** Add GCP copy image command when missing a source ([4a154a6](https://github.com/RHEnVision/provisioning-frontend/commit/4a154a6783baa49a7a6332a38d2fa59f8e44a524))

<a name="1.11.0"></a>

## [1.11.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.10.0...1.11.0) (2023-11-03)

### Bug Fixes

- do not show region in review for Azure provider ([f73b3d6](https://github.com/RHEnVision/provisioning-frontend/commit/f73b3d6979b6420b621970edc8d160dcb69b9293)), related to [HMS-2255](https://issues.redhat.com/browse/HMS-2255)

<a name="1.10.0"></a>

## [1.10.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.9.0...1.10.0) (2023-11-02)

### Features

- **[HMS-2255](https://issues.redhat.com/browse/HMS-2255):** deploy to image RG by default ([8c946d2](https://github.com/RHEnVision/provisioning-frontend/commit/8c946d23d77a1972301fefeb01c52ffdf6be7c44))

### Bug Fixes

- Replace 'vCPU' with 'vcpus' ([1c11b5b](https://github.com/RHEnVision/provisioning-frontend/commit/1c11b5b7cd6e6a3d5d65d840e5d6ba024dd90f55)), related to [HMS-2301](https://issues.redhat.com/browse/HMS-2301)

<a name="1.9.0"></a>

## [1.9.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.8.0...1.9.0) (2023-10-18)

### Features

- **[HMS-1135](https://issues.redhat.com/browse/HMS-1135):** improve arch compatibility ([8ae104a](https://github.com/RHEnVision/provisioning-frontend/commit/8ae104a0d984492f2f3d764b923994ddfdfc827c))
- **[HMS-1772](https://issues.redhat.com/browse/HMS-1772):** Allow selecting custom resource group ([3e73a67](https://github.com/RHEnVision/provisioning-frontend/commit/3e73a67fa9779537536225be62ba034813eb9017))
- **[HMS-2227](https://issues.redhat.com/browse/HMS-2227):** Add pubkey pagination ([341eb9d](https://github.com/RHEnVision/provisioning-frontend/commit/341eb9d592ed64b9219d5a7b0395281bcf20d034))

<a name="1.8.0"></a>

## [1.8.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.7.0...1.8.0) (2023-10-04)

### Features

- **[HMS-2542](https://issues.redhat.com/browse/HMS-2542):** remove travis deployment ([c0b5184](https://github.com/RHEnVision/provisioning-frontend/commit/c0b518469f8667981e330b422eda0c6ae53d41e2))
- **[HMS-1897](https://issues.redhat.com/browse/HMS-1897):** add export to csv btn to instances table ([7ae9f9c](https://github.com/RHEnVision/provisioning-frontend/commit/7ae9f9ccd2440bf99429671d6db7c9ece892685c))
- **[HMS-2496](https://issues.redhat.com/browse/HMS-2496):** add no permission empty state ([854793b](https://github.com/RHEnVision/provisioning-frontend/commit/854793bd788e1863e8a56d4becd2bf2ca07553ec))
- **[HMS-2176](https://issues.redhat.com/browse/HMS-2176):** add info banner for notification ([982c7fa](https://github.com/RHEnVision/provisioning-frontend/commit/982c7fa41fd76a9bb81c4090d81b51bbd45ef933))

### Bug Fixes

- **[HMS-2618](https://issues.redhat.com/browse/HMS-2618):** format regions error correctly ([bfc0ec0](https://github.com/RHEnVision/provisioning-frontend/commit/bfc0ec0d42da2508e240861e595ef9380467059b))
- upgrade @patternfly/react-table from 4.113.3 to 4.113.4 ([b84ff2e](https://github.com/RHEnVision/provisioning-frontend/commit/b84ff2ed5fecb2d8c4764d5055942e4a06acab3a))
- **[HMS-2034](https://issues.redhat.com/browse/HMS-2034):** Unify missing source empty state ([32944cd](https://github.com/RHEnVision/provisioning-frontend/commit/32944cd7a9eadf545df07715f77447b9c81c3584))
- upgrade classnames from 2.3.1 to 2.3.2 ([88ed071](https://github.com/RHEnVision/provisioning-frontend/commit/88ed0718b28113a34c81a3298912733c1fa22b51))
- upgrade @redhat-cloud-services/frontend-components from 3.11.2 to 3.11.5 ([c9db6e3](https://github.com/RHEnVision/provisioning-frontend/commit/c9db6e3cd9e69f14060bd5aa3196de28b5a8efb1))
- **[HMS-2350](https://issues.redhat.com/browse/HMS-2350):** Add a warning if source is unavailable ([6f08d2e](https://github.com/RHEnVision/provisioning-frontend/commit/6f08d2e31f46532b3d4c7c95580afdffa79f189f))

<a name="1.7.0"></a>

## [1.7.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.6.0...1.7.0) (2023-09-05)

### Features

- **[HMS-2444](https://issues.redhat.com/browse/HMS-2444):** migrate to react-query v4 ([bc32c80](https://github.com/RHEnVision/provisioning-frontend/commit/bc32c80652fd10b4b54ffb98726856e14a9d0634))
- **[HMS-2369](https://issues.redhat.com/browse/HMS-2369):** remove stage old deployment ([968ce20](https://github.com/RHEnVision/provisioning-frontend/commit/968ce20c977c6c14858ee3029cd97388245e28b0))
- **[HMS-2301](https://issues.redhat.com/browse/HMS-2301):** add query search for instance types select ([af81237](https://github.com/RHEnVision/provisioning-frontend/commit/af812376623f84357f1465a3e09f56c27115090d))

### Bug Fixes

- **[HMS-1913](https://issues.redhat.com/browse/HMS-1913):** add an optinal string to template select ([5967648](https://github.com/RHEnVision/provisioning-frontend/commit/5967648ffe28ec619fd115f7f811c7465225e1ba))
- **[HMS-2428](https://issues.redhat.com/browse/HMS-2428):** reduce the bundle size ([b68193e](https://github.com/RHEnVision/provisioning-frontend/commit/b68193ef2328fcecb68adb1d0eb627e4163182dc))

<a name="1.6.0"></a>

## [1.6.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.5.0...1.6.0) (2023-08-24)

### Features

- **[HMS-2378](https://issues.redhat.com/browse/HMS-2378):** refactor the template select alert ([f38f918](https://github.com/RHEnVision/provisioning-frontend/commit/f38f9186d599ddcf91dc22e9cef4c7bb4232055f))
- **[HMS-2341](https://issues.redhat.com/browse/HMS-2341):** refactor the instance counter alert to validation ([7d4c715](https://github.com/RHEnVision/provisioning-frontend/commit/7d4c71564b5d8b312052ffb33e6c690fa7fe641c))
- **[HMS-2304](https://issues.redhat.com/browse/HMS-2304):** Nest list endpoints with 'data' (#301) ([de7afae](https://github.com/RHEnVision/provisioning-frontend/commit/de7afaeede42ccf3a38efd3b35f384f291e991af))

### Bug Fixes

- **[HMS-2261](https://issues.redhat.com/browse/HMS-2261):** show warning when polling reservation fails ([681bf28](https://github.com/RHEnVision/provisioning-frontend/commit/681bf2843f3e77604921045753f252a2cccb4468))

<a name="1.5.0"></a>

## [1.5.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.4.0...1.5.0) (2023-08-09)

### Bug Fixes

- **[HMS-2297](https://issues.redhat.com/browse/HMS-2297):** clear key format error ([ee9f948](https://github.com/RHEnVision/provisioning-frontend/commit/ee9f948d50138514fe3933d922d3462e466a0650))
- **[HMS-2256](https://issues.redhat.com/browse/HMS-2256):** enhance wizard first page interface ([d3918a8](https://github.com/RHEnVision/provisioning-frontend/commit/d3918a8dcbb02f65e2369bbbb2120f983776b78f))
- **[HMS-1757](https://issues.redhat.com/browse/HMS-1757):** remove hard coded preview in sources link ([1042947](https://github.com/RHEnVision/provisioning-frontend/commit/1042947ff608dfbb93b5acc3fa38f9322ab1c066))
- **[HMS-2247](https://issues.redhat.com/browse/HMS-2247):** add spinner to instances table ([0139551](https://github.com/RHEnVision/provisioning-frontend/commit/0139551c109afd798dfc9ee3717052172fb5e244))
- **[HMS-1524](https://issues.redhat.com/browse/HMS-1524):** enable case insensitive search ([287ac2c](https://github.com/RHEnVision/provisioning-frontend/commit/287ac2c30ffb3ceb50c2c6641900830b73e4e463))

<a name="1.4.0"></a>

## [1.4.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.3.0...1.4.0) (2023-07-21)

### Features

- **[HMS-1955](https://issues.redhat.com/browse/HMS-1955):** Add fetch instance desc step for GCP ([4e62535](https://github.com/RHEnVision/provisioning-frontend/commit/4e62535da04d1e48bd411c23df4ad5b6b7562969))
- **[HMS-1930](https://issues.redhat.com/browse/HMS-1930):** Add image commands clipboard for GCP ([7dedbdd](https://github.com/RHEnVision/provisioning-frontend/commit/7dedbdd416794697916a272977216d718188c390))

### Bug Fixes

- **[HMS-2114](https://issues.redhat.com/browse/HMS-2114):** Disable zone selection for GCP images ([70febe7](https://github.com/RHEnVision/provisioning-frontend/commit/70febe7e5957706fe848fc2deb96804d5b95a7f1))

### Code Refactoring

- Disable templates dropdown when templates array is empty ([d107e40](https://github.com/RHEnVision/provisioning-frontend/commit/d107e409fe6e6037d04dd84690c0ef3d9ca54043))

<a name="1.3.0"></a>

## [1.3.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.2.0...1.3.0) (2023-07-09)

### Features

- **[HMS-2022](https://issues.redhat.com/browse/HMS-2022):** Show DNS column only if public_dns(s) are not empty ([4ce1c8c](https://github.com/RHEnVision/provisioning-frontend/commit/4ce1c8c8319f3ef87d8bf9e8c0ffb342dab51410))
- **[HMS-1978](https://issues.redhat.com/browse/HMS-1978):** Add launch templates to GCP ([76fec97](https://github.com/RHEnVision/provisioning-frontend/commit/76fec97c548fa6049ba6fe32f299d42f7897719f))
- **[HMS-1879](https://issues.redhat.com/browse/HMS-1879):** Add instance desc table for GCP ([ca06986](https://github.com/RHEnVision/provisioning-frontend/commit/ca069864f01c8348ec25ad885f32b54cdb2a05a9))

<a name="1.2.0"></a>

## [1.2.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.1.0...1.2.0) (2023-06-26)

### Bug Fixes

- **[HMSPROV-2012](https://issues.redhat.com/browse/HMSPROV-2012):** fix missing instances table ([5cc1c67](https://github.com/RHEnVision/provisioning-frontend/commit/5cc1c6729c0fc3bc577e9937cae2ca5b0690b03d))
- **[HMS-1917](https://issues.redhat.com/browse/HMS-1917):** Add source filtering in GCP ([58da4d6](https://github.com/RHEnVision/provisioning-frontend/commit/58da4d69b2a51b3ef8ca7465b5a73b8e90975262))

### Code Refactoring

- remove service account from test ([9eb9b28](https://github.com/RHEnVision/provisioning-frontend/commit/9eb9b28e932819e1eb1eb6a9f28edc6845a2e13b))

<a name="1.1.0"></a>

## [1.1.0](https://github.com/RHEnVision/provisioning-frontend/compare/1.0.0...1.1.0) (2023-06-13)

### Features

- **[HMS-1907](https://issues.redhat.com/browse/HMS-1907):** add dev script for  containerizing provisioning env ([6641ce4](https://github.com/RHEnVision/provisioning-frontend/commit/6641ce42354a92cc3aaac547aae9c905d72be626))

<a name="1.0.0"></a>

## [1.0.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.21.0...1.0.0) (2023-05-31)

### Features

- remove feature flag for AWS launch template ([ea2775a](https://github.com/RHEnVision/provisioning-frontend/commit/ea2775adcdb5e8ad33b80309f9faf4931fd485ad)), related to [HMS-1850](https://issues.redhat.com/browse/HMS-1850)
- Prolong polling for Azure ([9ce1066](https://github.com/RHEnVision/provisioning-frontend/commit/9ce1066194a58230779769a9ae2acc3807c27dcb)), related to [HMS-1553](https://issues.redhat.com/browse/HMS-1553)

### Bug Fixes

- remove double slash from URL ([e4b73a2](https://github.com/RHEnVision/provisioning-frontend/commit/e4b73a2b8834b87ab24de36fbc64cf7881ea5162)), related to [HMS-1858](https://issues.redhat.com/browse/HMS-1858)
- **[HMS-1799](https://issues.redhat.com/browse/HMS-1799):** fix typos ([fe59358](https://github.com/RHEnVision/provisioning-frontend/commit/fe59358bf743585a3265b71a015fbcacf4b7c79e))
- Region select disabled when one cloned image exists ([71df35f](https://github.com/RHEnVision/provisioning-frontend/commit/71df35f2d8efa803d34348c5716b2ef79cca006a)), related to [HMS-757](https://issues.redhat.com/browse/HMS-757)
- **[HMS-1748](https://issues.redhat.com/browse/HMS-1748):** use staleTime config ([7acb3ea](https://github.com/RHEnVision/provisioning-frontend/commit/7acb3ea87aef09ea73950fc4b71be5218ea03319))

<a name="0.21.0"></a>

## [0.21.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.20.0...0.21.0) (2023-05-15)

### Features

- **[HMS-1411](https://issues.redhat.com/browse/HMS-1411):**  ed25519 type is unsupported in azure ([519e930](https://github.com/RHEnVision/provisioning-frontend/commit/519e9309272723a8ca3b4dc9408f3fed03e416f3))
- **[HMS-1614](https://issues.redhat.com/browse/HMS-1614):** Add vCPU limit Warning ([6029c5b](https://github.com/RHEnVision/provisioning-frontend/commit/6029c5ba688bb4ccf0132fb82a85ce42f26379bb))
- **[HMS-1109](https://issues.redhat.com/browse/HMS-1109):** Add correlation id to UI ([03c58b9](https://github.com/RHEnVision/provisioning-frontend/commit/03c58b98da9eaba0ecbeafd2ecbf6c685266bc57))

### Bug Fixes

- Sources link respect preview toggle ([9a188f9](https://github.com/RHEnVision/provisioning-frontend/commit/9a188f9f5e2023fab595cea722842d4098ebd97f)), related to [HMS-1757](https://issues.redhat.com/browse/HMS-1757)

<a name="0.20.0"></a>

## [0.20.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.19.0...0.20.0) (2023-05-02)

### Bug Fixes

- **[HMS-1573](https://issues.redhat.com/browse/HMS-1573):** add clear button to template select ([cf8de91](https://github.com/RHEnVision/provisioning-frontend/commit/cf8de91d060c32e4e78de166b2415bde8d9c2826))
- **[HMS-1573](https://issues.redhat.com/browse/HMS-1573):** add launch template name in review step ([149b452](https://github.com/RHEnVision/provisioning-frontend/commit/149b452b8ad8f9cfc22d6fae77fe2c34bf4f186f))
- sources loading when one source failing ([6223e13](https://github.com/RHEnVision/provisioning-frontend/commit/6223e136432a09d0e399cd0100faa3eeb8013421)), related to [HMS-1657](https://issues.redhat.com/browse/HMS-1657)
- **[HMS-1648](https://issues.redhat.com/browse/HMS-1648):** Remove `isOpen` from Wizard ([36ce777](https://github.com/RHEnVision/provisioning-frontend/commit/36ce7776b55def608afc7892fdb841013037c9ef))

### Code Refactoring

- **[HMS-1573](https://issues.redhat.com/browse/HMS-1573):** fix failing tests ([4858ca9](https://github.com/RHEnVision/provisioning-frontend/commit/4858ca92982795d449e8141c160452502964a50d))

<a name="0.19.0"></a>

## [0.19.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.18.0...0.19.0) (2023-04-19)

### Features

- filter source in the select ([88ffd54](https://github.com/RHEnVision/provisioning-frontend/commit/88ffd5413bc43e01a8ab318d113b4e18f0534cd6)), related to [HMS-1625](https://issues.redhat.com/browse/HMS-1625)
- support for Azure image deployed to source account ([7fd735b](https://github.com/RHEnVision/provisioning-frontend/commit/7fd735b0ae65bc56c9b28080042e07aa835bf252)), related to [HMS-1409](https://issues.redhat.com/browse/HMS-1409)
- Add region select for AWS in Empty state ([2f468cf](https://github.com/RHEnVision/provisioning-frontend/commit/2f468cf2dc6906a07c2b8767caec0ad9b2047be1)), related to [HMS-1583](https://issues.redhat.com/browse/HMS-1583)
- Add Azure instance table on Launch success ([ac05138](https://github.com/RHEnVision/provisioning-frontend/commit/ac0513849b96552051493f6270c79a12a447fc1a)), related to [HMS-1409](https://issues.redhat.com/browse/HMS-1409)
- add empty state when no source available ([e42c381](https://github.com/RHEnVision/provisioning-frontend/commit/e42c3811861e73252882db6166b64c89e297395e)), related to [HMS-1583](https://issues.redhat.com/browse/HMS-1583)
- **[HMS-1210](https://issues.redhat.com/browse/HMS-1210):** add launch template to wizard (#226) ([459f786](https://github.com/RHEnVision/provisioning-frontend/commit/459f786f3265d91d058493650228320609a67793))
- **[HMS-1477](https://issues.redhat.com/browse/HMS-1477):** mark succesful launch progress ([cd2737f](https://github.com/RHEnVision/provisioning-frontend/commit/cd2737f0dc39e0ee37c8fc9ba05048e9cb4d3aaf))

### Bug Fixes

- **[HMS-1553](https://issues.redhat.com/browse/HMS-1553):** use warning for polling timeout ([f32ebbb](https://github.com/RHEnVision/provisioning-frontend/commit/f32ebbb5b0d60cde5f007c2b4b7c55ffaab9edf1))
- **HMS-#1504:** fix timeout interval regression during lanuch ([0f32476](https://github.com/RHEnVision/provisioning-frontend/commit/0f32476f77288efec7b04949322c319c280f3cee))

### Code Refactoring

- Stateless region select ([6fa978f](https://github.com/RHEnVision/provisioning-frontend/commit/6fa978fd8c8a30589aa68e6850f1f57e5fbe824e))

<a name="0.18.0"></a>

## [0.18.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.17.0...0.18.0) (2023-03-23)

### Features

- Add Azure as provider in the wizard ([fc42dd1](https://github.com/RHEnVision/provisioning-frontend/commit/fc42dd1c3cf6057cc1f774e5f66c6a1268f6e994)), related to [HMS-777](https://issues.redhat.com/browse/HMS-777)
- **[HMS-1222](https://issues.redhat.com/browse/HMS-1222):** Add support to a source shared with an image ([ab4b17d](https://github.com/RHEnVision/provisioning-frontend/commit/ab4b17deb1358a4dd442d45151f1985fb7b1a53c))
- **[HMS-761](https://issues.redhat.com/browse/HMS-761):** add instances description table after launch ([9fab7e5](https://github.com/RHEnVision/provisioning-frontend/commit/9fab7e5581c852c9a38199f195db80a4523bd994))

### Bug Fixes

- **[HMS-1382](https://issues.redhat.com/browse/HMS-1382):** remove the clear button from region select ([9904e0a](https://github.com/RHEnVision/provisioning-frontend/commit/9904e0af37c5ed8385f18baa76bcb30d5e89a5c3))

### Code Refactoring

- Add ouid for Card on show additional info ([583aecd](https://github.com/RHEnVision/provisioning-frontend/commit/583aecd9fc37fa371f44c93165028de04804d8e6))

<a name="0.17.0"></a>

## [0.17.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.16.0...0.17.0) (2023-03-09)

### Bug Fixes

- instance type labels (#212) ([5dafb54](https://github.com/RHEnVision/provisioning-frontend/commit/5dafb5432acc85ef01662227f0fcd71b7db046d0)), related to [HMS-1381](https://issues.redhat.com/browse/HMS-1381)
- **[HMS-1361](https://issues.redhat.com/browse/HMS-1361):** fix a 404 api call at first rendering ([5515b07](https://github.com/RHEnVision/provisioning-frontend/commit/5515b076d8e228e2ee71cb983de71c1002d0c5a4))
- **[HMS-1131](https://issues.redhat.com/browse/HMS-1131):** filter out regions with unsuccessful image clones ([08aeb73](https://github.com/RHEnVision/provisioning-frontend/commit/08aeb73b1088508231359617d611f26fa19d37e1))

<a name="0.16.0"></a>

## [0.16.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.15.0...0.16.0) (2023-02-22)

### Features

- **[HMS-776](https://issues.redhat.com/browse/HMS-776):** add gcp UI to wizard ([251c2cc](https://github.com/RHEnVision/provisioning-frontend/commit/251c2cc2f44c9afcbc8b0d9dead305a1b5533917))

### Bug Fixes

- **[HMS-1237](https://issues.redhat.com/browse/HMS-1237):** show warning alert when instance type is not supported ([553b1a3](https://github.com/RHEnVision/provisioning-frontend/commit/553b1a310e26bd725d70eabff586931427a072ab))

### Code Refactoring

- Add sources filtering by provider ([0f9b14f](https://github.com/RHEnVision/provisioning-frontend/commit/0f9b14f6cb2c4eb71303db62b928cc0084b2c34d))
- Add custom ids to wizard buttons ([ecb11e6](https://github.com/RHEnVision/provisioning-frontend/commit/ecb11e60aff2613f51e6121458f6a9a2c9c30b06)), related to [HMS-1127](https://issues.redhat.com/browse/HMS-1127)

<a name="0.15.0"></a>

## [0.15.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.14.1...0.15.0) (2023-02-08)

### Features

- **[HMS-1196](https://issues.redhat.com/browse/HMS-1196):** Refactor progress bar to progress steps ([765643b](https://github.com/RHEnVision/provisioning-frontend/commit/765643bc3ac584f247bde5f5570933aa9865b2be))

### Bug Fixes

- **[HMS-1195](https://issues.redhat.com/browse/HMS-1195):** fix ssh page after edit ([11bd5f8](https://github.com/RHEnVision/provisioning-frontend/commit/11bd5f89831fb2193b8b76f895330ab2ee369fc6))

<a name="0.14.1"></a>

## [0.14.1](https://github.com/RHEnVision/provisioning-frontend/compare/0.14.0...0.14.1) (2023-01-30)

### Features

- **[HMSPROV-406](https://issues.redhat.com/browse/HMSPROV-406):** add additional info during launch polling ([83414f0](https://github.com/RHEnVision/provisioning-frontend/commit/83414f04016217bfa8c491cf462e4be3d4a344c5))

<a name="0.14.0"></a>

## [0.14.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.13.0...0.14.0) (2023-01-19)

### Features

- **[HMSPROV-419](https://issues.redhat.com/browse/HMSPROV-419):** add a timeout session for reservation polling ([78f40f7](https://github.com/RHEnVision/provisioning-frontend/commit/78f40f7b2a893c2be15f002d66dd5f912908cf28))

### Bug Fixes

- move to useChrome hook ([799f5c6](https://github.com/RHEnVision/provisioning-frontend/commit/799f5c6446cfc78bb0785998bd867b29eaa3a967)), related to [HMSPROV-430](https://issues.redhat.com/browse/HMSPROV-430)
- **[HMSPROV-406](https://issues.redhat.com/browse/HMSPROV-406):** filter instance types with substring ([9343e4f](https://github.com/RHEnVision/provisioning-frontend/commit/9343e4fa08d008324d4239392597b3e2ee6beabe))
- **[HMSPROV-420](https://issues.redhat.com/browse/HMSPROV-420):** show image dropdown and AMI input at once ([2e5321e](https://github.com/RHEnVision/provisioning-frontend/commit/2e5321e1eb3999cf3883349194a27bacb67d8d07))

<a name="0.13.0"></a>

## [0.13.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.12.0...0.13.0) (2023-01-12)

<a name="0.12.0"></a>

## [0.12.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.11.0...0.12.0) (2022-11-27)

### Features

- add reservation id as hidden field ([a419d49](https://github.com/RHEnVision/provisioning-frontend/commit/a419d49f5b7569db5da738999ec4b99cd46657d5)), related to [HMSPROV-359](https://issues.redhat.com/browse/HMSPROV-359)

### Bug Fixes

- **[HMSPROV-364](https://issues.redhat.com/browse/HMSPROV-364):** popover body style ([63073d4](https://github.com/RHEnVision/provisioning-frontend/commit/63073d4842e5fa8d55a08ef28922fc606a2b609e))
- **text:** Improve textation of review description ([dde2273](https://github.com/RHEnVision/provisioning-frontend/commit/dde22738e6e71d4241dcd2e4b7bd42e5ed790c62))

<a name="0.11.0"></a>

## [0.11.0](https://github.com/RHEnVision/provisioning-frontend/compare/7029e78f6ba13aef3591c2685700253ba3eb4480...0.11.0) (2022-11-14)

### Bug Fixes

- **pubkeys:** Component refresh does not move cursor ([34b88b7](https://github.com/RHEnVision/provisioning-frontend/commit/34b88b7844ed12e49d13a0ccb84de4ab56800b19)), related to [HMSPROV-270](https://issues.redhat.com/browse/HMSPROV-270)

