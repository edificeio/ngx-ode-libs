import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform {
    transform(value: string, strToReplace: string, replacementStr: string | number): string {

        if (!value || !strToReplace || !replacementStr) {
            return value;
        }

        return value.replace(new RegExp(this.escapeStr(strToReplace), 'g'), '' + replacementStr);
    }

    private escapeStr(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }
}