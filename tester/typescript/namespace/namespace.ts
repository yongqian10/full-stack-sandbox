namespace Validators {
  export interface stringValidator {
    isAcceptable(s: string): boolean;
  }

  let lettersRegexp = /^[A-za-z]+$/;
  let numberRegexp = /^[0-9]+$/;

  export class lettersOnlyValidator implements stringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class zipCodeValidator implements stringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
// ome example to try
let strings = ["Hello", "98052", "101"];

// validator to use
let validators: { [s: string]: Validators.stringValidator } = {};
validators["ZIP code"] = new Validators.zipCodeValidator();
validators["Letters only"] = new Validators.lettersOnlyValidator();

for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}
