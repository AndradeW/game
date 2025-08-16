const options = ["piedra", "papel", "tijera", "lagarto", "spock"] as const;

type Option = typeof options[number];

interface Score {
    jugador: number;
    cpu: number;
    empate: number;
}

let score: Score = { jugador: 0, cpu: 0, empate: 0 };

// --- DOM Elements ---
// --- Asignar eventos uno a uno ---
(document.getElementById("btn-piedra") as HTMLButtonElement).onclick = () => handleChoice("piedra");
(document.getElementById("btn-papel") as HTMLButtonElement).onclick = () => handleChoice("papel");
(document.getElementById("btn-tijera") as HTMLButtonElement).onclick = () => handleChoice("tijera");
(document.getElementById("btn-lagarto") as HTMLButtonElement).onclick = () => handleChoice("lagarto");
(document.getElementById("btn-spock") as HTMLButtonElement).onclick = () => handleChoice("spock");

const winsEl = document.getElementById("wins") as HTMLElement;
const lossesEl = document.getElementById("losses") as HTMLElement;
const drawsEl = document.getElementById("draws") as HTMLElement;

const playerChoice = document.getElementById("playerChoice") as HTMLElement;
const cpuChoice1 = document.getElementById("cpuChoice") as HTMLElement;

(document.getElementById("reset") as HTMLButtonElement).onclick = () => reset();


// --- Función para manejar la jugada ---
function handleChoice(player: Option) {

    playerChoice.innerHTML = player;

    const cpu = cpuChoice();

    cpuChoice1.innerHTML = cpu;

    const winner = getWinner(player, cpu);

    updateScore(winner);
    showResult(player, cpu, winner);
}


const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");

// --- Función para elegir la jugada de la CPU ---
function cpuChoice(): Option {
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}

// --- Lógica para determinar el ganador ---
function getWinner(player: Option, cpu: Option): "jugador" | "cpu" | "empate" {
    if (player === cpu) return "empate";

    const rules: Record<Option, Option[]> = {
        piedra: ["tijera", "lagarto"],
        papel: ["piedra", "spock"],
        tijera: ["papel", "lagarto"],
        lagarto: ["spock", "papel"],
        spock: ["tijera", "piedra"]
    };

    return rules[player].includes(cpu) ? "jugador" : "cpu";
}

// --- Actualizar marcador ---
function updateScore(winner: "jugador" | "cpu" | "empate") {

    score[winner]++;

    if (scoreDiv) {
        winsEl.textContent = score.jugador.toString();
        lossesEl.textContent = score.cpu.toString();
        drawsEl.textContent = score.empate.toString();
    }
}

// --- Mostrar resultado ---
function showResult(player: Option, cpu: Option, winner: "jugador" | "cpu" | "empate") {
    if (resultDiv) {
        resultDiv.textContent = `Tú: ${player} | CPU: ${cpu} → Resultado: ${winner.toUpperCase()}`;
    }
}

function reset(): void {

    score = { jugador: 0, cpu: 0, empate: 0 };

    winsEl.textContent = score.jugador.toString();
    lossesEl.textContent = score.cpu.toString();
    drawsEl.textContent = score.empate.toString();

    playerChoice.innerHTML = "?";
    cpuChoice1.innerHTML = "?"

}

function isOption(value: string): value is Option {
    return options.includes(value as Option);
}

