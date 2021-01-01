// State Object
const stateObject = {
    states: [
        { stateId: 'q0 (Durum 0)', northLight: 3, westLight: 1, delay: 0 },
        { stateId: 'q1 (Durum 1)', northLight: 2, westLight: 1, delay: 5000 },
        { stateId: 'q2 (Durum 2)', northLight: 1, westLight: 2, delay: 7000 },
        { stateId: 'q3 (Durum 3)', northLight: 1, westLight: 3, delay: 9000 },
        { stateId: 'q4 (Durum 4)', northLight: 1, westLight: 2, delay: 14000 },
        { stateId: 'q5 (Durum 5)', northLight: 2, westLight: 1, delay: 16000 }
    ]
};

// Dom Elements
const lamps = document.querySelectorAll('.lamp');
const lampsEast = document.querySelectorAll('.lamp2');
const stateText = document.getElementById('state');
const button = document.getElementById('simulate');
const alertElement = document.getElementById('alert');

const colorNames = ['red', 'yellow', 'green'];
const colors = ['#c0392b', '#f1c40f', '#2ecc71'];

const len = stateObject.states.length;
console.log(len);

// Set off times
const offTimes = [];
stateObject.states.forEach(state => {
    offTimes.push(state.delay);
});
offTimes[offTimes.length] = offTimes[offTimes.length - 1] + 2001;
console.log(offTimes);

const stateArr = stateObject.states;
console.log(stateArr);

// Helper functions
function createAlert(alertElement, text, ms) {
    alertElement.innerText = text;
    alertElement.style.display = 'block';
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, ms);
}

let onLights = function (states, index) {
    lamps[states[index].northLight - 1].style.backgroundColor = colors[states[index].northLight - 1];
    lamps[states[index].northLight - 1].style.boxShadow = `0 0 10px 5px ${colors[states[index].northLight - 1]}`;

    console.log(`On : ${states[index].stateId}`);
    stateText.innerText = 'Şuanki Durum : ' + states[index].stateId;

    lampsEast[states[index].westLight - 1].style.backgroundColor = colors[states[index].westLight - 1];
    lampsEast[states[index].westLight - 1].style.boxShadow = `0 0 10px 5px ${colors[states[index].westLight - 1]}`;
}

let offLights = function (states, index) {
    lamps[states[index].northLight - 1].style.backgroundColor = '#121212';
    lamps[states[index].northLight - 1].style.boxShadow = ``;

    console.log(`Off : ${states[index].stateId}`);

    lampsEast[states[index].westLight - 1].style.backgroundColor = '#121212';
    lampsEast[states[index].westLight - 1].style.boxShadow = ``;
}

onLights(stateArr, 0);

// Simulation Button Click Event
button.addEventListener('click', () => {
    startSimulate();
    console.log('Simulasyon başlatıldı.');

    // If you want to run it only once.
    setTimeout(() => {
        onLights(stateArr, 0);
        console.log('Simülasyon sonu, tüm durumlar başarı ile tamamlandı.');
        createAlert(alertElement, 'Simülasyon başarı ile tamamlandı!', 2000);
        button.disabled = false;
        button.style.cursor = 'pointer';
    }, offTimes[offTimes.length - 1]);

    // If you want to run it continuously.
    /*setInterval(() => {
        startSimulate();
    }, offTimes[offTimes.length - 1]);*/ //18001);
});

// startSimulate simulate
let startSimulate = function () {
    createAlert(alertElement, 'Simulasyon başlatıldı.', 2000);
    button.disabled = true;
    button.style.cursor = 'wait';
    for (let i = 0; i < len; i++) {
        setTimeout(function () {
            onLights(stateArr, i);
        }, offTimes[i]);//stateObject.states[i].delay);

        setTimeout(() => {
            offLights(stateArr, i);
        }, offTimes[i + 1]);//stateObject.states[i + 1].delay);
    }
}