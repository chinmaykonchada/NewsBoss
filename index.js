import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL="https://newsapi.org/v2/top-headlines";
const API_KEY="7327c9005d9d4cad817984caf24e7260";
// api key for https://newsapi.org/ is-7327c9005d9d4cad817984caf24e7260

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render("index.ejs");
})
app.post('/headlines', async (req, res) => {
    try{
        const response = await axios.get(API_URL + `?country=${req.body.country}`+`&apiKey=${API_KEY}`);
        const result =response.data;
        // console.log(result.totalResults);
        res.render("index.ejs", {news: result})
    }catch (error){
        console.error("Failed to make request:", error.message);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})