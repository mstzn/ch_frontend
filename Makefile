INTEGRATION_TEST_PATH?=./routes

docker.start:
	docker-compose up -d;

docker.stop:
	docker-compose down;

test.unit:
	node ./node_modules/.bin/vue-cli-service test:unit --runInBand