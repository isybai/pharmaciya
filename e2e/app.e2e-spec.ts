import { PharmaciyaPage } from './app.po';

describe('pharmaciya App', () => {
  let page: PharmaciyaPage;

  beforeEach(() => {
    page = new PharmaciyaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
