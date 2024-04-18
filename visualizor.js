const { Chart, registerables } = require('chart.js');
const { createCanvas } = require('canvas');
const fs = require('fs');
Chart.register(...registerables);

async function generateBarGraph(labels, data, path) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Size (KB)',
                data: data,
                borderWidth: 1
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
witness_sizes = [];
for(let i = 0; i < hasher_names.length; i++) {
    const data = JSON.parse(fs.readFileSync(`results/${hasher_names[i]}.json`, 'utf8'));
    wasm_sizes.push(data.wasm_size);
    witness_sizes.push(data.witness_size);
}

generateBarGraph(hasher_names, wasm_sizes, 'results/plots/wasm_sizes.png');
generateBarGraph(hasher_names, witness_sizes, 'results/plots/witness_sizes.png');