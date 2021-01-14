import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get('/api/rates', async (req, res) => {
    const {base, currency} = req.query;
    if (!base) {
        return res.status(404).json('Base value is required!')
    } 
    if(!currency){
        return res.status(404).json('Currency value(s) are required!')
    }
    const exchangeRates = await fetch(`https://api.exchangeratesapi.io/latest/?base=${base}&currency=${currency}`);
    let response = await exchangeRates.json();
    let results = {
        base: response.base,
        date: response.date,
        rates: response.rates
    };

    if (response.error) {
        return res.status(404).json(response.error);
    }

    return res.status(200).json({results});
        

});

app.listen(process.env.PORT, () => console.log(`App is running on PORT ${process.env.PORT}`));
