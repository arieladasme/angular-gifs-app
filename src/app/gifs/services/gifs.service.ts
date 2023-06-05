import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'Q5rKWhsy8PbvEmeiEpbjWDx9LAt2IQ28';

  constructor() {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    // elimino tag si es que existe en _tagsHistory
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    // agrego al inicio el nuevo tag
    this._tagsHistory.unshift(tag);

    //limito el arreglo a 10 valores
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const resp = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=valorant&limit=10`
    );
    const data = await resp.json();

    console.log(data);
  }
}
