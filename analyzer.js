const { exec } = require('child_process');
const fs = require('fs');
const { exit } = require('process');

async function runC(hasher, times) {
    hasher_js = hasher + '_js';
    witness_command = `node ${hasher_js}/generate_witness.js ${hasher_js}/${hasher}.wasm input.json ${hasher_js}/witness.wtns`;
    proof_command = `snarkjs groth16 prove ${hasher_js}/prover_key.zkey ${hasher_js}/witness.wtns ${hasher_js}/proof.json ${hasher_js}/public.json`;
    for(let i = 0; i < times; i++) {
        await exec(witness_command)
        await exec(proof_command);
    }
}

function fileSize(filePath) {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
    return fileSizeInKB;
}

async function main() {
    runs = 1;
    hasher_names = ['mimc', 'poseidon', 'pedersen', 'sha256'];
    
    const args = process.argv.slice(2);
    if(args.length > 0 && args.length <= 2) {
        hasher = args[0];
        if(args.length == 2) runs = parseInt(args[1]);
        if(runs <= 0) {
            console.log("Invalid runs")
            exit(1);
        }
        if(hasher_names.includes(hasher)) {
            console.log(`Running ${hasher} hasher`);
        } else {
            console.log('Hasher not found');
            exit(1);
        }
    } else {
        console.log('Provide command line arguments | arg[0]: hasher, arg[1]: runs');
        exit(1);
    }
    
    hasher_js = hasher + '_js';
    const start = new Date();
    await runC(hasher, runs);
    const end = new Date();
    
    const runtime = end - start;
    const wasm_size = fileSize(`${hasher_js}/${hasher}.wasm`);
    const r1cs_size = fileSize(`${hasher_js}/${hasher}.r1cs`);
    const zkey_size = fileSize(`${hasher_js}/prover_key.zkey`);
    const witness_size = fileSize(`${hasher_js}/witness.wtns`);
    
    console.log(`Wasm size: ${wasm_size} KB`);
    console.log(`R1CS size: ${r1cs_size} KB`);
    console.log(`Prover Key size: ${zkey_size} KB`);
    console.log(`Witness size: ${witness_size} KB`);
    console.log(`Runtime: ${runtime} ms`);
    
    const jsonFilePath = `results/${hasher}.json`;
    if (!fs.existsSync('results')) fs.mkdirSync('results');
    if(!fs.existsSync(jsonFilePath)) {
        const proof_generation = {
            runs: 0,
            runtime: 0,
            avg_runtime: 0,
        }
        const jsonObject = {
            wasm_size: 0,
            r1cs_size: 0,
            zkey_size: 0,
            witness_size: 0,
            proof_generation: proof_generation
        };
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObject), 'utf8');
    }
    
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    prev_runs = data.proof_generation.runs;
    prev_runtime = data.proof_generation.runtime;
    total_runs = prev_runs + runs;
    total_runtime = prev_runtime + runtime;
    avg_runtime = total_runtime / total_runs;
    
    data.wasm_size = wasm_size;
    data.r1cs_size = r1cs_size;
    data.zkey_size = zkey_size;
    data.witness_size = witness_size;
    data.proof_generation.runs = total_runs;
    data.proof_generation.runtime = total_runtime;
    data.proof_generation.avg_runtime = avg_runtime;
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4), 'utf8');
}

main();