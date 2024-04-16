pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/sha256/sha256_2.circom";

template TestSHA256() {
    signal input preImage[2];
    signal output hash;
    
    component hasher = Sha256_2();
    hasher.a <== preImage[0];
    hasher.b <== preImage[1];
    
    hash <== hasher.out;
}

component main = TestSHA256();