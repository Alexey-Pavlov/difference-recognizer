install:
	npm install

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