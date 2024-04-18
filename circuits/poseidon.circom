pragma circom  2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template TestPoseidon() {
    signal input preImage[2];
    signal output hash;
    
    component hasher = Poseidon(2);
    hasher.inputs[0] <== preImage[0];
    hasher.inputs[1] <== preImage[1];
    
    hash <== hasher.out;
}

component main = TestPoseidon();