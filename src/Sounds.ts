import zzfx from './zzfx';

export function playGingerShotSound() {
    // zzfx(...[1.4,0,383,.02,.04,.08,1,1.25,1.7,,,,.03,.7,,,.16,.95,.04,.03]);
    // zzfx(...[.8,0,102,.02,.04,,1,.3,,-4.7,,,,.3,,.1,,.72,.01,.18]); // Hit 387
    // zzfx(...[.7,0,102,.06,.04,,1,.4,,-4.7,,,,1.3,,,,.72,.01,.18]); // Hit 387
    // zzfx(...[2.06,0,121,,.1,.02,1,.94,,1,,,,,,.1,.21,.95,.01,.07]); // Shoot 428
    zzfx(...[1.4,0,406,.06,.02,.04,,.6,,,,,.01,,,,.06,.52,.01,.49]); // Shoot 432
}

export function hit() {
    // zzfx(...[.5,0,10,.02,.03,.03,3,.43,,,,,,,,,,.52,.04,.2]);
    // zzfx(...[.8,0,102,.02,.04,,1,.3,,-4.7,,,,.3,,.1,,.72,.01,.18]); // Hit 387
    // zzfx(...[.6,0,330,.03,.06,.13,1,1.41,,,,,.06,1.8,,,,.66,.01]); // Hit 412
    zzfx(...[.4,0,816,.03,,.19,2,.39,,,,,,1.5,,1,,.2,.18,.4]); // Explosion 416
}

export function vCB(){
    zzfx(...[1.2,0,127,.01,.22,.41,3,3.28,1,.6,,,,.5,,.7,.23,.42,.15]);
}

export function tC(){
    zzfx(...[.6,0,413,.01,.06,.05,,1.02,1.4,-0.1,,,,1.2,,,.17,.96,.08]); // Shoot 398
}