const mysql=require ("mysql2")
const express = require ("express")

const cors = require('cors'); 
const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Root",
database:"test1"
})
db.connect((err,succ)=>{
    if(err){
    console.log("data base not connected")}
    else {
        console.log("data base connected")
    }
})
const app = express();
app.use(express.json()) 
app.use(cors())
app.get("/",(req,res)=>{
    res.json("hello this is the back end")
})

app.get("/employee",(req,res)=>{
    const q = "SELECT * FROM employee"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data) 
    })
})

app.post("/employee", (req, res) => {
  const q = "INSERT INTO employee (id, name, age) VALUES (?, ?, ?)";
  const values = [req.body.id, req.body.name, req.body.age];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json("Employee has been created successfully");
  });
});

app.put("/employee/:id", (req, res) => {
    const q = "UPDATE employee SET name = ?, age = ? WHERE id = ?";
    const values = [req.body.name, req.body.age, req.params.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.json("Employee has been updated successfully");
    });
  });

  app.delete("/employee/:id",(req,res)=>{
    const employeeid = req.params.id;
    const q = "DELETE FROM employee where id =? " 
    db.query(q,[employeeid],(err,data)=>{
        if (err) return res.status(500).json({ error: err.message });
    return res.json("Employee has been deleted successfully");
    })
})



app.listen(8800,()=>{
    console.log("Connected to back end!")
})

