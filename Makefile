install:
	npm install

startjson: 
	gendiff before.json after.json

startyml: 
	gendiff before.yml after.yml

startini: 
	gendiff before.ini after.ini

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