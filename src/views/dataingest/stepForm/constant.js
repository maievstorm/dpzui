export const datatypes = [
    {
        key: 'storage',
        name: 'Lưu trữ đám mây'
    },
    {
        key: 'dwh',
        name: 'Kho dữ liệu'
    },
    {
        key: 'bigdata',
        name: 'Dữ liệu lớn'
    }
    ,
    {
        key: 'sqlserver',
        name: 'Microsof Sql'
    }
    ,
    {
        key: 'azuresql',
        name: 'Azure SQL'
    },
    {
        key: 'oracle',
        name: 'Oracle'
    }
    ,
    {
        key: 'mysql',
        name: 'MySQL'
    }
    ,
    {
        key: 'postgres',
        name: 'PostgresSQL'
    }


]
export const scheduletypes = [
    {
        key: 'None',
        name: 'None'
    },
    {
        key: '@once',
        name: 'Một lần'
    },
    {
        key: '@hourly',
        name: 'Hằng giờ'
    },
    {
        key: '@daily',
        name: 'Hằng ngày'
    },
    {
        key: '@weekly',
        name: 'Hằng tuần'
    },
    {
        key: '@monthly',
        name: 'Hằng tháng'
    }


]
export const writemodetype = [
    {
      key: 'append',
      name: 'append'
    },
    {
      key: 'overwrite',
      name: 'overwrite'
    }
  ]
  export  const processTime = (time,Schedule) =>{
    let minus = time.getMinutes()
    // let year = time.getFullYear()
    // let month = time.getMonth()
    let day = time.getDay()
    let hours = time.getHours()
    let date = time.getDate()
    let crontab_struct =  'None'
    if(Schedule === '@hourly'){
      crontab_struct = `${minus} * * * *`
    }
    else if(Schedule === '@daily'){
      crontab_struct = `${minus} ${hours} * * *`
    }
    else if(Schedule === '@weekly'){
      crontab_struct = `${minus} ${hours} * * ${day}`
    }
    else if(Schedule === '@monthly'){
      crontab_struct = `${minus} ${hours} ${date} * *`
    }
    return crontab_struct    
  }