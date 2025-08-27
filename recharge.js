const networkInp = document.querySelector("#network-select");
const amountInp = document.getElementById("amount-select");
const generatePin = document.querySelector("#codegenerate");
const PinInp = document.querySelector("#inputPin");
const cardDisplay = document.querySelector("#display");

let rechargeArray = [];

generateRand.addEventListener("click", () => {
  generatePin.value = Math.floor(Math.random() * 100000000000);
});

savebtn.addEventListener("click", () => {
  let networkLine = {
    MTN: "*555*",
    Glo: "*123*",
    Airtel: "*126*",
    "9Mobile": "*236*",
  };
  if (
    networkInp.value == "" &&
    amountInp.value == "" &&
    generatePin.value == ""
  ) {
    alert("Error! select all fields");
  } else if (networkInp.value == "") {
    alert("Select Network!");
  } else if (amountInp.value == "") {
    alert("Select Amount!");
  } else if (generatePin.value == "") {
    alert("Code not Generated!");
  } else {
    rechargeArray.push({
      network: networkInp.value,
      amount: amountInp.value,
      pin: generatePin.value,
      rechCode: `${networkLine[networkInp.value]}${generatePin.value}#`,
      Status: "Not Used",
      date: new Date().toLocaleDateString(),
      dateUsed: "Not yet Used",
      delete: "Delete",
    });

    DisplayObjects();
    clearFields();
  }

  //   console.log(rechargeArray);
});

function clearFields() {
  networkInp.value = "";
  amountInp.value = "";
  generatePin.value = "";
}

function DisplayObjects() {
  cardDisplay.innerHTML = "";
  rechargeArray.forEach((val, ind) => {
    let tr = document.createElement("tr");
    tr.className = "border";
    tr.innerHTML = `<td class = "px-3 py-2 text-xl font-medium">${ind + 1}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.network}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.amount}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.pin}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.rechCode}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.Status}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.date}</td>
    <td class = "px-3 py-2 text-xl font-medium">${val.dateUsed}</td>
    <button onclick="deleteObject(${ind})" class =  "px-3 my-2 bg-red-700 mx-2 text-center rounded-xl py-1 text-xl font-medium">${
      val.delete
    }</button>`;

    cardDisplay.appendChild(tr);
  });
}

function deleteObject(del) {
  rechargeArray.splice(del, 1);
  DisplayObjects();
}

cardRecharge.addEventListener("click", () => {
  let enteredPin = PinInp.value;
  let card = rechargeArray.find(
    (search) => search.rechCode === enteredPin.trim()
  );
  console.log(card);

  if (card) {
    if (card.Status == "Used") {
      alert("Recharge card has already been Used!");
    } else {
      alert("Recharge succesful!");
      card.Status = "Used";
      card.dateUsed = new Date().toLocaleDateString();
    }
  } else {
    alert("Recharge card not valid!!!");
  }

  DisplayObjects();
});
