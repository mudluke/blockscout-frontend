import React from 'react';

import { apps as appsMock } from 'mocks/apps/apps';
import * as searchMock from 'mocks/search/index';
import type { StorageState } from 'playwright/fixtures/storageState';
import * as storageState from 'playwright/fixtures/storageState';
import { test as base, expect } from 'playwright/lib';

import SearchBar from './SearchBar';

const test = base.extend<{ storageState: StorageState }>({
  storageState: storageState.fixture([
    storageState.addEnv('NEXT_PUBLIC_MARKETPLACE_CONFIG_URL', ''),
  ]),
});

test.beforeEach(async({ mockAssetResponse }) => {
  await mockAssetResponse(searchMock.token1.icon_url as string, './playwright/mocks/image_s.jpg');
});

test('search by token name  +@mobile +@dark-mode', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.token1,
    searchMock.token2,
  ], { queryParams: { q: 'o' } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('search by contract name  +@mobile +@dark-mode', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.contract1,
    searchMock.address2,
  ], { queryParams: { q: 'o' } });

  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('search by name homepage +@dark-mode', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
  ], { queryParams: { q: 'o' } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('search by tag  +@mobile +@dark-mode', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.label1,
  ], { queryParams: { q: 'o' } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('search by address hash +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.address1,
  ], { queryParams: { q: searchMock.address1.address } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(searchMock.address1.address);

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 300 } });
});

test('search by block number +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.block1,
    searchMock.block2,
    searchMock.block3,
  ], { queryParams: { q: searchMock.block1.block_number } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(String(searchMock.block1.block_number));

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 600 } });
});

test('search by block hash +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.block1,
  ], { queryParams: { q: searchMock.block1.block_hash } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(searchMock.block1.block_hash);

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 300 } });
});

test('search by tx hash +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.tx1,
  ], { queryParams: { q: searchMock.tx1.tx_hash } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(searchMock.tx1.tx_hash);

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 300 } });
});

test('search by blob hash +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.blob1,
  ], { queryParams: { q: searchMock.blob1.blob_hash } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(searchMock.blob1.blob_hash);

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 300 } });
});

const userOpsTest = base.extend<{ storageState: StorageState }>({
  storageState: storageState.fixture(storageState.ENVS.userOps),
});

userOpsTest('search by user op hash +@mobile', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.userOp1,
  ], { queryParams: { q: searchMock.tx1.tx_hash } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill(searchMock.tx1.tx_hash);

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 300 } });
});

test('search with view all link', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
    ...Array(47).fill(searchMock.contract1),
  ], { queryParams: { q: 'o' } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('scroll suggest to category', async({ render, page, mockApiResponse }) => {
  await mockApiResponse('quick_search', [
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
    searchMock.token1,
    searchMock.token2,
    searchMock.contract1,
  ], { queryParams: { q: 'o' } });
  await render(<SearchBar/>);
  await page.getByPlaceholder(/search/i).fill('o');

  await page.getByRole('tab', { name: 'Addresses' }).click();

  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

test('recent keywords suggest +@mobile', async({ render, page }) => {
  await render(<SearchBar/>);
  // eslint-disable-next-line max-len
  await page.evaluate(() => window.localStorage.setItem('recent_search_keywords', '["10x2d311959270e0bbdc1fc7bc6dbd8ad645c4dd8d6aa32f5f89d54629a924f112b","0x1d311959270e0bbdc1fc7bc6dbd8ad645c4dd8d6aa32f5f89d54629a924f112b","usd","bob"]'));
  await page.getByPlaceholder(/search/i).click();
  await page.getByText('0x1d311959270e0bbdc1fc7bc6db').isVisible();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
});

const MARKETPLACE_CONFIG_URL = 'https://marketplace-config.json';
const dappsTest = base.extend<{ storageState: StorageState }>({
  storageState: storageState.fixture([
    storageState.addEnv('NEXT_PUBLIC_MARKETPLACE_CONFIG_URL', MARKETPLACE_CONFIG_URL),
  ]),
});

dappsTest.describe('with apps', () => {
  dappsTest('default view +@mobile', async({ render, page, mockApiResponse, mockConfigResponse, mockAssetResponse }) => {
    await mockApiResponse('quick_search', [
      searchMock.token1,
    ], { queryParams: { q: 'o' } });
    await mockConfigResponse('NEXT_PUBLIC_MARKETPLACE_CONFIG_URL', MARKETPLACE_CONFIG_URL, JSON.stringify(appsMock));
    await mockAssetResponse(appsMock[0].logo, './playwright/mocks/image_s.jpg');
    await mockAssetResponse(appsMock[1].logo, './playwright/mocks/image_s.jpg');

    await render(<SearchBar/>);
    await page.getByPlaceholder(/search/i).fill('o');

    await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1200, height: 500 } });
  });
});
