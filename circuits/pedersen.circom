pragma circom  2.0.0;

include "../node_modules/circomlib/circuits/pedersen.circom";

template TestPedersen() {
    signal input preImage[2];
    signal output hash[2];
    
    component hasher = Pedersen(2);
    hasher.in[0] <== preImage[0];
    hasher.in[1] <== preImage[1];
    
    hash[0] <== hasher.out[0];
    hash[1] <== hasher.out[1];
}

component main = TestPedersen();