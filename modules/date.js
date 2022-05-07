module.exports=getDate;

function getDate() {
  const time=new Date();
  let options={
    weekday:"long",
    month:"long",
    day:"numeric"
  };
  let day=time.toLocaleDateString("en-US",options);
  return day;
}
