function calculate() {

  let income = parseFloat(document.getElementById('income').value);
  let expenses = parseFloat(document.getElementById('expenses').value);
  let goal = parseFloat(document.getElementById('goal').value);
  let rateAnnual = parseFloat(document.getElementById('investment').value);

  let savings = income - expenses;

  if (savings <= 0) {
    document.getElementById('months').innerText = "No puedes ahorrar con estos datos.";
    return;
  }

  // Inflación Colombia
  let inflation = 0.09;
  let adjustedGoal = goal * (1 + inflation);

  // Interés compuesto
  let rate = rateAnnual / 12;
  let months = 0;
  let total = 0;

  let history = [];

  while (total < adjustedGoal) {
    total = total * (1 + rate) + savings;
    months++;
    history.push(total);
  }

  document.getElementById('months').innerText =
    `Meta alcanzada en ${months} meses`;

  // IA simulada
  let advice = "";

  if (expenses > income * 0.8) {
    advice = "⚠️ Estás gastando demasiado.";
  } else if (savings < 300000) {
    advice = "💡 Intenta ahorrar más o generar ingresos.";
  } else {
    advice = "🚀 Excelente estrategia financiera.";
  }

  document.getElementById('aiAdvice').innerText = advice;

  // Barra progreso
  let progress = Math.min((savings / goal) * 100, 100);
  document.getElementById('progress').style.width = progress + "%";

  // Imagen meta
  let dream = document.getElementById('dream').value;

  let images = {
    viaje: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
    casa: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    carro: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
    negocio: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  };

  document.getElementById('dreamImage').src =
    images[dream] || images["viaje"];

  // Gráfico
  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: history.map((_, i) => i + 1),
      datasets: [{
        label: "Crecimiento del dinero",
        data: history
      }]
    }
  });
}

// PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("FUTURO DEL DINERO CON IA", 10, 10);
  doc.text(document.getElementById('months').innerText, 10, 20);
  doc.text(document.getElementById('aiAdvice').innerText, 10, 30);

  doc.save("plan_financiero.pdf");
}
