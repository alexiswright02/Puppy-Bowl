// === ENDPOINTS ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2503-example"; //replace with name if i can get it to work
const API = BASE + COHORT;

// === STATE ===
let puppies = [];
let selectedPuppy = {};

// === ASYNC FUNCTIONS ===

//1. getPuppies
async function getPuppies() {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    puppies = result.data.players;
    render();
  } catch (error) {
    console.log(error);
  }
}

//2. getSelectedPuppy
async function getSelectedPuppy(id) {
  try {
    const response = await fetch(API + "/players/" + id);
    const result = await response.json();
    selectedPuppy = result.data.player;
    render();
  } catch (error) {
    console.log(error);
  }
}

//3. removePuppy
async function removePuppy(id) {
  try {
    await fetch(API + "/players/" + id, {
      method: "DELETE",
    });
    selectedPuppy = undefined;
    getPuppies();
  } catch (error) {
    console.log(error);
  }
}

//4. addNewPuppy
async function addNewPuppy(puppyData) {
  try {
  } catch (error) {
    console.log(error);
  }
}

//=== COMPONENT FUNCTIONS ===

//1. Full Roster
function roster() {
  const $ul = document.createElement("ul");
  $ul.classList.add("roster");
  const $puppies = puppies.map((puppy) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
      <a href="#details">
        <figure class='avatar'>
          <img src="${puppy.imageUrl}" alt="${puppy.name}"/>
        </figure>
          <span class='name'>${puppy.name}</span>
      </a>
      `;
    $li.addEventListener("click", () => getSelectedPuppy(puppy.id));
    return $li;
  });
  $ul.replaceChildren(...$puppies);
  return $ul;
}

//2. Selected Puppy Details + Remove Button
function puppyDetails() {
  if (!selectedPuppy || !selectedPuppy.id) {
    const $p = document.createElement("p");
    $p.textContent = "Select a puppy to see more details!";
    return $p;
  }
  const $details = document.createElement("section");
  $details.classList.add("details");
  $details.innerHTML = `
  <figure>
  <img 
  src="${selectedPuppy.imageUrl}" 
  alt="Picture of ${selectedPuppy.name}"/>
  </figure>
  <div>
    <dl class='text'>
      <div class='selectedName'>
        <dd>${selectedPuppy.name}</dd>
      </div>
      <div>
        <dt>ID:</dt>
        <dd>${selectedPuppy.id}</dd>
      </div>
      <div>
        <dt>Breed:</dt>
        <dd>${selectedPuppy.breed}</dd>
      </div>
      <div>
        <dt>Status:</dt>
        <dd>${selectedPuppy.status}</dd>
      </div>
      <button>Remove Player</button>
    </dl>
  </div>
  `;
  const $deleteButton = $details.querySelector("button");
  $deleteButton.addEventListener("click", () => removePuppy(selectedPuppy.id));
  return $details;
}

//3. New Puppy Submission Form

//=== RENDERING FUNCTIONS ===

//1. Renders each component functions to the index page
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Puppy Bowl Roster</h1>
  <main>
    <section id='roster'>
    <h2>Puppies</h2>
    <Puppies></Puppies>
    </section>
    <section id='details'>
    <h2>Selected Puppy</h2>
    <SelectedPuppy></SelectedPuppy>
    </section>
  </main>
  `;
  $app.querySelector("Puppies").replaceWith(roster());
  $app.querySelector("SelectedPuppy").replaceWith(puppyDetails());
}

//=== INITIALIZATION ===

//1. invoke getPuppies function
async function init() {
  await getPuppies();
  render();
}

//2. invoke init function
init();
