function calcHealth() {

  const weight = Number(document.getElementById("weight").value) || 0;    
  const heightCm = Number(document.getElementById("height").value) || 0; 
  const age = Number(document.getElementById("age").value) || 0;        
  const sex = document.getElementById("sex").value;                      
  const activity = Number(document.getElementById("activity").value) || 1.2;


  if (weight <= 0 || heightCm <= 0 || age <= 0) {
    document.getElementById("calResult").innerHTML =
      '<span class="bad">กรุณากรอก น้ำหนัก/ส่วนสูง/อายุ ให้ครบ</span>';
    return;
  }


  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let bmiText = "";
  let bmiClass = "";
  if (bmi < 18.5) { bmiText = "ผอม"; bmiClass = "warn"; }
  else if (bmi < 25) { bmiText = "ปกติ"; bmiClass = "good"; }
  else if (bmi < 30) { bmiText = "อวบ"; bmiClass = "warn"; }
  else { bmiText = "อ้วน"; bmiClass = "bad"; }


  let bmr = 0;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
  }


  const tdee = bmr * activity;


  let msg = "";
  msg += `<div><b>BMI:</b> <span class="${bmiClass}">${bmi.toFixed(1)} (${bmiText})</span></div>`;
  msg += `<div><b>BMR:</b> ${Math.round(bmr)} kcal/วัน</div>`;
  msg += `<div><b>TDEE:</b> <span class="info">${Math.round(tdee)} kcal/วัน</span> (แคลที่ควรกินต่อวันโดยประมาณ)</div>`;

  document.getElementById("calResult").innerHTML = msg;


  const data = { weight, heightCm, age, sex, activity, bmi, bmr, tdee };
  localStorage.setItem("calData", JSON.stringify(data));
}


window.onload = function () {
  const saved = localStorage.getItem("calData");
  if (!saved) return;

  const d = JSON.parse(saved);

  document.getElementById("weight").value = d.weight ?? "";
  document.getElementById("height").value = d.heightCm ?? "";
  document.getElementById("age").value = d.age ?? "";
  document.getElementById("sex").value = d.sex ?? "female";
  document.getElementById("activity").value = d.activity ?? "1.2";


  if (d.bmi && d.bmr && d.tdee) {
    const bmi = Number(d.bmi);
    let bmiText = "", bmiClass = "";
    if (bmi < 18.5) { bmiText = "ผอม"; bmiClass = "warn"; }
    else if (bmi < 25) { bmiText = "ปกติ"; bmiClass = "good"; }
    else if (bmi < 30) { bmiText = "อวบ"; bmiClass = "warn"; }
    else { bmiText = "อ้วน"; bmiClass = "bad"; }

    document.getElementById("calResult").innerHTML =
      `<div><b>BMI:</b> <span class="${bmiClass}">${bmi.toFixed(1)} (${bmiText})</span></div>
       <div><b>BMR:</b> ${Math.round(d.bmr)} kcal/วัน</div>
       <div><b>TDEE:</b> <span class="info">${Math.round(d.tdee)} kcal/วัน</span> (แคลที่ควรกินต่อวันโดยประมาณ)</div>`;
  }
};
