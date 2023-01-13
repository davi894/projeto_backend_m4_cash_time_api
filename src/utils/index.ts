
function calculateTime(time1: number[], time2: number[], op: string = "sum"): string {
    
    let minutes1 = time1[0] * 60 + time1[1];
    let minutes2 = time2[0] * 60 + time2[1];
    let operator: number

    if(op === "dif"){
        let operator = Math.abs(minutes2 - minutes1);
    } else {
        let operator = Math.abs(minutes2 + minutes1);
    }

    let hours = Math.floor(operator / 60);
    let minutes = operator % 60;
    return `${hours}:${minutes}`;
}

function splitHour(pHour: string): number[] {
    const splitedhour = pHour.split(":");
  const hour = parseInt(splitedhour[0]);
  const minutes = parseInt(splitedhour[1]);
  return [hour, minutes]
}

export {calculateTime, splitHour}  