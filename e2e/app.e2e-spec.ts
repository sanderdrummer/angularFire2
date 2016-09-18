import { AngularFire2Page } from './app.po';

describe('angular-fire2 App', function() {
  let page: AngularFire2Page;

  beforeEach(() => {
    page = new AngularFire2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
