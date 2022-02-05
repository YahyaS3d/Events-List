let newData = data;
const currentDate = new Date();
const currentDateObject = {
    year: parseInt(currentDate.getFullYear()),
    month: parseInt(currentDate.getMonth() + 1),
    day: parseInt(currentDate.getDate())
}
//fill a new array with parsing date
for (let i = 0; i < newData.length; i++) {
    let arr = new Array(5);
    arr[0] = parseInt(newData[i].date.split("/")[0]);//day
    arr[1] = parseInt(newData[i].date.split("/")[1]);//months 
    arr[2] = parseInt(newData[i].date.split("/")[2]);//year
    arr[3] = parseInt(newData[i].time.split(":")[0]);//hours
    arr[4] = parseInt(newData[i].time.split(":")[1]);//minutes
    newData[i].array = arr;
}
//sorting new array accroding to date
newData.sort((x, y) =>
    x.array[4] - y.array[4]
);
newData.sort((x, y) =>
    x.array[3] - y.array[3]
);
newData.sort((x, y) =>
    x.array[0] - y.array[0]
);
newData.sort((x, y) =>
    x.array[1] - y.array[1]
);
newData.sort((x, y) =>
    x.array[2] - y.array[2]
);
//checking if the date is today
for (let h = 0; h < newData.length; h++) {
    if (newData[h].array[2] === currentDateObject.year && newData[h].array[1] === currentDateObject.month && newData[h].array[0] === currentDateObject.day) {
        newData[h].date = "Today";
    } else {
    }
}
//deleteing the new array which we added to sort the main array 
for (let j = 0; j < newData.length; j++) {
    delete newData[j].array
}
//data now is sorted 
data = newData;
let p = 0;
const content = document.getElementById("content");
while (p < data.length) {
    let container = document.createElement("div");
    container.className = "container";
    content.append(container);
    container.innerHTML = (`<div class="date">
<div class="day">${data[p].date} 
    <div class="time">${data[p].time}</div>
</div>
</div>
<div class="info">
<div class="title">${data[p].title}</div>
<div class="description">${data[p].description}</div>
</div>
<div class="put"><button id="press-${p}" class="btn">+Add to Calendar</button></div>
</div>
`);
    p++;
}
//add to local storage when click on ("Add to Calendar") button
$("button").click(function () {
    let pressed = parseInt(this.id.split("-")[1]);
    AddTolocalStorage(data[pressed].date, data[pressed].time, data[pressed].title, data[pressed].description)
    
});
function AddTolocalStorage(date, time, title, description) {
    const info = {
        date: date,
        time: time,
        title: title,
        description: description
    }
    let Events = [];
    const jsonArray = localStorage.getItem("Events");
    if (jsonArray) {
        Events = JSON.parse(jsonArray);
    }
    Events.push(info);
    localStorage.setItem("Events" , JSON.stringify(Events));
    return info;

}







