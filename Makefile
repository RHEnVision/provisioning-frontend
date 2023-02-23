.PHONY: generate-changelog
generate-changelog: ## Generate CHANGELOG.md from git history
	@echo "Required tool: pip3 install -e https://github.com/RHEnVision/changelog"
	python3 -m rhenvision_changelog .
