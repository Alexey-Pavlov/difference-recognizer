install:
	npm install

start: 
	gendiff before.json after.json

babel: 
	npx babel src --out-dir dist

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npx jest --coverage