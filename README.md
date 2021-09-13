# WebPush
> A web push notification example with node js + react ts that runs on Chrome and Firefox
<br />
<br />

## Setup
> Please change the port in the index.js file (default to 80)
<br />

### One-line-command
```bash
git clone https://github.com/h110m/WebPush . && npm i && cd web && npm i && npm run build && cd .. && npm start
```
<br />

### Step-by-step
Clone the repo with
```bash
git clone https://github.com/h110m/WebPush .
```
Install the dependencies for the backend with
```bash
npm install
```
Go in the frontend folder and install the dependencies with
```bash
cd web && npm install
```
Build the frontend with
```bash
npm run build
```
Go outside the web folder and start the backend with
```bash
cd .. && npm start
```
<br />
<br />

## How to use
You can just go to http://localhost:80 to access the website and register a webworker for your notifications.
When the registration is successfull you will get an ID that you can use to make a `GET` request to http://localhost:80/sub/{ID} which will send a [predefined hardcoded message](https://github.com/h110m/WebPush/blob/7d1b64c8b0f6ac9a48d5c68f3c7bfd919111730b/API/backend.js#L39) to the device with the given ID
<br />
<br />

## About this project
Well... uhm... i was just tinkering around with the web push notification api and "accidentally" wrote a neat little example on how to use the web push notification api.

Have fun tinkering with it ^-^

## About me
> Made with 
