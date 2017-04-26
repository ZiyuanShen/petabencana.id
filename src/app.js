export class App {

  configureRouter(config, router) {
    config.title = 'Riskmap.in';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'map'],   name: 'map',  moduleId: 'routes/landing/landing'},
      {route: 'cards/:disaster/:id',       moduleId: 'routes/cards/cards'}
    ]);
    config.mapUnknownRoutes({moduleId: 'routes/landing/landing'});
    this.router = router;
  }
}
