## Getting Started

Run below command to run the app

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Task 1
Open the app on [http://localhost:3000](http://localhost:3000) to see the dynamic table

## Task 2
API endpoint: http://localhost:3000/luhn

Body: { "number": "7876543241" }

You can import this curl in postman to run the api. Make sure that nextjs app is running before hitting the api.

```
curl --location --request POST 'http://localhost:3000/api/luhn' \
--header 'Content-Type: application/json' \
--data-raw '{
    "number": "7876543241" 
}'
```
