import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Review {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    //Check for mobile or desktop device
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    //Check for available user inputs
    var reportCardDepth = this.reportcard.getWaterDepth();
    if (reportCardDepth) {
      this.selDepth = reportCardDepth + "cm";
    } else {
      this.selDepth = "Not selected";
    }
    var reportCardPhoto = this.reportcard.getPhoto();
    if (reportCardPhoto) {
      this.selPhoto = reportCardPhoto;
    }
    var reportCardDescription = this.reportcard.getDescription();
    if (reportCardDescription) {
      this.selDescription = reportCardDescription;
    } else {
      this.selDescription = "No description provided";
    }
  }

  get checkRequiredInputs() { //TODO: Add checks for file / data types
    if (this.reportcard.getLocation() && this.reportcard.getWaterDepth() && (this.reportcard.getPhoto() || this.reportcard.getDescription())) {
      return true;
    } else {
      return false;
    }
  }

  activate(params, routerConfig) {
    this.termsLink = routerConfig.navModel.router.routes[6].route;
    this.thanksLink = routerConfig.navModel.router.routes[7].route;
    this.router = routerConfig.navModel.router;
  }

  attached() {
    if (this.selPhoto) {
      this.drawImage();
    }

    var that = this;

    if (this.checkRequiredInputs) {
      var slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
      slideThreshold = 0.9,
      slideTranslate = 0,
      slidePressed = false,
      swiped = false;

      //Slider touch start
      $('#submitKnob').on('touchstart mousedown', function (e) {
        var slideStartPos;
        if (that.isMobile) {
          slideStartPos = e.originalEvent.touches[0].pageX;
        } else {
          slideStartPos = e.clientX;
        }
        slidePressed = true;

        //Drag start
        $('#reviewWrapper').on('touchmove mousemove', function (e) {
          var slideDragPos;
          if (that.isMobile) {
            e.preventDefault();
            slideDragPos = e.originalEvent.touches[0].pageX;
          } else {
            slideDragPos = e.clientX;
          }
          slideTranslate = slideDragPos - slideStartPos;
          if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
            $('#submitKnob').css({
              'left': slideTranslate + 'px'
            });
            $('#submitSlider').css({
              'background-color': 'rgba(31, 73, 99, ' + (slideTranslate / (slideThreshold * slideRange)) + ')'
            });

            //Swipe threshold crossed - TODO: execute report card submit function here
            if (slideTranslate >= (slideThreshold * slideRange) && !swiped) {
              //Development test logs
              console.log('Report submitted with following values:');
              console.log('Location: ' + that.reportcard.getLocation().markerLocation);
              console.log('Water depth: ' + that.reportcard.getWaterDepth() + 'cm');
              if (that.reportcard.getPhoto()) {
                console.log('Photo: ' + that.reportcard.getPhoto()[0].name);
              } else {
                console.log('No photo provided');
              }
              if (that.reportcard.getDescription()) {
                console.log('Description: ' + that.reportcard.getDescription());
              } else {
                console.log('No description provided');
              }
              //Execute reportcard submit function
              that.reportcard.submitReport();
              //Navigate to thanks card
              that.router.navigate(that.thanksLink);
              swiped = true;
            }
          }
        });

        //Drag end
        $(window).on('touchend mouseup', function () {
          if (slidePressed && slideTranslate < (slideThreshold * slideRange) && !swiped) {
            slidePressed = false;
            $('#submitKnob').animate({ //Swing back to start position
              'left': 0 + 'px'
            }, 50);
            $('#submitSlider').css({ //Reset slider background
              'background-color': 'transparent'
            });
          }
        });
      });
    } else {
      $('#submitKnob').css({
        'background-color': '#a0a0a0'
      });
      $('#termsConditions').html("Required flood location, water depth and atleast a photo or description to submit report");
    }
  }

  readTerms() {
    this.router.navigate(this.termsLink);
  }

  drawImage() {
    if (this.selPhoto) {
      let wrapper = this.preview;
      wrapper.width = $('#camera').width();
      wrapper.height = $('#camera').height();
      let reader = new FileReader();
      reader.onload = (e) => {
        let reviewImg = new Image();
        reviewImg.onload = () => {
          let imgW;
          let imgH;
          let trlX = 0;
          let trlY = 0;
          if (reviewImg.width >= reviewImg.height) {
            imgH = wrapper.height;
            imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
            trlX = Math.round((wrapper.width - imgW) / 2);
          } else {
            imgW = wrapper.width;
            imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
            trlY = Math.round((wrapper.height - imgH) / 2);
          }
          let cntxt = wrapper.getContext('2d');
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.selPhoto[0]);
    }
  }
}
