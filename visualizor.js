const { Chart, registerables } = require('chart.js');
const { createCanvas } = require('canvas');
const fs = require('fs');
Chart.register(...registerables);

async function generateBarGraph(labels, data, path, label) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: labels.map((label, index) => {
                    const hue = Math.round(360 * index / labels.length);
                    return `hsl(${hue}, 100%, 50%)`;
                }),
                borderWidth: 5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    const out = fs.createWriteStream(path);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
}

if (!fs.existsSync('results/plots')) fs.mkdirSync('results/plots');
hasher_names = ['mimc', 'poseidon', 'pedersen', 'sha256'];

wasm_sizes = [];
r1cs_sizes = [];
witness_sizes = [];
zkey_sizes = [];
runtimes = [];
for(let i = 0; i < hasher_names.length; i++) {
    const data = JSON.parse(fs.readFileSync(`results/${hasher_names[i]}.json`, 'utf8'));
    wasm_sizes.push(data.wasm_size);
    r1cs_sizes.push(data.r1cs_size);
    witness_sizes.push(data.witness_size);
    zkey_sizes.push(data.zkey_size);
    runtimes.push(data.proof_generation.avg_runtime);
}

generateBarGraph(hasher_names, wasm_sizes, 'results/plots/wasm_sizes.png', label='Wasm Size (KB)');
generateBarGraph(hasher_names, r1cs_sizes, 'results/plots/r1cs_sizes.png', label='R1CS Size (KB)');
generateBarGraph(hasher_names, witness_sizes, 'results/plots/witness_sizes.png', label='Witness Size (KB)');
generateBarGraph(hasher_names, zkey_sizes, 'results/plots/zkey_sizes.png', label='Prover Key Size (KB)');
generateBarGraph(hasher_names, runtimes, 'results/plots/runtimes.png', label='Average Runtime (ms)');
