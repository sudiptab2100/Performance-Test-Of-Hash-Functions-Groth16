pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/sha256/sha256.circom";

template TestSHA256(nBits) {
    signal input preImage[nBits];
    signal output hash[256];
    
    component hasher = Sha256(nBits);
    for(var i = 0; i < nBits; i++) {
        var s = preImage[i];
        s * (1 - s) === 0; // Assert that s is a bit
        
        hasher.in[i] <== preImage[i];
    }
    
    for(var i = 0; i < 256; i++) {
        hash[i] <== hasher.out[i];
    }
}

component main = TestSHA256(512);