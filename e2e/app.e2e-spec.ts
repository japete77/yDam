import { YDamPage } from './app.po';

describe('y-dam App', () => {
  let page: YDamPage;

  beforeEach(() => {
    page = new YDamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
