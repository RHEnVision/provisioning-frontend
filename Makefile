export PROXY = true

.PHONY: run
run:
	npm run start

.PHONY: install
install:
	npm install

.PHONY: generate-changelog
generate-changelog:
	scripts/changelog.py
