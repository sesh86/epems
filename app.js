const cors=require('cors');

var whitelist = ['http://localhost:3000']
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

const _app=require('./config.js');
//mongoose.connect('mongodb://'+_app.user+':'+_app.pwd+'@cluster0-shard-00-00-lemrd.mongodb.net:27017,cluster0-shard-00-01-lemrd.mongodb.net:27017,cluster0-shard-00-02-lemrd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{useNewUrlParser: true});
mongoose.connect('mongodb://sesh:sesh1234@127.0.0.1:27017/test',{useNewUrlParser: true});
var students = mongoose.model('students', {student: String, mobile:String, email:String,course:String,fee:Number,received:Number,status:String,dueDate:Date,payment:JSON,batch:String});

var expenses = mongoose.model('expenses', {name: String, mobile:String, email:String,paidfor:String,payable:Number,paid:Number,status:String,dueDate:Date,payment:JSON});

var enqs = mongoose.model('enqs', {name: String, mobile:String, email:String,course:String,source:String,location:String,assignedto:String,status:String,dueDate:Date,comments:JSON});

var candidates = mongoose.model('candidates', {student: String, mobile:Number, email:String,course:String,fee:Number,received:Number,status:String,dueDate:Date});

var candidateComments = mongoose.model('candidateComments', {studentId: {type: Schema.Types.ObjectId, ref: 'candidates'}, comment:String,commentDate:Date});

var payments = mongoose.model('payments', {studentId: {type: Schema.Types.ObjectId, ref: 'students'}, received:Number,receivedDate:Date});

// var expenses = mongoose.model('expenses', {paidTo:String, paid:Number,payDate:Date,comment:String,expenseType:String});

var comments = mongoose.model('comments', {studentId: {type: Schema.Types.ObjectId, ref: 'students'}, comment:String,commentDate:Date});

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// new Date('2019-09-16T18:30:00.000Z').toLocaleString("en-US", {timeZone: "Asia/Kolkata"})

// {"student": "Name", "mobile":9884343492, "email":"s.seshachalam@gmail.com","course":"MERN","fee":25000,"received":10000,"status":"Pending","dueDate":"07/31/2019"}
app.post('/addStudent', function (req, res) {
  let student=new students(req.body);
  student.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
      let today = new Date(); 
      let payment=new payments({"studentId":mongoose.Types.ObjectId(data._id),"received":student.received,"receivedDate":today});
      payment.save(function (err) {      
        res.send('Student Added');
      })
    }
  });  
})

//{"paidTo":"Sesh", "paid":"10000","payDate":"05/31/2019","comment":"Trainer fee for MERN - RP","expenseType":"Trainer Payment"}
app.post('/addExpense', function (req, res) {
  let expense=new expenses(req.body);
  expense.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
        res.send('Expense Added');
    }
  });  
})

app.get('/',function(req,res){res.send('test');});

app.post('/addCandidate', function (req, res) {
  let candidate=new candidates(req.body);
  candidate.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
        res.send('Candidate Added');
    }
  });  
})

// // {"name":"","filter":"all","orderBy":{"payDate":1},"page":1,"rows":1}	
// app.post('/getExpenses', function (req, res) {
//   let query=req.body.name==undefined?'':req.body.name;
//   let options={paidTo:{ $regex:query, $options: 'i'}},sortBy={payDate:1};
//   let dueDate='';
//   if(req.body.filter=='default'){
//     options['dueDate']={ $exists: true };
//   }
//   console.log(options)
//   if(req.body.orderBy) sortBy=req.body.orderBy;

//   expenses.find(options).sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
//     expenses.find(options).sort(sortBy).count().exec(function (err, count) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send({count:count,data:data})
//     }
//     });
//   });  
// })


// {"name":"","filter":"all","orderBy":{"student":1},"page":2,"rows":2}	
app.post('/getCandidates', function (req, res) {
  let query=req.body.name==undefined?'':req.body.name;
  let options={student:{ $regex:query, $options: 'i'}},sortBy={dueDate:1};
  let dueDate='';
  if(req.body.filter=='default'){
    options['dueDate']={ $exists: true };
    // sortBy={dueDate:1}
  }

  if(req.body.orderBy) sortBy=req.body.orderBy;

  candidates.find(options).sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
    candidates.find(options).sort(sortBy).count().exec(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.send({count:count,data:data})
    }
    });
  });  
})

// {"name":"","filter":"all","orderBy":{"student":1},"page":2,"rows":2}	
app.post('/getStudents', cors(corsOptions),function (req, res) {
  let query=req.body.name==undefined?'':req.body.name;
  let options=req.body.options,sortBy={dueDate:1};
  let dueDate='';
  if(req.body.filter=='default'){
    options['dueDate']={ $ne: null };
    // sortBy={dueDate:1}
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
  //console.log(options);
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
  //console.log(options);
  if(req.body.orderBy) sortBy=req.body.orderBy;
  enqs.find(options,'_id name mobile email course source location assignedto status dueDate').sort(sortBy).skip(req.body.rows*(req.body.page-1)).limit(req.body.rows).exec(function (err, data) {
    enqs.find(options).sort(sortBy).count().exec(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      res.send({count:count,data:data,header: {_id:'UID',name: 'String', mobile:'String', email:'String',course:'String',source:'String',location:'String',assignedto:'String',status:'String',dueDate:'Date'}}) 
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
// {"payment.mode":"Paytm","payment.date":{$gte : "2019-06-20"}
// a[0].payment.filter((x)=>{return (new Date(x.date) <= new Date('2019-06-30'))}).filter((x)=>{return (new Date(x.date) >= new Date('2019-06-01'))});
//d=a.concat(b)
//sum=0;d.forEach((i)=>{sum=Number(i.payment)+sum})
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
  //console.log(body);
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
//{"student":"5cfa30db7936a36cf1d82ce9"}
app.post('/getPayments', function (req, res) {
  let query=req.body.student;
  payments.find({studentId:mongoose.Types.ObjectId(query)},function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  });  
});

//{"student":"5cfa89708b53ecdc89b51585"}
app.post('/getComments', function (req, res) {
  let query=req.body.student;
  comments.find({studentId:mongoose.Types.ObjectId(query)},function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  });  
});

// {"studentId":"5cfa30db7936a36cf1d82ce9","received":10000,"receivedDate":"06/07/2019"}
app.post('/addPayment', function (req, res) {
  let payment=new payments(req.body);
  payment.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      //console.log(payment.studentId);
      students.updateOne({ _id:mongoose.Types.ObjectId(payment.studentId)},{$inc: {received:Number(payment.received)}},function (err, data) {
        if (err){return console.error(err);}
        else{
          res.send(Data)
        }
      });      
      
    }
  }); 
})

// {"studentId":"5cfa30db7936a36cf1d82ce9","received":10000,"receivedDate":"06/07/2019"}
app.post('/addComment', function (req, res) {
  let comment=new comments(req.body);
  //console.log(comment)
  comment.save(function (err,data) {
    if (err) {
      console.log(err);
    } else {
          res.send(data)
    }
  }); 
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
