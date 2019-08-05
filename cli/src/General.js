export const getDate=(p_header)=>{
    if(p_header===undefined) return;
    let fields = Object.keys(p_header);
    let ret = [];
    for (let i in fields) {
      if ('Date' === p_header[fields[i]]) { ret.push(fields[i]); }
    }
    return ret;
  }
  
  export const dateFormat=(p_data,p_date)=>{
    for(let i in p_date){
    for(let j in p_data){
        if(p_data[j][p_date[i]]){
          p_data[j][p_date[i]]=formatDate(new Date(p_data[j][p_date[i]]));
        }
      }
    }
    return p_data
  }
  
  export const formatDate=(date)=>{
    if(date===null) return null;
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  
  export const getHTMLDate=(date)=>{
    let month=date.getMonth();
    let day=date.getDate();
    if(month<10) month='0'+month; 
    if(day<10) day='0'+day; 
      return date.getFullYear()+'-'+month+'-'+day;
  }

  export const getCookie=(cname)=> {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }