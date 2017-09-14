import { Injectable } from '@angular/core';

@Injectable()
export class HelperServiceService {

  constructor() { }

  buildOddAndEvenElements(allElements: any[], oddElements: any[], evenElements: any[]) {
    for (let i = 0; i < allElements.length; i += 1) {
      const currentElement = allElements[i];
      if (i % 2 === 0) {
        oddElements.push(currentElement);
      } else {
        evenElements.push(currentElement);
      }
    }
  }

}
