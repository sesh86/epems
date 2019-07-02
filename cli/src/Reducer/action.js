import axios from 'axios';

export const addName = (name) => {
  return {
    type: 'ADD_NAME',
    name
  }
}

export const addDesignation = (designation) => {
  return {
    type: 'ADD_DESIGNATION',
    designation
  }
}

export const addEmp = (name,designation) => {
  return {
    type: 'ADD_EMP',
    name,
    designation
  }
}

export const delEmp = (emp) => {
  return {
    type: 'DEL_EMP',
    emp
  }
}

// export const getUsers = () => {
//   const request = axios.get('https://jsonplaceholder.typicode.com/users');
//   request.then(function(res){
//     callUsers(res.data)
//   })
// }

export const getStudents=(res)=>{
  return {type: 'students',name: res};
}

export const getExpenses=(res)=>{
  return {type: 'expenses',name: res};
}

export const changeLoading=()=>{
  return {type: 'loading'};
}

export const mapDispatchStudents = (dispatch) => {
  return {
    getStudents: (options) =>{
      const request = axios.post('/getStudents',options);
      request.then(function(res){
        dispatch(getStudents(res.data))
      })
    },
    changeLoading:()=>{
      dispatch(changeLoading());
    }
  }
}
export const mapDispatchExpenses = (dispatch) => {
  return {
    getExpenses: (options) =>{
      const request = axios.post('/getExpenses',options);
      request.then(function(res){
        dispatch(getExpenses(res.data))
      })
    },
    changeLoading:()=>{
      dispatch(changeLoading());
    }
  }
}

export const getEnqs=(res)=>{
  return {type: 'enquiries',name: res};
}

export const mapDispatchEnqs = (dispatch) => {
  return {
    getEnqs: (options) =>{
      const request = axios.post('/getEnqs',options);
      request.then(function(res){
        dispatch(getEnqs(res.data))
      })
    },
    changeLoading:()=>{
      dispatch(changeLoading());
    }
  }
}

export const mapDispatchEnquiry = (dispatch) => {
  return {
    getEnq: (options) =>{
      const request = axios.post('/getEnq',options);
      request.then(function(res){
        dispatch(getEnq(res.data))
      })
    },
    updEnq: (options) =>{
        dispatch(updEnq(options))
    }    
  }
}
export const getStudent=(res)=>{
  return {type: 'student',name: res[0]};
}
export const getEnq=(res)=>{
  return {type: 'enquiry',name: res[0]};
}
export const getExpense=(res)=>{
  return {type: 'expense',name: res[0]};
}

export const updExpense=(res)=>{
  return {type: 'updExpense',name: res};
}
export const updEnq=(res)=>{
  return {type: 'updEnq',name: res};
}
export const updPayment=(res)=>{
  return {type: 'updPayment',name: res};
}

export const mapDispatchExpense = (dispatch) => {
  return {
    getExpense: (options) =>{
      const request = axios.post('/getExpense',options);
      request.then(function(res){
        dispatch(getExpense(res.data))
      })
    },
    updExpense: (options) =>{
        dispatch(updExpense(options))
    }    
  }
}

export const mapDispatchStudent = (dispatch) => {
  return {
    getStudent: (options) =>{
      const request = axios.post('/getStudent',options);
      request.then(function(res){
        dispatch(getStudent(res.data))
      })
    },
    updPayment: (options) =>{
        dispatch(updPayment(options))
    }    
  }
}
