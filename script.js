const activities = [
    "Wake Up",
    "Breakfast",
    "Start Study/Work",
    "Lunch",
    "Free Time / Hobbies",
    "Dinner",
    "Go to Sleep"
];

// Default startup positions for sliders (in minutes from midnight)
const defaultValues = [360, 480, 540, 780, 1020, 1200, 1320];

let userTimes = [];

// Converts total minutes (0 - 1439) into a 12-hour AM/PM string
function convertMinutesTo12Hour(totalMinutes) {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
}

// Updates the big bold text above the slider while dragging
function updatePreview(stepNum) {
    const sliderVal = document.getElementById('slider' + stepNum).value;
    document.getElementById('preview' + stepNum).innerText = convertMinutesTo12Hour(sliderVal);
}

function nextStep(currentStepNum) {
    const currentSliderVal = document.getElementById('slider' + currentStepNum).value;
    userTimes.push(convertMinutesTo12Hour(currentSliderVal));
    
    document.getElementById('step' + currentStepNum).classList.remove('active');
    document.getElementById('step' + (currentStepNum + 1)).classList.add('active');
}

function generateSchedule() {
    const lastSliderVal = document.getElementById('slider' + 6).value;
    userTimes.push(convertMinutesTo12Hour(lastSliderVal));

    document.getElementById('step6').classList.remove('active');
    document.getElementById('finalStep').classList.add('active');

    const displayArea = document.getElementById('scheduleDisplay');
    displayArea.innerHTML = ""; 

    for (let i = 0; i < activities.length; i++) {
        displayArea.innerHTML += `
            <div class="schedule-item">
                <span class="time-tag">${userTimes[i]}</span> - ${activities[i]}
            </div>
        `;
    }
}

function restart() {
    userTimes = [];
    
    for (let i = 0; i < activities.length; i++) {
        const slider = document.getElementById('slider' + i);
        slider.value = defaultValues[i];
        document.getElementById('preview' + i).innerText = convertMinutesTo12Hour(defaultValues[i]);
    }
    
    document.getElementById('finalStep').classList.remove('active');
    document.getElementById('step0').classList.add('active');
}
