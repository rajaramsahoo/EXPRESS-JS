export default function creatRemiders(startDate, endDate){
    const totalDuration = endDate.getTime() - startDate.getTime()
    const r1 = new Date(startDate.getTime() + Math.floor(totalDuration/4));
    const r2 = new Date(startDate.getTime() + Math.floor(totalDuration/2))
    const r3 = new Date(startDate.getTime() + Math.floor(3*(totalDuration/4)))
return [
    r1,r2,r3
]
  
}