import { test, expect } from '@playwright/test';

test('I want to be able to book a hotel', async ({ page }) => {
  await page.goto('https://www.qantas.com/hotels');
  await page.getByTestId('hotels-panel').getByTestId('location-search-input').click();
  await page.getByTestId('hotels-panel').getByTestId('location-search-input').fill('sydney');
  await page.getByRole('option', { name: 'place Sydney, NSW, Australia' }).click();
  await page.getByTestId('search-hotels-cta').click();

  const page1Promise = page.waitForEvent('popup');
  await page.getByLabel('Rydges Sydney Airport from').click();
  const page1 = await page1Promise;

  await expect(page1.getByRole('main')).toContainText('Rydges Sydney Airport');
  await page1.getByRole('link', { name: 'View rooms' }).click();
  await page1.getByTestId('offer-checkout-link').first().click();

  await expect(page1.getByRole('main')).toContainText('Rydges Sydney Airport');
  await expect(page1.getByRole('main')).toContainText('Log in to use Qantas points');
  await expect(page1.getByTestId('heading')).toContainText('Let\'s review your booking and pay');

  await page1.getByLabel('TitleSelectMrMrsMsMissDrCaptRevMstr').selectOption('Mr');
  await page1.getByLabel('First name').click();
  await page1.getByLabel('First name').fill('Zach');
  await page1.getByLabel('First name').press('Tab');
  await page1.getByLabel('Last name').fill('Bennett');
  await page1.getByLabel('Email addressWe\'ll send').click();
  await page1.getByLabel('Email addressWe\'ll send').fill('bennettzach@proton.me');
  await page1.getByLabel('Email addressWe\'ll send').press('Tab');
  await page1.getByLabel('Phone numberIn case we need').fill('0406720700');
  await page1.getByTestId('personal-details-form').getByTestId('next-step-button').click();

  await expect(page1.getByTestId('qantas-points-form').locator('form')).toContainText('Are you a Points Club member?');
  await expect(page1.getByTestId('points-club-banner-login-cta')).toContainText('Login now');
  await expect(page1.getByTestId('qantas-points-form').locator('form')).toContainText('to access more bonus points on your hotel booking.');
  await page1.getByTestId('qantas-points-form').getByTestId('next-step-button').click();

  await expect(page1.getByTestId('payment-options-form')).toContainText('Use credit or voucher.');
  await expect(page1.getByTestId('payment-options-form').getByTestId('box').locator('span')).toContainText('Qantas Hotels voucher');
  await expect(page1.getByTestId('add-voucher-button')).toBeVisible();
  await expect(page1.getByTestId('redeem-message')).toContainText('Redeem Points on your hotel booking.');
  await expect(page1.getByTestId('payment-options-form').getByRole('button', { name: 'Important Information' })).toBeVisible();
  await expect(page1.getByTestId('payment-options-form')).toContainText('Qantas Points + Pay');
  await expect(page1.getByTestId('payment-options-form').getByTestId('login-button')).toBeVisible();
  await expect(page1.getByTestId('continue-button')).toBeVisible();
  await page1.getByTestId('continue-button').click();

  /*await expect (page1.getByLabel('Card number')).toBeVisible;
  await page1.getByLabel('Card number').click;
  await page1.getByLabel('Card number').fill('1234567890123456', {timeout: 20000});*/

  await page1.getByLabel('Name on card').click();
  await page1.getByLabel('Name on card').fill('Zach Bennett');
  await page1.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').click();
  await page1.frameLocator('iframe[title="Iframe for expiry date"]').getByPlaceholder('MM/YY').fill('01/28');
  await page1.frameLocator('iframe[title="Iframe for security code"]').getByPlaceholder('digits').click();
  await page1.frameLocator('iframe[title="Iframe for security code"]').getByPlaceholder('digits').fill('123');

  await expect(page1.getByTestId('confirm-and-pay-form').getByTestId('total-to-pay-now-label')).toContainText('Total due now');
  await expect(page1.getByTestId('confirm-and-pay-form').getByTestId('price-breakdown-button')).toBeVisible();
  await page1.getByTestId('accept-terms').check();
  await expect(page1.getByTestId('confirm-and-pay-form')).toContainText('Your payment will be processed in Australia');
});