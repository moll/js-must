NODE = node
NODE_OPTS =
TEST_OPTS =
MOCUMENT = ~/Documents/Mocumentation/bin/mocument
MOCUMENT_OPTS = --type yui --title Must.js

love:
	@echo "Feel like makin' love."

test:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R dot $(TEST_OPTS)

spec:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R spec $(TEST_OPTS)

autotest:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R dot --watch $(TEST_OPTS)

autospec:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R spec --watch $(TEST_OPTS)

pack:
	@file=$$(npm pack); echo "$$file"; tar tf "$$file"

publish:
	npm publish

publish-beta:
	npm publish --tag beta

# NOTE: Sorry, mocumentation is not yet published.
doc: doc.json
	@mkdir -p doc
	@$(MOCUMENT) $(MOCUMENT_OPTS) \
		--priority Must,Object \
		tmp/doc/data.json > doc/API.md

toc: doc.json
	@$(MOCUMENT) $(MOCUMENT_OPTS) \
		--template toc \
		--include Must \
		--var api_url=https://github.com/moll/js-must/blob/master/doc/API.md \
		tmp/doc/data.json > tmp/TOC.md

	@echo '/^API$$/,/^Migrating/{/^API$$/{r tmp/TOC.md\na\\\n\\\n\\\n\n};/^Migrating/!d;}' |\
		sed -i "" -f /dev/stdin README.md

doc.json:
	@mkdir -p tmp
	@yuidoc --exclude test,node_modules --parse-only --outdir tmp/doc .

clean:
	rm -rf tmp *.tgz

tag:
	git tag "v$$($(NODE) -e 'console.log(require("./package").version)')"

.PHONY: love
.PHONY: test spec autotest autospec
.PHONY: pack publish clean
.PHONY: doc toc doc.json
.PHONY: tag
