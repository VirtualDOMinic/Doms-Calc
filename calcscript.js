const display = document.getElementById("display"),
  keys = document.getElementById("keys");

let btnPressArr = [];
var memVal = 0;

var opAllowed = "false"; // making it a string for now, so I can have "true", "false", "false-op" or "false-decimal"

keys.addEventListener("click", function(e) {
  let btn = e.target; // event listener, btn is assigned to the element clicked e.g. <span class="button num" id="three">3</span>

  // 1- Actions when pressing number keys (including decimal)
  if (btn.className.indexOf("num") !== -1) {
    // Clear the "zero" display
    if (display.innerHTML === "0" || display.innerHTML === 0) {
      display.innerHTML = "";
    }

    // If there's a value in memory, erase it from there and the array of buttons pressed
    if (btnPressArr.length === 1 && btnPressArr[0] == memVal) {
      btnPressArr.length = 0;
      memVal = 0;
      display.innerHTML = "";
    }
    // decimal logic, followed by number logic
    if (btn.id === "decimal") {
      let dec = ".";

      // Logic for multiple decimal points
      if (opAllowed === "false-decimal") {
        console.log("cannot enter multiple points");
      } else {
        display.innerHTML += dec;
        memVal = 0;
        btnPressArr.push(dec);
        opAllowed = "false-decimal";
      }
    } else {
      let num = btn.innerText;
      memVal = 0;
      display.innerHTML += num;
      btnPressArr.push(num);
      if (opAllowed !== "false-decimal") {
        opAllowed = "true";
      }
      // change opAllowed logic to account for multiple decimals in numbers (not allowed) but new decimals allowed after an operation (or throw/display error in response to multiple dec point nums)
    }
  }

  // 2- Actions when pressing "equals"
  else if (btn.id === "equals") {
    if (opAllowed === "false-decimal") {
      if (btnPressArr[btnPressArr.length - 1] !== ".") {
        opAllowed = "true";
      }
    }

    if (opAllowed === "true") {
      memVal = eval(btnPressArr.join(""));
      //   display.innerHTML = memVal;
      display.innerHTML = parseFloat(memVal.toFixed(7));
      btnPressArr.length = 0;
      btnPressArr.push(memVal);
    }
  }

  // 3- Actions when pressing "clear"
  else if (btn.id === "clear") {
    display.innerHTML = 0;
    btnPressArr.length = 0;
    memVal = 0;
    opAllowed = "false";
  }

  //Actions when pressing "operator" keys
  else if (btn.className.indexOf("operator") !== -1) {
    if (opAllowed === "false") {
      console.log("Invalid use of operator");
    } else if (opAllowed === "false-decimal") {
      if (btnPressArr[btnPressArr.length - 1] !== ".") {
        opAllowed = "true";
      }
    }

    if (opAllowed === "false-op") {
      // replace last operator with latest one
      btnPressArr.pop();
      btnPressArr.push(btn.innerText);
      console.log(btn.id);
    } else if (opAllowed === "true") {
      let op = btn.innerText;
      display.innerHTML = "";
      btnPressArr.push(op);
      opAllowed = "false-op";
    }
  }
});
