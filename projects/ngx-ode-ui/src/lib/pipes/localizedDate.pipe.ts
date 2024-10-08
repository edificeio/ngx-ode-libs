import {DatePipe, getLocaleId} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {BundlesService} from 'ngx-ode-sijil';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private bundlesService: BundlesService) {
  }

  transform(value: any, pattern: string = "mediumDate"): any {
    let targetLanguage = this.bundlesService.currentLanguage || "en";
    try {
      // If targetLanguage and angular current locale are different, fall back angular locale to "en"
      if (getLocaleId(targetLanguage) !== targetLanguage) {
        targetLanguage = "en";
      }
    } catch (e) {
      // getLocaleId(targetLanguage) can throw an error when locale is not recognized
      // In such a case, fall back to "en"
      targetLanguage = "en";
    }
    // Use angular locale formatting for localized dates
    const datePipe: DatePipe = new DatePipe(targetLanguage);
    return datePipe.transform(value, pattern);
  }
}
