PROJECT = "COP"
.PHONY: test install clean build update

default: build

test:
	@echo "Testing ${PROJECT}....."
	unset COP_PREFIX;
	NODE_PATH=. ./node_modules/mocha/bin/mocha

install: build
	@echo "Installing ${PROJECT}....."
	cp build/cop /usr/local/bin/cop

update:
	@echo "Updating ${PROJECT}....."
	git pull --no-ff
	npm install

clean :
	rm -rf build node_modules

build : clean
	@echo "Building ${PROJECT}....."
	mkdir build
	npm install
	./node_modules/browserify/bin/cmd.js --node bin/cop -o build/compiled && \
	echo '#!/usr/bin/env node' > build/cop  && \
	cat build/compiled >> build/cop
	chmod +x build/cop
