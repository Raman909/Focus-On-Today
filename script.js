const checkBoxList = document.querySelectorAll('.checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const appContainer = document.querySelector('.app-container');
const progressValue = document.querySelector('.progress-value');
const quote = document.querySelector('.quote');

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
];

// Load from localStorage or initialize
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

// Set input values and classes on page load
inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed');
    }
  }
});

// Calculate initial progress
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.querySelector('span').innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
quote.innerText = allQuotes[completedGoalsCount];

// Handle checkbox click
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    const allGoalsFilled = [...inputFields].every((input) => input.value);

    if (!allGoalsFilled) {
      appContainer.classList.add('show-error');
      return;
    }

    const input = checkbox.parentElement.querySelector('.goal-input');
    const inputId = input.id;

    checkbox.parentElement.classList.toggle('completed');

    // Toggle goal completion
    if (!allGoals[inputId]) {
      allGoals[inputId] = {
        name: input.value,
        completed: true,
      };
    } else {
      allGoals[inputId].completed = !allGoals[inputId].completed;
    }

    // Update progress
    completedGoalsCount = Object.values(allGoals).filter(
      (goal) => goal.completed
    ).length;

    progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
    progressValue.querySelector('span').innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
    quote.innerText = allQuotes[completedGoalsCount];

    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});

// Handle input events
inputFields.forEach((input) => {
  input.addEventListener('focus', () => {
    appContainer.classList.remove('show-error');
  });

  input.addEventListener('input', () => {
    const inputId = input.id;

    if (allGoals[inputId] && allGoals[inputId].completed) {
      input.value = allGoals[inputId].name;
      return;
    }

    if (!allGoals[inputId]) {
      allGoals[inputId] = {
        name: input.value,
        completed: false,
      };
    } else {
      allGoals[inputId].name = input.value;
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});
