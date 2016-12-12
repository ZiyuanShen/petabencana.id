//This file is the model of how a report card's data looks like
//It can be used to GET or PUT data to/from the server

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class ReportcardApi {
  constructor(ea) {
    //TODO: pull this into a config file
    this.apiBase = 'http://localhost:8001/';
    this.client = new HttpClient();
    this.client.configure( x => {
      x.withBaseUrl(this.apiBase);
    });
  }

  getPhotoUploadUrl(id) {
    return this.client.get( this.apiBase + 'cards/image/' +id);
  }

  uploadPhoto(id, photo) {
    return this.getPhotoUploadUrl(id)
      .then( data => { this.client.put(data.signedRequest, photo); });
  }

  //returns a promise that when resolved is all of the reports available
  getAllReports() {
    return this.client.get( this.apiBase + 'reports/')
      .then(data => {
        console.log(data);
      }).catch( err => {
        console.log("error!");
      });
  }

  submitReport(id, location, waterdepth, description, photo) {
    var report = { location: { lat: location.lat, lng: location.lng },
                    water_depth: waterdepth,
                    text: description,
                    image_url: '',
                    created_at: new Date().toISOString() };
    console.log(report);
    var url = this.apiBase + 'cards/' + id;
    console.log(url);
    return this.client.put(url, report)
      .then(data => {
        console.log(data);
      }).catch( err => {
        console.log("error in submit report call!");
      });
    }
}
