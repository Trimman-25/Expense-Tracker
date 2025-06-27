import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app =express();
const port =3000;

const __filename =fileURLToPath(import.meta.url);
const __direname =path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__direname,"public")));
app.set("view engine", "ejs");
app.set("views",path.join(__direname,"views"));

let expenses =[];
let editExpense =null;

app.get("/",(req,res)=>{
    res.render("home",{expenses});

})
app.post("/add", (req, res) => {
  const { title, amount, category, date, note } = req.body;
  const newExpense = {
    id: Date.now().toString(),
    title,
    amount,
    category,
    date,
    note,
  };
  expenses.push(newExpense);
  res.redirect("/");
});

app.post("/post",(req,res)=>{
    const { title, amount, category, date, note } = req.body;
    const newExpense ={
        id: Date.now().toString(),
        title,
        amount,
        category,
        date,
        note,
    };
    express.push(newExpense);
    res.redirect("/");
})
  app.post("/delete/:id", (req, res) => {
  const idToDelete = req.params.id;
  expenses = expenses.filter(e => e.id !== idToDelete); // ✅ filter out the deleted one
  res.redirect("/"); // ✅ always redirect after a POST
});

app.listen(port,()=>{
    console.log(`Ther Server is running in ${port}`);

})