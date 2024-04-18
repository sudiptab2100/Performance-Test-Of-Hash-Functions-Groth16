pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/mimcsponge.circom";

template TestMiMC() {
    signal input preImage[2];
    signal output hash;
    
    component hasher = MiMCSponge(2, 220, 1);
    hasher.ins[0] <== preImage[0];
    hasher.ins[1] <== preImage[1];
    hasher.k <== 635001318923151982178756201739790862869274169227264817603055102890634934507;
    
    hash <== hasher.outs[0];
}

component main = TestMiMC();