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

  getId() {
    return this.id;
  }

  getLocation() {
    return this.location;
  }

  getWaterDepth() {
    return this.water_depth;
  }

  getPhoto() {
    return this.photo;
  }

  getDescription() {
    return this.description;
  }

  setId(id) {
    this.id = id;
  }

  setLocation(location) {
    this.location = location;
  }

  setWaterDepth(waterdepth) {
    this.water_depth = waterdepth;
  }

  setPhoto(photo) {
    this.photo = photo;
  }

  setDescription(description) {
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
