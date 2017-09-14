import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        const phoneAsString = value.toString();
        const phoneLength = phoneAsString.length;
        if (phoneLength === 9) {
            const firstGroup = phoneAsString.substring(0, 3);
            const secondGroup = phoneAsString.substring(3, 6);
            const thirdGroup = phoneAsString.substring(6, 9);

            return `(+359) ${firstGroup} ${secondGroup} ${thirdGroup}`;
        } else {
            return value;
        }
    }
}
