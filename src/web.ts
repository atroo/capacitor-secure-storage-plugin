import { WebPlugin } from '@capacitor/core';

import type { SetDataOptions } from '.';
import type { Accessibility} from './definitions';
import { SecureStoragePlugin, WebStorageAdapter } from './definitions';
import { sessionCookie } from './sessionCookie'

export class SecureStoragePluginWeb extends WebPlugin implements SecureStoragePlugin {
  PREFIX = 'cap_sec_';
  STORAGE_ADAPTER_KEY = 'cap_sec_adapter'

  private getCurrentStorageAdapter() {
    const adapter = localStorage.getItem(this.STORAGE_ADAPTER_KEY)

    switch(adapter) {
      case WebStorageAdapter.SessionStorage:
        return sessionStorage
      case WebStorageAdapter.SessionCookie:
        return sessionCookie
      default:
        return localStorage
    }
  }

  async setStorageAdapter(options: { web: {adapter: WebStorageAdapter} }): Promise<{ value: boolean }> {
    localStorage.setItem(this.STORAGE_ADAPTER_KEY, options.web.adapter)
    return {
      value: true
    }
  }

  async getStorageAdapter(): Promise<{ adapter: WebStorageAdapter }> {
    const adapter = (localStorage.getItem(this.STORAGE_ADAPTER_KEY) || WebStorageAdapter.LocalStorage) as WebStorageAdapter

    return {
      adapter
    }
  }

  get(options: { key: string }): Promise<{ value: string }> {
    const storage = this.getCurrentStorageAdapter()
    const item = storage.getItem(this.addPrefix(options.key));
    if (item !== null) {
      return Promise.resolve({
        value: atob(item),
      });
    } else {
      return Promise.reject('Item with given key does not exist');
    }
  }

  getAccessibility(_options: { key: string }): Promise<{ value: Accessibility|undefined }> {
    // Always rejects on web
    return Promise.reject('not implemented on web');
  }

  set(options: SetDataOptions): Promise<{ value: boolean }> {
    const storage = this.getCurrentStorageAdapter()
    storage.setItem(this.addPrefix(options.key), btoa(options.value));
    return Promise.resolve({ value: true });
  }
  remove(options: { key: string }): Promise<{ value: boolean }> {
    const storage = this.getCurrentStorageAdapter()
    storage.removeItem(this.addPrefix(options.key));
    return Promise.resolve({ value: true });
  }
  clear(): Promise<{ value: boolean }> {
    const storage = this.getCurrentStorageAdapter()
    for (const key in storage) {
      if (key.indexOf(this.PREFIX) === 0) {
        storage.removeItem(key);
      }
    }

    // remove eventually set storageAdapter key
    localStorage.removeItem(this.STORAGE_ADAPTER_KEY)

    return Promise.resolve({ value: true });
  }
  keys(): Promise<{ value: string[] }> {
    const storage = this.getCurrentStorageAdapter()
    const keys = Object.keys(storage).filter((k) => k.indexOf(this.PREFIX) === 0);
    return Promise.resolve({ value: keys });
  }

  getPlatform(): Promise<{ value: string }> {
    return Promise.resolve({ value: 'web' });
  }

  private addPrefix = (key: string) => this.PREFIX + key;
}

const SecureStoragePlugin = new SecureStoragePluginWeb();

export { SecureStoragePlugin };
