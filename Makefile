PROJECT = "COP"

default: install

test: ;@echo "Testing ${PROJECT}....."; \
	export NODE_PATH=.; \
	unset COP_PREFIX; \
	./node_modules/mocha/bin/mocha;

install: ;@echo "Installing ${PROJECT}....."; \
	npm install

update: ;@echo "Updating ${PROJECT}....."; \
	git pull --no-ff; \
	npm install

clean : ;
	rm -rf node_modules

.PHONY: test server install clean update