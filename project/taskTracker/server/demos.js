import schedule from 'node-schedule';


const date = new Date(2023, 12, 4, 12, 27, 5);
// console.log(date)

// const job = schedule.scheduleJob(date, function(){
  const job = schedule.scheduleJob("Task1",date, function(){
//u can also add the job name
  console.log('The world is going to end today.');
}); 
console.log(schedule.scheduledJobs)

schedule.cancelJob("Task1");
console.log("After cancel the job ============")
console.log(schedule.scheduledJobs)
