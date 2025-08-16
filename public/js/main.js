const options = ["piedra", "papel", "tijera", "lagarto", "spock"];
let score = { jugador: 0, cpu: 0, empate: 0 };
// --- DOM Elements ---
// --- Asignar eventos uno a uno ---
document.getElementById("btn-piedra").onclick = () => handleChoice("piedra");
document.getElementById("btn-papel").onclick = () => handleChoice("papel");
document.getElementById("btn-tijera").onclick = () => handleChoice("tijera");
document.getElementById("btn-lagarto").onclick = () => handleChoice("lagarto");
document.getElementById("btn-spock").onclick = () => handleChoice("spock");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const drawsEl = document.getElementById("draws");
const playerChoice = document.getElementById("playerChoice");
const cpuChoice1 = document.getElementById("cpuChoice");
document.getElementById("reset").onclick = () => reset();
// --- Función para manejar la jugada ---
function handleChoice(player) {
    const cpu = cpuChoice();
    playerChoice.innerHTML = player;
    cpuChoice1.innerHTML = cpu;
    const winner = getWinner(player, cpu);
    updateScore(winner);
    showResult(player, cpu, winner);
}
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
// --- Función para elegir la jugada de la CPU ---
function cpuChoice() {
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}
// --- Lógica para determinar el ganador ---
function getWinner(player, cpu) {
    if (player === cpu)
        return "empate";
    const rules = {
        piedra: ["tijera", "lagarto"],
        papel: ["piedra", "spock"],
        tijera: ["papel", "lagarto"],
        lagarto: ["spock", "papel"],
        spock: ["tijera", "piedra"]
    };
    return rules[player].includes(cpu) ? "jugador" : "cpu";
}
// --- Actualizar marcador ---
function updateScore(winner) {
    score[winner]++;
    if (scoreDiv) {
        winsEl.textContent = score.jugador.toString();
        lossesEl.textContent = score.cpu.toString();
        drawsEl.textContent = score.empate.toString();
    }
}
// --- Mostrar resultado ---
function showResult(player, cpu, winner) {
    if (resultDiv) {
        resultDiv.textContent = `Tú: ${player} | CPU: ${cpu} → Resultado: ${winner.toUpperCase()}`;
    }
}
function reset() {
    score = { jugador: 0, cpu: 0, empate: 0 };
    winsEl.textContent = score.jugador.toString();
    lossesEl.textContent = score.cpu.toString();
    drawsEl.textContent = score.empate.toString();
    playerChoice.innerHTML = "?";
    cpuChoice1.innerHTML = "?";
}
function isOption(value) {
    return options.includes(value);
}
export {};
//# sourceMappingURL=main.js.map