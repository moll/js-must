love:
	@echo "Feel like makin' love."

test:
	@./node_modules/.bin/mocha --reporter dot $(MOCHA_OPTS)

spec: 
	@./node_modules/.bin/mocha --reporter spec $(MOCHA_OPTS)

autotest:
	@./node_modules/.bin/mocha --reporter spec --watch $(MOCHA_OPTS)

.PHONY: love test spec autotest
