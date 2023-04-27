const currentTime = document.querySelector("h1");
const content = document.querySelector(".content")
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button")

let alarmTime;
let ringtone = new Audio("sound\alarma-good-morning-5-5.mp3")

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i; //Operador ternario para agregar un cero delante de los números menores a 10. de lo contrario, i se mantiene igual.
    let option = `<option value="${i}">${i}</option>`; //Uso temmplate literals, i representa cada opción de un elemento select
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);//se inserta option como el segundo hijo del primer elemento select del documento utilizando el método insertAdjacentHTML() con el argumento "afterend"
    //con el argumetno afterend se inserta como un hermano después de elemento en el mismo nivel de jerarquía en el DOM.
}

for(let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
    //Datos de horas, minutos y segundos
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if (h >= 12){           //Si h es mayor o igual que 12 devuelve PM
        ampm = "PM";
        h -= 12;
    }

h = h == 0 ? h = 12 : h; //En caso de que hora sea 0, cambiara a 12

// Si hs, min o seg son menores que 10 se agrega un 0.
h = h < 10 ? "0" + h : h;
m = m < 10 ? "0" + m : m;
s = s < 10 ? "0" + s : s;

currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    // tomamos los datos de hs, min, seg y seleccionamos su valor.
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

    if (time.includes("Hora") || time.includes("Minutos") || time.includes("AM/PM")){ 
        return alert("Debes ingresar una hora para activar alarma.");
    }
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Desactivar Alarma"
}

setAlarmBtn.addEventListener("click", setAlarm);




