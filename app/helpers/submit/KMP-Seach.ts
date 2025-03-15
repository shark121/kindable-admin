export function kmpSearch(text: string, pattern: string): number[] {
    const textLength: number = text.length;
    const patternLength: number = pattern.length;
    const lps: number[] = computeLPSArray(pattern);
    const matches: number[] = [];
    let i: number = 0; // index for text[]
    let j: number = 0; // index for pattern[]
  
    while (i < textLength) {
      if (pattern[j] === text[i]) {
        j++;
        i++;
      }
  
      if (j === patternLength) {
        matches.push(i - j);
        j = lps[j - 1];
      } else if (i < textLength && pattern[j] !== text[i]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }
    return matches;
  
    function computeLPSArray(pattern: string): number[] {
      const patternLength: number = pattern.length;
      const lps: number[] = new Array(patternLength).fill(0);
      let len: number = 0;
      let i: number = 1;
  
      while (i < patternLength) {
        if (pattern[i] === pattern[len]) {
          len++;
          lps[i] = len;
          i++;
        } else {
          if (len !== 0) {
            len = lps[len - 1];
          } else {
            lps[i] = 0;
            i++;
          }
        }
      }
      return lps;
    }
  }
  
  // Example usage:
  

  export function arrayContainsMatch(arr : string[], pattern: string) : boolean {
    for (let el of arr){
      if(el != null && kmpSearch(el, pattern).length > 0) return true 
      } 
    return false
  }