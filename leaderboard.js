function loadLeaderboard() {
    const tableBody = document.querySelector('#leaderboardTable tbody');
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const noData = document.getElementById('noData');
    tableBody.innerHTML = '';

    if (leaderboard.length === 0) {
    noData.style.display = 'block';
    return;
    }

    noData.style.display = 'none';
    leaderboard.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.time}</td>
    `;
    tableBody.appendChild(row);
    });
}

// โหลด leaderboard ทุก 10 วินาที เพื่อให้บอร์ดอัปเดตอัตโนมัติ
loadLeaderboard();
setInterval(loadLeaderboard, 10000);