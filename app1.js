const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors=require('cors');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var whitelist = ['http://localhost:3000']
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
const mongoose=require('mongoose');

require('./config.js');

const students = mongoose.model('students', {student: String, mobile:String, email:String,course:String,fee:Number,received:Number,status:String,dueDate:Date,payment:JSON,batch:String,classcomment:Date,trainername:String,trainerfee:String,receivedby:String,source:String});

const expenses = mongoose.model('expenses', {name: String, mobile:String, email:String,paidfor:String,payable:Number,paid:Number,status:String,dueDate:Date,payment:JSON});

const enqs = mongoose.model('enqs', {name: String, mobile:String, alternatemobile:String,email:String,course:String,source:String,location:String,assignedto:String,status:String,dueDate:Date,comments:JSON});



// {"name":"","filter":"all","orderBy":{"student":1},"page":2,"rows":2}	
app.post('/getStudents', cors(corsOptions),function (req, res) {
  let query=req.body.name==undefined?'':req.body.name;
  let options=req.body.options,sortBy={dueDate:1};
  let dueDate='';
  if(req.body.filter=='default'){
    options['dueDate']={ $ne: null };
    sortBy={dueDate:1}
  }

  if(req.body.orderBy) sortBy=req.body.orderBy;

  students.find(options,'_id student mobile email course fee received status dueDate batch').sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
    students.find(options).sort(sortBy).count().exec(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.send({count:count,data:data,header:{_id:'UID',student: 'String', mobile:'String', email:'String',course:'String',fee:'Number',received:'Number',dueDate:'Date',batch:'String',status:'String'}}) 
    }
    });
  });  
})

// {"name":"","filter":"all","orderBy":{"student":1},"page":2,"rows":2}	
app.post('/getExpenses', cors(corsOptions),function (req, res) {
  let query=req.body.name==undefined?'':req.body.name;
  let options=req.body.options,sortBy={dueDate:1};
  
  let dueDate='';
  if(req.body.filter=='default'){
    options['dueDate']={ $ne: null };
    sortBy={dueDate:1}
  }
  if(req.body.orderBy) sortBy=req.body.orderBy;
  expenses.find(options,'_id name mobile email paidfor payable paid status dueDate').sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
    expenses.find(options).sort(sortBy).count().exec(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.send({count:count,data:data,header:{_id:'UID',name: 'String', mobile:'String', email:'String',paidfor:'String',payable:'Number',paid:'Number',dueDate:'Date',status:'String'}}) 
    }
    });
  });  
})

app.post('/getEnqs', cors(corsOptions),function (req, res) {
  let query=req.body.name==undefined?'':req.body.name;
  let options=req.body.options,sortBy={dueDate:1};
  
  let dueDate='';
  if(req.body.filter=='default'){
    options['dueDate']={ $ne: null };
    sortBy={dueDate:1}
  }
  console.log(options);
  if(req.body.orderBy) sortBy=req.body.orderBy;
  enqs.find(options,'_id name mobile alternatemobile course source location assignedto status dueDate').sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
    enqs.find(options).sort(sortBy).count().exec(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.send({count:count,data:data,header: {_id:'UID',name: 'String', mobile:'String', alternatemobile:'String',course:'String',source:'String',location:'String',assignedto:'String',status:'String',dueDate:'Date'}}) 
    }
    });
  });  
})

app.post('/getExpense', cors(corsOptions),function (req, res) {
  expenses.find({_id:req.body.name}).exec(function (err, data) {
      res.send(data) 
  });  
});

app.post('/getStudent', cors(corsOptions),function (req, res) {
  students.find({_id:req.body.name}).exec(function (err, data) {
      res.send(data) 
  });  
});
app.post('/getEnq', cors(corsOptions),function (req, res) {
  enqs.find({_id:req.body.name}).exec(function (err, data) {
      res.send(data) 
  });  
});


app.post('/test', cors(corsOptions),function (req, res) {
  students.find(req.body,'student payment').exec(function (err, data) {
      res.send(data) 
  });  
});


app.post('/updateStudent', cors(corsOptions),function (req, res) {
  let body=req.body.body
  // res.send('check');
  students.updateOne({_id:req.body._id},body,function (err, data) {
      res.send(data) 
  });  
});

app.post('/updateEnq', cors(corsOptions),function (req, res) {
  let body=req.body.body
  console.log(body);
  enqs.updateOne({_id:req.body._id},body,function (err, data) {
      res.send(data) 
  });  
});

app.post('/updateExpense', cors(corsOptions),function (req, res) {
  let body=req.body.body
  expenses.updateOne({_id:req.body._id},body,function (err, data) {
      res.send(data) 
  });  
});

app.post('/createPayment', cors(corsOptions),function (req, res) {
  let student=new students(req.body);
  student.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
          res.send(data)
    }
  }); 
});

app.post('/createExpense', cors(corsOptions),function (req, res) {
  let expense=new expenses(req.body);
  expense.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
          res.send(data)
    }
  }); 
});
app.post('/createEnq', cors(corsOptions),function (req, res) {
  let enq=new enqs(req.body);
  enq.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
          res.send(data)
    }
  }); 
});

var user = mongoose.model('users', { name: String, email:String, password:String,role:String });

app.post('/createUser',cors(corsOptions), function (req, res) {
    
    let l_user = new user(req.body);
    l_user.save(function (err) {
        res.send('User Created');
    });
})

app.post('/login', cors(corsOptions),function (req, res) {
  let l_user = req.body;
  user.find(l_user,{"email":1,"name":2,"role":3},function(err,data){
    console.log(data[0])
    
    let l_data=JSON.stringify(data[0]);

    if(data.length){
      jwt.sign(l_data,'secret',
      (err,token)=>{
        res.cookie('role',data[0].role)
        res.cookie('jwt',token).send("Success");
      });
    }
    else
      res.send('Invalid User Name or password')
  });
});

app.post('/logout', cors(corsOptions),function(req, res){
  res.clearCookie('jwt');
  res.clearCookie('role');
  res.send('logged out');
});

app.get('/cook', 
function(req, res){
  if(validateToken(req.cookies.jwt)!=='Valid'){res.send('Invalid token'); return}
  res.send('Valid');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
});