import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Description {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    var reportCardDescription = this.reportcard.getDescription();
    if (reportCardDescription) {
      this.descripText = reportCardDescription;
      this.textLength = this.descripText.length;
    } else {
      this.descripText = "Enter description here...";
      this.textLength = 0;
    }
  }

  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }

  checkEntry() {
    if (this.textLength === 0) {
      this.descripText = "Enter description here...";
    }
  }

  storeInput() {
    this.textLength = this.descripText.length; //this.textLength required to update bound helpers for description.html
    this.reportcard.setDescription(this.descripText);
  }
}
