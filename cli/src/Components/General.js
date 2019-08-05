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
    let month=date.getMonth()+1;
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

  export const courses=["AWS Training", "Alteryx", "Android", "Angular 7", "Angular JS", "Artificial Intelligence", "Automation Anywhere", "Automation Testing", "Aws Sysops", "Azure Architecture", "Azure DevOps", "Azure Developer", "Azure Infra Structure", "Big Data", "Big Data Analytics", "BlockChain", "Blue Prism", "C&C++", "CCIE", "CCNA Security", "CCNA Swtiching and Routing", "CCNP Security", "CCNP Swtiching and Routing", "Chatbots using python", "Coded UI", "Core Java", "Cyber Security", "Data Analytics", "Data Science", "Data Science Using Python", "Data Science Using R", "Data Structure & Algorithm", "Datastage", "Deep Learning Using Python", "Devops", "Django", "DotNet", "ETL Testing", "Ethical Hacking", "Full Stack", "GO Language", "Google Cloud", "Hadoop", "Hibernate", "IOT", "IOT Using Python", "Informatica", "Informatica MDM", "J2EE", "Java", "Java Script", "Jmeter", "Linux", "LoadRunner", "MEAN Stack", "MERN Stack", "MVC", "Machine Learning Using R", "Machine learning Using Python", "Manual Testing", "Networking", "Node JS", "Oracle", "Other", "PHP", "PLSQL", "Pega", "Power BI", "Pyspark", "Python", "QTP", "QlikSense", "QlikView", "RPA", "React Js", "SQL", "Salesforce", "Salesforce Admin", "Salesforce Developer", "Selenium with C#", "Selenium with Java", "Selenium with Python", "Software Testing", "Spark and Scala", "Spring", "Struts", "Tableau", "UI Developer", "UNIX Shell", "UiPath", "Vue Js", "Web Designing", "Web Development", "iOS"];

  export const batches = ['Weekday', 'Weekends'];

  export const emps=['Ramya','Ram','Divya','Aarti','Bharath'];

  export const sources = ['Walkin', 'Google', 'Sulekha', 'UrbanPro', 'Direct Call', 'Direct Email', 'Reference']