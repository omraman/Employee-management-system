var config = require('../../config');
var Employee = require('../models/employees');

module.exports = function(app, express){
   var api = express.Router();
   
   api.post('/employee/add', (req,res)=> {
      var employee = new Employee({
         name: req.body.name,
         department: req.body.department,
         gender: req.body.gender
      });
      employee.save((err)=>{
         if(err){
            res.send({ err, message: "Error in adding employee"});
         }else{
            res.json({message: "Employee added successfully"});
         }
      });
   });

   api.get('/employee/list', (req, res)=>{
     Employee.find({}, (err, employee)=>{
        if(err){
           res.send({err, message: "Failed to fetch employee list"});
        }else{
           res.json(employee);
        }
     });
   });

   api.get('/employee/:id', (req, res)=>{
      Employee.findById(req.params.id, (err, employee)=>{
         if(err){
            res.send(err);
         }else{
            res.json(employee);
         }
      });
   });

   api.post('/employee/update/:id', (req, res)=> {
      Employee.findById(req.params.id, (err, employee)=>{
         if(!employee){
            res.send({message: "Employee not found"});
         }else{
            employee.name = req.body.name,
            employee.department = req.body.department,
            employee.gender = req.body.gender

            employee.save().then(employee => {
               res.json("Update Done");
            }).catch(err =>{
               res.status(404).send("Updation Failed");
            });
         }
      });
   });

   api.get('/employee/delete/:id', (req, res)=> {
      Employee.findByIdAndRemove(req.params.id, (err, employee)=> {
         if(err){
            res.send(err);
         }else{
            res.json({employee, message: "Deleted Successfully"});
         }
      });
   });

    return api;
 
}
