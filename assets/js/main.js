/*
|--------------------------------------------------------------------------
| create the pixi app
|--------------------------------------------------------------------------
*/

//let animationState = "idle";
let animationState = "Clic_idle";
const app = new PIXI.Application({
  backgroundAlpha: 0,
  width: 300,
  height: 300,
});
document.getElementById("chatProfessor").appendChild(app.view);

/*
|--------------------------------------------------------------------------
| load spine data SPINE VERSION 3.8
|--------------------------------------------------------------------------
*/
app.loader
  .add("professor", "spines/professor/Professor_Spine.json")
  .load(onAssetsLoaded);
app.stage.interactive = true;

/*
|--------------------------------------------------------------------------
| assets loaded, start the animation
|--------------------------------------------------------------------------
*/

function onAssetsLoaded(loader, res) {
  const professorSpine = new PIXI.spine.Spine(res.professor.spineData);

  // scale and position the spine
  professorSpine.x = app.screen.width / 2;
  professorSpine.y = app.screen.height;
  professorSpine.scale.set(0.12);

  // position the professor
  app.stage.position.x = 50;
  app.stage.position.y = 80;
  app.stage.addChild(professorSpine);

  // @AnimationsNames ['Clic', 'Clic_idle', 'idle', 'Volta'];
  const loopAnimations = ["idle", "Clic_idle"];

  // default animation started
  addButtons("0");
  setAnimation(animationState, professorSpine, loopAnimations);

  /*
  |--------------------------------------------------------------------------
  | Animation state change
  |--------------------------------------------------------------------------
  */
  document.querySelector("canvas").addEventListener("click", () => {
    // DISABLE CLICKS
    document.addEventListener("click", disableEvents, true);

    if (animationState == "idle") {
      // STEP 1: idle -> Clic
      animationState = "Clic";
      addButtons("700");
      setAnimation(animationState, professorSpine, loopAnimations);

      // STEP 2: Clic -> Clic_idle
      animationState = "Clic_idle";
      setAnimation(animationState, professorSpine, loopAnimations, "1900");
    } else {
      // STEP 3: Clic_idle -> Volta
      removeButtons("500");
      animationState = "Volta";
      setAnimation(animationState, professorSpine, loopAnimations);

      // STEP 4: Volta -> idle
      animationState = "idle";
      setAnimation(animationState, professorSpine, loopAnimations, "1000");
    }

    // ENABLE CLICKS
    setTimeout(function () {
      document.removeEventListener("click", disableEvents, true);
    }, 2000);
  });
}

function setAnimation(animationName, spine, loopAnimations, time = 0) {
  setTimeout(() => {
    spine.state.setAnimation(
      0,
      animationName,
      loopAnimations.includes(animationName)
    );
  }, time);
  console.log("Animation Name Active: " + animationState);
}

function addButtons(time = 700) {
  const buttons = document.getElementById("chat-professor-buttons");
  let buttonsBox = document.querySelector(".chat-professor-button");
  //buttonsBox.classList.toggle("animate__fadeInDown");

  setTimeout(() => {
    buttons.innerHTML = `
      <div class="chat-professor-button animate__animated">
        <div class="options">
          <div class="option">
            <div class="option-icon">
             <i class="fa-brands fa-whatsapp"></i>
            </div>
            <div class="option-text">
             <span>whatsapp</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document
      .querySelector(".chat-professor-button")
      .classList.toggle("animate__fadeInDown");
  }, time);
}

function removeButtons(time = 700) {
  const buttons = document.getElementById("chat-professor-buttons");
  document
    .querySelector(".chat-professor-button")
    .classList.toggle("animate__fadeOutUp");
  setTimeout(() => {
    buttons.innerHTML = "";
  }, time);
}

// DISABLE CLICKS
function disableEvents(e) {
  e.stopPropagation();
  e.preventDefault();
}
