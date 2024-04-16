# Prover Side Performance Test of Groth16 of Hash Functions

This is a performance test of the prover side of the Groth16 proof system for hash functions. The test will be conducted on the following hash functions:

- SHA256
- MiMC

## Requirements

- Circom: 2.1.8

## Trusted Setup Ceremony (powersoftau)

### Start the Ceremony

```bash
mkdir ZKSetup && snarkjs powersoftau new bn128 12 ZKSetup/pot12_0000.ptau -v
```

### Contribution to the Ceremony

First contribution

```bash
snarkjs powersoftau contribute ZKSetup/pot12_0000.ptau ZKSetup/pot12_0001.ptau --name="First contribution" -v
```

Final contribution

```bash
snarkjs powersoftau prepare phase2 ZKSetup/pot12_0001.ptau ZKSetup/pot12_final.ptau -v
```

### Verify the Ceremony

```bash
snarkjs powersoftau verify ZKSetup/pot12_final.ptau
```

## Generate R1CS files

```bash
mkdir R1CS
circom circuits/sha256.circom --r1cs --wasm -o R1CS
```