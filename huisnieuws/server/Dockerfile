FROM node:17-alpine

ENV ATLAS_URI="mongodb://mongo:27017/huisnieuws?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false" \
    TEST_ATLAS_URI="mongodb://mongo:27017/huisnieuws-test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false" \
    NEXT_URL="http://localhost:8080" \
    PORT=8000

RUN mkdir -p /home/app

COPY . /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install & build in /home/app because of WORKDIR
RUN npm install
RUN npm run build

# no need for /home/app/server.js because of WORKDIR
CMD ["node", "dist/index.js"]
