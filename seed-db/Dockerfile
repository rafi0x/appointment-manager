FROM mongo

COPY users.json /users.json
COPY appointments.json /appointments.json

CMD mongoimport --drop --host=mongo --db=appointment --collection=users --type=json --file=users.json --jsonArray && mongoimport --drop --host=mongo --db=appointment --collection=appointments --type=json --file=appointments.json --jsonArray

