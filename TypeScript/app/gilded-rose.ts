export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  resolveSellIn(item: Item): number {
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return item.sellIn;
    }
    return item.sellIn - 1;
  }

  resolveQuality(item: Item): number {
    if (item.quality === 0) return 0
    if (item.quality >= 50) return item.quality;

    if (item.name === 'Aged Brie') {
      return item.quality + 1;
    }

    if (item.name.includes('Backstage passes')) {
      if (item.sellIn < 1) return 0;
      if (item.sellIn < 6) return item.quality + 3;
      if (item.sellIn < 11) return item.quality + 2;
      return item.quality + 1;
    }

    if (item.name === 'Conjured') {
      if (item.sellIn < 1) return item.quality - 4
      return item.quality - 2
    }

    if (item.sellIn <= 0) {
      return item.quality - 2;
    }

    return item.quality - 1;
  }

  updateQuality() {
    return this.items.map(item => {
      const sellIn = this.resolveSellIn(item);
      const quality = this.resolveQuality(item);
      return {
        name: item.name,
        sellIn: sellIn,
        quality: quality
      }
    })
  }
}
