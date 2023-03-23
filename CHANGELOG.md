<!-- insertion marker -->
<a name="0.18.0"></a>

## [0.18.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.17.0...0.18.0) (2023-03-23)

### Features

- Add Azure as provider in the wizard ([fc42dd1](https://github.com/RHEnVision/provisioning-frontend/commit/fc42dd1c3cf6057cc1f774e5f66c6a1268f6e994))
- **HMS-1222:** Add support to a source shared with an image ([ab4b17d](https://github.com/RHEnVision/provisioning-frontend/commit/ab4b17deb1358a4dd442d45151f1985fb7b1a53c))
- **HMS-761:** add instances description table after launch ([9fab7e5](https://github.com/RHEnVision/provisioning-frontend/commit/9fab7e5581c852c9a38199f195db80a4523bd994))

### Bug Fixes

- **HMS-1382:** remove the clear button from region select ([9904e0a](https://github.com/RHEnVision/provisioning-frontend/commit/9904e0af37c5ed8385f18baa76bcb30d5e89a5c3))

### Code Refactoring

- Add ouid for Card on show additional info ([583aecd](https://github.com/RHEnVision/provisioning-frontend/commit/583aecd9fc37fa371f44c93165028de04804d8e6))

<a name="0.17.0"></a>

## [0.17.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.16.0...0.17.0) (2023-03-09)

### Bug Fixes

- instance type labels (#212) ([5dafb54](https://github.com/RHEnVision/provisioning-frontend/commit/5dafb5432acc85ef01662227f0fcd71b7db046d0))
- **HMS-1361:** fix a 404 api call at first rendering ([5515b07](https://github.com/RHEnVision/provisioning-frontend/commit/5515b076d8e228e2ee71cb983de71c1002d0c5a4))
- **HMS-1131:** filter out regions with unsuccessful image clones ([08aeb73](https://github.com/RHEnVision/provisioning-frontend/commit/08aeb73b1088508231359617d611f26fa19d37e1))

<a name="0.16.0"></a>

## [0.16.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.15.0...0.16.0) (2023-02-22)

### Features

- **HMS-776:** add gcp UI to wizard ([251c2cc](https://github.com/RHEnVision/provisioning-frontend/commit/251c2cc2f44c9afcbc8b0d9dead305a1b5533917))

### Bug Fixes

- **HMS-1237:** show warning alert when instance type is not supported ([553b1a3](https://github.com/RHEnVision/provisioning-frontend/commit/553b1a310e26bd725d70eabff586931427a072ab))

### Code Refactoring

- Add sources filtering by provider ([0f9b14f](https://github.com/RHEnVision/provisioning-frontend/commit/0f9b14f6cb2c4eb71303db62b928cc0084b2c34d))
- Add custom ids to wizard buttons ([ecb11e6](https://github.com/RHEnVision/provisioning-frontend/commit/ecb11e60aff2613f51e6121458f6a9a2c9c30b06))

<a name="0.15.0"></a>

## [0.15.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.14.1...0.15.0) (2023-02-08)

### Features

- **HMS-1196:** Refactor progress bar to progress steps ([765643b](https://github.com/RHEnVision/provisioning-frontend/commit/765643bc3ac584f247bde5f5570933aa9865b2be))

### Bug Fixes

- **HMS-1195:** fix ssh page after edit ([11bd5f8](https://github.com/RHEnVision/provisioning-frontend/commit/11bd5f89831fb2193b8b76f895330ab2ee369fc6))

<a name="0.14.1"></a>

## [0.14.1](https://github.com/RHEnVision/provisioning-frontend/compare/0.14.0...0.14.1) (2023-01-30)

### Features

- **HMSPROV-406:** add additional info during launch polling ([83414f0](https://github.com/RHEnVision/provisioning-frontend/commit/83414f04016217bfa8c491cf462e4be3d4a344c5))

<a name="0.14.0"></a>

## [0.14.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.13.0...0.14.0) (2023-01-19)

### Features

- **HMSPROV-419:** add a timeout session for reservation polling ([78f40f7](https://github.com/RHEnVision/provisioning-frontend/commit/78f40f7b2a893c2be15f002d66dd5f912908cf28))

### Bug Fixes

- move to useChrome hook ([799f5c6](https://github.com/RHEnVision/provisioning-frontend/commit/799f5c6446cfc78bb0785998bd867b29eaa3a967))
- **HMSPROV-406:** filter instance types with substring ([9343e4f](https://github.com/RHEnVision/provisioning-frontend/commit/9343e4fa08d008324d4239392597b3e2ee6beabe))
- **HMSPROV-420:** show image dropdown and AMI input at once ([2e5321e](https://github.com/RHEnVision/provisioning-frontend/commit/2e5321e1eb3999cf3883349194a27bacb67d8d07))

<a name="0.13.0"></a>

## [0.13.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.12.0...0.13.0) (2023-01-12)

<a name="0.12.0"></a>

## [0.12.0](https://github.com/RHEnVision/provisioning-frontend/compare/0.11.0...0.12.0) (2022-11-27)

### Features

- add reservation id as hidden field ([a419d49](https://github.com/RHEnVision/provisioning-frontend/commit/a419d49f5b7569db5da738999ec4b99cd46657d5))

### Bug Fixes

- **HMSPROV-364:** popover body style ([63073d4](https://github.com/RHEnVision/provisioning-frontend/commit/63073d4842e5fa8d55a08ef28922fc606a2b609e))
- **text:** Improve textation of review description ([dde2273](https://github.com/RHEnVision/provisioning-frontend/commit/dde22738e6e71d4241dcd2e4b7bd42e5ed790c62))

<a name="0.11.0"></a>

## [0.11.0](https://github.com/RHEnVision/provisioning-frontend/compare/7029e78f6ba13aef3591c2685700253ba3eb4480...0.11.0) (2022-11-14)

### Bug Fixes

- **pubkeys:** Component refresh does not move cursor ([34b88b7](https://github.com/RHEnVision/provisioning-frontend/commit/34b88b7844ed12e49d13a0ccb84de4ab56800b19))

