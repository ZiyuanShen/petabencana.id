import {bindable, customElement, inject} from 'aurelia-framework';
import $ from 'jquery';
import env from 'environment';
import {LocaleEn} from 'resources/locales/en';
import {LocaleId} from 'resources/locales/id';

//start-non-standard
@customElement('side-pane')
@inject(LocaleEn, LocaleId)
//end-non-standard
export class SidePane {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable cities;
  @bindable selected;
  @bindable changeCity;
  @bindable closePane;
  @bindable reportId;
  //end-non-standard

  constructor(LocaleEn, LocaleId) {
    this.lang_obj = {en: LocaleEn, id: LocaleId};
    this.languages = env.supported_languages;
    this.selLanguage = env.default_language;
    this.locale = {};
    this.tabList = ["report", "map", "info"]; //elements match names of fontello icons
    this.tab = "report";
    this.videos = [
      {
        platform: "twitter", //Match string to locale/*/translation.json > report_content.*
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      },
      {
        platform: "telegram",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      },
      {
        platform: "otherapps",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      }
    ];
    this.gauge_levels = [
      {text: {"en": "Alert Level 1", "id": "Siaga 1"}, icon: 'assets/icons/floodgauge_1.svg'},
      {text: {"en": "Alert Level 2", "id": "Siaga 2"}, icon: 'assets/icons/floodgauge_2.svg'},
      {text: {"en": "Alert Level 3", "id": "Siaga 3"}, icon: 'assets/icons/floodgauge_3.svg'},
      {text: {"en": "Alert Level 4", "id": "Siaga 4"}, icon: 'assets/icons/floodgauge_4.svg'}
    ];
    this.flood_depth = [
      {text: {"en": "> 150", "id": "> 150"}, color: '#CC2A41'},
      {text: {"en": "71 - 150", "id": "71 - 150"}, color: '#FF8300'},
      {text: {"en": "10 - 70", "id": "10 - 70"}, color: '#FFFF00'},
      {text: {"en": "Use Caution", "id": "Hati-hati"}, color: '#A0A9F7'}
    ];
  }

  //on the fly language change
  changeLanguage(lang) {
    this.locale = this.lang_obj[lang].translation_strings;
  }

  attached() {
    this.changeLanguage(this.selLanguage);
    $('#' + this.selLanguage).addClass("active");
    $('#button-' + this.tab).addClass("active");
  }

  switchTab(tab) {
    $('.tabLinks').removeClass("active");
    $('#button-' + tab).addClass("active");
    this.tab = tab;
  }

  switchLang(lang) {
    this.changeLanguage(lang);
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
  }

  switchCity(city) {
    this.changeCity(city, true);
    this.reportId = null;
    this.closePane();
  }

  showVideo(video) {
    $('.videoWrapper:not(#vid_' + video + ')').slideUp("fast");
    $('#vid_' + video).slideToggle("fast");
    $('.labelRow:not(#label_' + video + ')').removeClass("active");
    $('#label_' + video).toggleClass("active");
    $('#down_' + video + ', #up_' + video).toggle();
    $('.up:not(#up_' + video + ')').hide();
    $('.down:not(#down_' + video + ')').show();
  }
}
