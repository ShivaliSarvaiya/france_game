fetch("/api/buildings")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("tableBody");
    data.forEach(b => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${b.id}</td>
        <td>${b.type}</td>
        <td>${b.level}</td>
        <td><button onclick="deleteBuilding(${b.id})">X</button></td>
      `;
      tbody.appendChild(row);
    });
  });

function deleteBuilding(id) {
  fetch("/api/buildings/" + id, { method: "DELETE" })
    .then(() => location.reload());
}
