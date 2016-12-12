import {inject} from 'aurelia-framework';
import {ReportcardApi} from './ReportcardApi';

var api = new ReportcardApi();
export class Reportcard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  constructor(id) {
    this.api = api;
    this.id = id;

    this.location = null;//object containing markerLocation, gpsLocation, and accuracy
    this.water_depth = null;
    this.photo = null;
    this.description = null;
  }

  getid() {
    return this.id;
  }

  getlocation() {
    return this.location;
  }

  getwaterdepth() {
    return this.water_depth;
  }

  getphoto() {
    return this.photo;
  }

  getdescription() {
    return this.description;
  }

  setid(id) {
    this.id = id;
  }

  setlocation(location) {
    this.location = location;
  }

  setwaterdepth(waterdepth) {
    this.water_depth = waterdepth;
  }

  setphoto(photo) {
    this.photo = photo;
  }

  setdescription(description) {
    this.description = description;
  }
  //submits this report and also uploads the photo associated with it
  //if there is one
  //returns a promise?
  submitReport(){
    if (this.location && this.water_depth) {
      this.api.submitReport(this.id, this.location.markerLocation, this.water_depth, this.description, this.photo);
    }
  }
}
