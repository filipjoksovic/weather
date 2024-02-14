import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage: Storage = localStorage;

  public set(key: string, value: string | object) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error occured while attempting to store data in localStorage`,
        error
      );
    }
  }

  public get<T>(key: string): T | null {
    try {
      const obj = this.storage.getItem(key);
      if (!obj) {
        return null;
      }
      return JSON.parse(obj) as T;
    } catch (error) {
      console.error(
        `Error occured while attempting to fetch data from localStorage`,
        error
      );
      return null;
    }
  }

  public remove(key: string) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(
        `Error occured while attempting to remove data from localStorage`,
        error
      );
    }
  }

  public clear() {
    try {
      this.storage.clear();
    } catch (error) {
      console.error(
        `Error occured while attempting to clear localStorage`,
        error
      );
    }
  }
}
