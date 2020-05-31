install:
	npm install

startjson: 
	gendiff before.json after.json

startjsonRecursive:
	gendiff beforeRecursive.json afterRecursive.json

startyml: 
	gendiff before.yml after.yml

startymlRecursive:
	gendiff beforeRecursive.yml afterRecursive.yml

startini: 
	gendiff before.ini after.ini

startiniRecursive: 
	gendiff beforeRecursive.ini afterRecursive.ini

startPlainJSON:
	make babel
	gendiff --format plain beforeRecursive.json afterRecursive.json

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