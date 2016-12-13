PROJECT = "COP"
.PHONY: test install clean build update

default: build

test:
	@echo "###########################"
	@echo "Testing ${PROJECT}....."
	@echo "###########################"
	unset COP_PREFIX;
	NODE_PATH=. ./node_modules/mocha/bin/mocha

install: build
	@echo "###########################"
	@echo "Installing ${PROJECT}....."
	@echo "###########################"
	cp build/cop /usr/local/bin/cop

update:
	@echo "###########################"
	@echo "Updating ${PROJECT}....."
	@echo "###########################"
	git pull --no-ff
	npm install

clean:
	rm -rf build node_modules

build: clean
	npm install

compile: build
	@echo "###########################"
	@echo "Building ${PROJECT}....."
	@echo "###########################"
	mkdir build
	./node_modules/browserify/bin/cmd.js --node bin/cop -o build/compiled && \
	echo '#!/usr/bin/env node' > build/cop  && \
	cat build/compiled >> build/cop
	chmod +x build/cop
