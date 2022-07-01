let animationState = "idle";
/*
|--------------------------------------------------------------------------
| create the pixi app
|--------------------------------------------------------------------------
*/

const app = new PIXI.Application({
  transparent: true,
  width: 300,
  height: 300,
});
document.getElementById("chatProfessor").appendChild(app.view);

/*
|--------------------------------------------------------------------------
| load spine data
|--------------------------------------------------------------------------
*/
app.loader
  .add("professor", "professor/3.8/Professor_Spine.json")
  .load(onAssetsLoaded);
app.stage.interactive = true;

/*
|--------------------------------------------------------------------------
| assets loaded, start the animation
|--------------------------------------------------------------------------
*/

function disableEvents(e) {
  e.stopPropagation();
  e.preventDefault();
}

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
  //const singleAnimations = ["idle", "Clic", "Clic_idle", "Volta"];
  //const allAnimations = [].concat(singleAnimations, loopAnimations);
  const loopAnimations = ["idle", "Clic_idle"];
  professorSpine.state.setAnimation(
    0,
    animationState,
    loopAnimations.includes(animationState)
  );

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

  console.log(animationState);
}

function setAnimation(animationName, spine, loopAnimations, time = 0) {
  setTimeout(() => {
    spine.state.setAnimation(
      0,
      animationName,
      loopAnimations.includes(animationName)
    );
  }, time);
}

function addButtons(time = 700) {
  const buttons = document.getElementById("chat-professor-buttons");

  setTimeout(() => {
    buttons.innerHTML = "<b>TESTE</b>";
  }, time);
}

function removeButtons(time = 700) {
  const buttons = document.getElementById("chat-professor-buttons");

  setTimeout(() => {
    buttons.innerHTML = "";
  }, time);
}
