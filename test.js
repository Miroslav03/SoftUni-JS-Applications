function solve(arr){
    const examHour = Number(arr[0]);
    const examMinute = Number(arr[1]);
    const arriveHour = Number(arr[2]);
    const arriveMinute = Number(arr[3]);
 
    const personMin = arriveHour*60 + arriveMinute;//590
    const examMin = examHour*60 + examMinute;//570
    debugger
    if((examMin - personMin) < 0 ){
        console.log('Late');
        const min = ((examMin - personMin)*-1)%60
        if((examMin - personMin) <= - 60){
            if(min<10){
                console.log(`${Math.trunc((examMin - personMin)/60)*-1}:0${min} hours after the start`);
            }else{
                console.log(`${Math.trunc((examMin - personMin)/60)*-1}:${min} hours after the start`);
            }
        }else{
            console.log(`${min} minutes after the start`);
        }
    }else if((examMin - personMin) > 30){
        console.log('Early');
        const min = ((examMin - personMin))%60
        if((examMin - personMin) >=  60){
            if(min<10){
                console.log(`${Math.trunc((examMin - personMin)/60)}:0${min}hours before the start`);
            }else{
                console.log(`${Math.trunc((examMin - personMin)/60)}:${min}hours before the start`);
            }
        }else{
            console.log(`${min} minutes before the start`);
        }
    }else {
        console.log('On Time');
        const min = ((examMin - personMin))%60
        console.log(`${min} minutes before the start`);
    }
}
solve(["16",
"00",
"15",
"00"])

