const grid = document.querySelector(".grid");
const gridSizeBtns = document.querySelectorAll(".grid-btn");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#range-value");
const customGridBtn = document.querySelector(".custom-grid-btn");
const colorEl = document.querySelector("#color");
const colorValue = document.querySelector("#color-value");
const colorBtn = document.querySelector(".color-btn");
const randomColorBtn = document.querySelector(".random-color-btn");
const randomWarmColorBtn = document.querySelector(".random-warm-color-btn");
const randomColdColorBtn = document.querySelector(".random-cold-color-btn");
const randomPastelColorBtn = document.querySelector(".random-pastel-color-btn");
const IncrementallyDarken = document.querySelector('.incrementally-darken-btn')
const allSizeBtns = document.querySelectorAll('.size')
const allColorBtns = document.querySelectorAll('.colors')
const clearBtn = document.querySelector(".clear")

// Making grid appear
function makeGrid(rows, cols) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
  }
}

makeGrid(100, 100);
const grids = document.querySelectorAll(".grid-item");

// Button grid-size selection
gridSizeBtns.forEach((button) => {
  button.addEventListener("click", (row, col) => {
    row = button.value;
    col = button.value;
    makeGrid(row, col);
    grids.forEach((grid)=>{
      grid.style.backgroundColor = 'white'
    })
  });
  
});

//Cutom grid size selection
sliderValue.textContent = slider.value;
slider.oninput = function () {
  sliderValue.innerHTML = this.value;
};

customGridBtn.addEventListener("click", () => {
  row = slider.value;
  makeGrid(row, row);
});

//Making colors works

colorValue.textContent = colorEl.value;
colorEl.oninput = function () {
  colorValue.textContent = this.value;
};

//default color
grids.forEach((grid) => {
  grid.addEventListener("mouseover", () => {
    grid.classList.add("color");
  });
});

//Picking Custom color
colorBtn.addEventListener("click", () => {
  let color = colorEl.value;
  grids.forEach((grid) => {
    grid.addEventListener("mouseover", () => {
      grid.style.setProperty("background-color", color);
    });
  });
});

//Picking random color
randomColorBtn.addEventListener("click", () => {
  grids.forEach((grid) => {
    const randColor = () => {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase()
      );
    };
    const randomColor = randColor();
    grid.addEventListener("mouseover", () => {
      grid.style.setProperty("background-color", randomColor);
    });
  });
});

//Picking random specialized colors
const getRandomNumber = (upperlimit, lowerlimit) => {
  return Math.floor(Math.random() * lowerlimit + upperlimit);
};

randomWarmColorBtn.addEventListener("click", () => {
  grids.forEach((grid)=>{
    grid.addEventListener('mouseover', ()=>{
      const h = getRandomNumber(0, 65);
      const randomColor = `hsl(${h}deg, 90%, 60%)`;
      grid.style.backgroundColor = randomColor;
    })
  })
});

randomColdColorBtn.addEventListener("click", () => {
  grids.forEach((grid)=>{
    grid.addEventListener('mouseover', ()=>{
      const h = getRandomNumber(70, 180);
      const randomColor = `hsl(${h}deg, 70%, 70%)`;
      grid.style.backgroundColor = randomColor;
    })
  })
});

randomPastelColorBtn.addEventListener("click", () => {
  grids.forEach((grid)=>{
    grid.addEventListener('mouseover', ()=>{
      const h = getRandomNumber(0, 360);
      const randomColor = `hsl(${h}deg, 90%, 90%)`;
      grid.style.backgroundColor = randomColor;
    })
  })
});

// Incrementally Darken functionality.
IncrementallyDarken.addEventListener('click', ()=>{
  grids.forEach((grid)=>{
    let l = 90;
    let color = `hsl(360deg, 10%, ${l}%)`;
    grid.addEventListener('mouseover', ()=>{
      if (grid.style.backgroundColor && l > 0){
        l = l - 10;
        color = `hsl(360deg, 10%, ${l}%)`;
        grid.style.backgroundColor = color
      } else {
        grid.style.backgroundColor = color
      }
    })

  })
})

//Active button selection
function removeActive(element){
  element.forEach((tgt)=>{
    tgt.style.removeProperty('border')
  })
  
}
function setActive(element){
  element.style.setProperty('border', "2px solid gold")
}

allSizeBtns.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    removeActive(allSizeBtns)
    setActive(btn)
  })
})

allColorBtns.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    removeActive(allColorBtns)
    setActive(btn)
  })
})

// Clear Button Function
clearBtn.addEventListener('click', ()=>{
  grids.forEach((grid)=>{
    grid.style.backgroundColor = 'white'
  })
})