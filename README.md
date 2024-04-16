# Prover Side Performance Test of Groth16 of Hash Functions

This is a performance test of the prover side of the Groth16 proof system for hash functions. The test will be conducted on the following hash functions:

- SHA256
- MiMC

## Requirements

- Circom: 2.1.8

## Trusted Setup Ceremony (powersoftau)

### Start the Ceremony

```bash
mkdir ZKSetup && snarkjs powersoftau new bn128 16 ZKSetup/pot16_0000.ptau -v
```

### Contribution to the Ceremony

First contribution

```bash
snarkjs powersoftau contribute ZKSetup/pot16_0000.ptau ZKSetup/pot16_0001.ptau --name="First contribution" -v
```

Final contribution

```bash
snarkjs powersoftau prepare phase2 ZKSetup/pot16_0001.ptau ZKSetup/pot16_final.ptau -v
```

### Verify the Ceremony

```bash
snarkjs powersoftau verify ZKSetup/pot16_final.ptau
```

## Generate WASM files

```bash
circom circuits/sha256.circom --wasm
```

## Generate R1CS files

```bash
circom circuits/sha256.circom --r1cs -o sha256_js
```

## Generate witness files

```bash
node sha256_js/generate_witness.js sha256_js/sha256.wasm input.json sha256_js/witness.wtns
```

## Generate Prover Key

```bash
snarkjs groth16 setup sha256_js/sha256.r1cs ZKSetup/pot16_final.ptau sha256_js/prover_key.zkey
```
