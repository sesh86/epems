const initState = {
    options:{name:'',filter:'default',orderBy:{"dueDate":1},page:1,rows:1},
    students:    {"count": 0,"data": [],header:[]},
    student:{dueDate:null,payment:[]},
    expense:{dueDate:null,payment:[]},
    enquiry:{dueDate:null,payment:[]},
    expenses:    {"count": 0,"data": [],header:[]},
    enquiries:    {"count": 0,"data": [],header:[]},
    loading:true
  }
  
  const rootReducer = (state = initState, action) => {
  
  
  if(action.type==='students'){
          return {
            ...state,students:action.name,loading:false
          }
    }
    else   if(action.type==='expenses'){
      return {
        ...state,expenses:action.name,loading:false
      }}
      else   if(action.type==='enquiries'){
        return {
          ...state,enquiries:action.name,loading:false
        }
      
}
    else if(action.type==='loading'){return {...state,loading:true}}
    else if(action.type==='expense'){
      return {...state,expense:action.name}
}    
    else if(action.type==='student'){return {...state,student:action.name}}
    else if(action.type==='enquiry'){return {...state,enquiry:action.name}}
else if(action.type==='updPayment'){
  let loc=state.student;
  loc.dueDate=action.name.dueDate;
  if(action.name.status){
    loc.status=action.name.status;
    loc.payment=action.name.payment;
    loc.received=action.name.received;
  }
  return {
    ...state
    ,student:loc
  }
}

else if(action.type==='updEnq'){
  let loc=state.enquiry;
  loc.dueDate=action.name.dueDate;
    loc.status=action.name.status;
    loc.payment=action.name.payment;
    loc.paid=action.name.paid;
  return {
    ...state
    ,enquiry:loc
  }
}
else if(action.type==='updExpense'){
  let loc=state.expense;
  loc.dueDate=action.name.dueDate;
    loc.status=action.name.status;
    loc.payment=action.name.payment;
    loc.paid=action.name.paid;
  return {
    ...state
    ,expense:loc
  }
}
        
    else if(action.type==='updOption'){
      return {
        ...state
        ,options:action.name
      }
    }
    if(!action.name)
      return state
  }
  
  export default rootReducer
  